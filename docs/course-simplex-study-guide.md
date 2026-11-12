# Study guide for the supplied simplex handout

Source [R1]: *The Simplex Method in Matrix Notation*, 26 October 2026, local file `SimplexComplexity_tex-4.pdf`. Author/instructor is not identified in the PDF. It has **18 physical PDF pages**, while its displayed slide numbering ends at **17/17**. Physical pages 17 and 18 repeat the optimal solution, with an extra implementation remark on page 18.

| Physical PDF pages | Topic | What to understand |
|---|---|---|
| 3-5 | Standard form, slack variables, A,b,c | Slacks turn inequalities into equalities |
| 6 | Basic/nonbasic partition | Set nonbasic variables to zero and solve BxB=b |
| 7 | Objective dictionary | The sign convention is ζ=ζ*−zN^T xN |
| 8 | Starting assumptions | A feasible basis is required before primal simplex |
| 9-11 | Steps 1-9 | Optimality, entering column, ratio test, dual and basis updates |
| 12-13 | Worked example and initial data | Slack basis is feasible because b>=0 |
| 14-16 | Three pivots | x1 enters, then x2, then the first slack |
| 17-18 | Optimum | x1=4, x2=5, objective=31 |

## A basis in plain language

A basis selects as many independent columns as there are equality constraints. Set all other variables to zero. Solving the remaining square system yields a basic solution. It is primal feasible when every basic value is nonnegative. A pivot swaps one basic and one nonbasic column while preserving feasibility.

The hiking example starts at `y=(0,0)`, which means removing no food from the full inventory. This is a useful feasible start. Simply multiplying the original minimum-nutrition inequalities by -1 would give negative right-hand sides and would not yield a feasible all-slack basis.

## Sign convention and ratio test

The handout defines `zN = N^T B^-T cB - cN`. This is the negative of the reduced-profit convention often written `cN - N^T B^-T cB`. In the handout, a **negative** `z_j` improves a maximization objective when its nonbasic variable increases.

Use `min(xB_i/d_i)` only over `d_i>0`. This is the practical form of physical page 10's reciprocal maximum formula for this nondegenerate example. With a zero basic value, allow a zero-length step. An iteration can preserve rather than strictly increase the objective under degeneracy, so an anti-cycling pivot rule matters in general. Bland's rule is available in the example code.

## The dual steps

When basic slot `i` leaves, the handout writes `ΔzN=−(B^-1 N)^T e_i`. The dual step is `s=z_j/Δz_j`. It updates the nonbasic reduced costs and gives the leaving variable's reduced cost. The implementation records these quantities as well as recomputing the next basis dictionary, allowing the two descriptions to be compared.

## Reproduce the professor's example

```bash
PYTHONPATH=src python -m trailbalance --course-example
```

The exact solver reproduces `(x1,x2)=(1,0)`, `(2,1)`, `(4,5)` after the three pivots and objective `31`. The first original slack returns to the basis in pivot 3. This shows why simplex may bring a slack variable into the basis.

## Suggested reading order

Read [R2], Chapter 2 for examples, Chapter 5 for simplex and Chapter 6 for duality. Chapter 3 introduces integer programming and LP relaxation, which will become relevant after the first milestone. Chapter titles and publication details were checked against the publisher's table of contents. The full textbook was not supplied or fully reviewed for this task.

For the presentation, rehearse why the model is linear, why the initial basis is feasible, why the minimum ratio protects feasibility, and why nonnegative final `zN` proves optimality.
