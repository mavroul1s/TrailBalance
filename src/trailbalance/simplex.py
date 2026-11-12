"""Exact primal simplex for max c*x, A*x <= b, x >= 0 with b >= 0.

The course uses z_N = N^T B^{-T} c_B - c_N. Negative z enters.
This teaching implementation recomputes basis solves using Fraction arithmetic.
It has no Phase I and is not a general-purpose or production solver.
"""

from fractions import Fraction as F


def solve_linear(matrix, rhs):
    """Solve a square nonsingular system by exact Gauss-Jordan elimination."""
    n = len(rhs)
    augmented = [[F(v) for v in row] + [F(rhs[i])] for i, row in enumerate(matrix)]
    for col in range(n):
        pivot = next((r for r in range(col, n) if augmented[r][col]), None)
        if pivot is None:
            raise ValueError("Singular basis")
        augmented[col], augmented[pivot] = augmented[pivot], augmented[col]
        divisor = augmented[col][col]
        augmented[col] = [v / divisor for v in augmented[col]]
        for row in range(n):
            if row != col:
                factor = augmented[row][col]
                augmented[row] = [a - factor * b for a, b in zip(augmented[row], augmented[col])]
    return [row[-1] for row in augmented]


def simplex(a, b, c, names=None, rule="dantzig", max_iterations=100):
    """Return solution and complete basis/dual trace.

    Dantzig's most-negative-z rule matches the demonstrated course pivots.
    Bland's rule is available for degenerate problems and prevents cycling.
    Ratio tests consider only strictly positive direction components, including
    zero-length steps when a basic variable is zero.
    """
    m, n = len(b), len(c)
    if not m or not n or len(a) != m or any(len(row) != n for row in a):
        raise ValueError("Expected nonempty, consistent A, b, c dimensions")
    if any(F(v) < 0 for v in b):
        raise ValueError("Initial slack basis is infeasible. Phase I is not implemented.")
    if rule not in ("dantzig", "bland"):
        raise ValueError("Unknown entering rule")
    if names is not None and len(names) != n:
        raise ValueError("One name is required per decision variable")
    matrix = [[F(v) for v in row] + [F(i == j) for j in range(m)] for i, row in enumerate(a)]
    costs = list(map(F, c)) + [F(0)] * m
    labels = list(names or [f"x{i + 1}" for i in range(n)]) + [f"s{i + 1}" for i in range(m)]
    basis = list(range(n, n + m))
    trace = []
    for iteration in range(max_iterations + 1):
        nonbasic = [j for j in range(n + m) if j not in basis]
        bm = [[row[j] for j in basis] for row in matrix]
        xb = solve_linear(bm, b)
        cb = [costs[j] for j in basis]
        dual = solve_linear(list(map(list, zip(*bm))), cb)
        z = {j: sum(dual[i] * matrix[i][j] for i in range(m)) - costs[j] for j in nonbasic}
        full = [F(0)] * (n + m)
        for j, value in zip(basis, xb):
            full[j] = value
        state = dict(iteration=iteration, basis=[labels[j] for j in basis],
                     nonbasic=[labels[j] for j in nonbasic], x_basic=xb,
                     solution=dict(zip(labels, full)),
                     objective=sum(costs[j] * full[j] for j in range(n + m)),
                     z_nonbasic={labels[j]: z[j] for j in nonbasic}, dual=dual)
        trace.append(state)
        candidates = [j for j in nonbasic if z[j] < 0]
        if not candidates:
            return dict(status="optimal", x=full[:n], slacks=full[n:],
                        objective=state["objective"], dual=dual, trace=trace)
        if iteration == max_iterations:
            raise RuntimeError("Iteration limit reached. Try Bland's rule for cycling.")
        entering = min(candidates) if rule == "bland" else min(candidates, key=lambda j: (z[j], j))
        direction = solve_linear(bm, [row[entering] for row in matrix])
        ratios = [(xb[i] / d, basis[i], i) for i, d in enumerate(direction) if d > 0]
        if not ratios:
            return dict(status="unbounded", trace=trace)
        step, leaving, row = min(ratios)
        # Steps 6-8 from the lecture, in the current nonbasic order.
        unit = [F(i == row) for i in range(m)]
        dual_direction = solve_linear(list(map(list, zip(*bm))), unit)
        dz = {j: -sum(matrix[i][j] * dual_direction[i] for i in range(m)) for j in nonbasic}
        dual_step = z[entering] / dz[entering]
        state.update(entering=labels[entering], leaving=labels[leaving],
                     direction=direction, step=step,
                     ratios={labels[basis[i]]: xb[i] / d for i, d in enumerate(direction) if d > 0},
                     delta_z={labels[j]: dz[j] for j in nonbasic}, dual_step=dual_step)
        basis[row] = entering
    raise AssertionError("Unreachable")
