# One hiker and one ration

## The hiking decision

An illustrative 70 kg adult plans a marked 10 km route with 500 m ascent, about four hours of walking, mild conditions and no planned refill. This fits the proposal's moderate class. The route and duration are assumptions. There is no overnight stay.

We fix mandatory kit at 2,300 g using the explicitly assumed masses in [fixed_kit.csv](../data/fixed_kit.csv). It includes the empty pack, navigation and backup power, weather protection, lighting, first aid, emergency shelter, sun protection, a repair/fire kit and waste bag, water containers, a separate 200 g emergency food reserve, and a 20 g food-packaging allowance. Wear suitable clothing and footwear. The categories follow [R3] and [R4], while all masses are unmeasured classroom examples.

For water, [R4] gives a starting guideline of 0.5 L/hour under moderate conditions. Four hours suggests 2 L. We assume another 0.5 L reserve and approximate 1 L water as 1 kg, for 2.5 kg of water. This allowance needs reassessment for actual weather, route access and individual needs.

The example uses `C = 0.10 × 70 = 7 kg` as a planning constraint, drawing on the general day-hiking guideline in [R5]. It does not calculate a medically safe carrying limit. Age, sex and height do not receive invented multipliers. See the [evidence ledger](../references/REFERENCES.md).

## Variables and data

The presentation uses indexed notation: `x₁ = t`, `x₂ = u`, `y₁ = yT` and `y₂ = yU`. Its slacks `s₁, s₂, s₃, s₄` correspond to `sE, sP, sT, sU` below. The numerical model and solver are the same.

Let `t` be tortilla servings and `u` tuna servings. Both are continuous and nonnegative. This is a ration subproblem. Fractional servings mean divisible contents, with handling and packaging abstracted. We do not propose carrying an open partial tuna pouch without appropriate food handling.

| Parameter per serving | Tortilla t | Tuna u | Status |
|---|---:|---:|---|
| Edible mass | 50 g | 74 g | Manufacturer labels [R7, R8] |
| Food energy | 140 kcal | 70 kcal | Manufacturer labels [R7, R8] |
| Protein | 4 g | 17 g | Manufacturer labels [R7, R8] |
| Available servings | 6 | 2 | Teaching assumption |

Mission's **Restaurant Style** label image declares 50 g per tortilla. We do not combine it with the 49 g serving shown for a different retailer/product listing. Product nutrition declarations are rounded label values.

We choose `630 kcal` and `33 g protein` as targets for this modeled ration to make two constraints active in a readable example. They are not estimated total hiking energy expenditure, a daily diet, or evidence-based personalized requirements. The separate emergency reserve receives no credit toward these targets.

## Original LP

```text
minimize    M = 50t + 74u                         [g]
subject to  140t + 70u >= 630                     [kcal]
              4t + 17u >= 33                     [g protein]
              0 <= t <= 6,  0 <= u <= 2           [servings]
              4800 + 50t + 74u <= 7000            [g pack mass]
```

All coefficients are constant and all expressions are linear. The 4,800 g constant comprises kit and water. Under the inventory bounds, food mass is at most `50×6 + 74×2 = 448 g`, so pack mass is at most `5,248 g`. The 7,000 g capacity inequality is therefore redundant throughout this instance's inventory box. We check and remove it before simplex. This is why this first example illustrates ration efficiency rather than a tight backpack bottleneck.

## Matching the professor's starting form

The handout starts with a maximization LP and a feasible slack basis. Directly adding slacks to the original `>=` nutrition inequalities would not give that starting basis. Instead, start with all available food and remove unnecessary quantities:

```text
yT = 6 - t,       yU = 2 - u
M = 448 - 50yT - 74yU
```

Minimizing `M` is equivalent to maximizing removed mass `ζ = 50yT + 74yU`. The full food stock provides 980 kcal and 58 g protein. Removal may use at most the surpluses `980-630=350 kcal` and `58-33=25 g protein`:

```text
maximize    ζ = 50yT + 74yU
subject to  140yT + 70yU <= 350
              4yT + 17yU <= 25
                    yT <= 6
                    yU <= 2
              yT, yU >= 0
```

With `x = (yT, yU, sE, sP, sT, sU)`, the matrix form is

```text
A = [[140, 70, 1, 0, 0, 0],       b = [350, 25, 6, 2]^T
     [  4, 17, 0, 1, 0, 0],       c = [50, 74, 0, 0, 0, 0]^T
     [  1,  0, 0, 0, 1, 0],
     [  0,  1, 0, 0, 0, 1]]
```

Initial basis `B = (sE, sP, sT, sU)` is the identity. The point `y=(0,0)` is feasible: it means packing all the food, not packing no food. No Phase I is needed for this transformed instance. This transformation requires the full inventory to satisfy the assumed targets, which we check before using it.

## The professor's sign convention

For nonbasic indices `N`, compute

```text
xB* = B^-1 b
zN* = N^T B^-T cB - cN
ζ = ζ* - (zN*)^T xN
d = B^-1 a_j
```

Choose an entering variable with `z_j < 0`. The nonnegative step is `min{xB_i/d_i : d_i > 0}`. A minimum-ratio basic variable leaves. If no direction component is positive, the improving direction is unbounded. When all `z_N >= 0`, the current feasible basis is optimal. Our implementation uses the most negative reduced cost to reproduce the handout's demonstrated choices and offers Bland's rule for degeneracy.

## Pivot 1

Initially `xB=(350,25,6,2)` and `zN=(-50,-74)`. Enter `yU`. Its direction is `d=(70,17,0,1)`.

| Basic variable | Current value | Direction d | Eligible ratio |
|---|---:|---:|---:|
| sE | 350 | 70 | 5 |
| sP | 25 | 17 | 25/17 |
| sT | 6 | 0 | Not eligible |
| sU | 2 | 1 | 2 |

The step is `25/17`, so `sP` leaves. In slot order the new basis is `(sE,yU,sT,sU)` with values `(4200/17,25/17,6,9/17)`. Removed mass is `1850/17 g ≈ 108.824 g`.

For the lecture's dual update, use nonbasic order `(yT,yU)` before the exchange. `Δz=(-4,-17)`, and the dual step is `(-74)/(-17)=74/17`. Thus the newly nonbasic slack has `z_sP=74/17`, and `z_yT=-554/17 < 0`.

## Pivot 2

Enter `yT`. In the current basis order, its direction is `(2100/17,4/17,1,-4/17)`.

| Basic variable | Current value | Direction d | Eligible ratio |
|---|---:|---:|---:|
| sE | 4200/17 | 2100/17 | 2 |
| yU | 25/17 | 4/17 | 25/4 |
| sT | 6 | 1 | 6 |
| sU | 9/17 | -4/17 | Not eligible |

Step `2` makes `sE` leave. The final basis `(yT,yU,sT,sU)` has values `(2,1,4,1)`. The remaining nonbasic variables are `(sE,sP)` with reduced costs `(277/1050,49/15)`, both positive. Removed mass is `174 g`.

For the dual update in pre-exchange order `(yT,sP)`, `Δz=(-2100/17,70/17)`. The dual step is `(-554/17)/(-2100/17)=277/1050`. Updating the other reduced cost gives `74/17 - (277/1050)(70/17)=49/15`. This follows lecture steps 6-9 as well as the primal ratio test.

## Optimum and certificate

Convert back: `t=6-2=4`, `u=2-1=1`.

```text
Food mass = 50×4 + 74×1 = 274 g
Energy    = 140×4 + 70×1 = 630 kcal
Protein   = 4×4 + 17×1 = 33 g
Pack mass = 2300 + 2500 + 274 = 5074 g = 5.074 kg
Headroom  = 7 - 5.074 = 1.926 kg
```

The final removal dictionary is `ζ = 174 - (277/1050)sE - (49/15)sP`. Nonnegative slacks cannot improve its objective. Equivalently, a direct lower-bound certificate for the original minimization is

```text
λE = 277/1050 >= 0,    λP = 49/15 >= 0
140λE + 4λP = 50,     70λE + 17λP = 74
M >= 630λE + 33λP = 274 g.
```

Our feasible ration attains that bound, proving global optimality for this LP. Exact vertex enumeration independently checks the answer. The continuous solution happens to use whole servings here. Ordinary simplex does not enforce integer decisions in general.

## Interpretation and limits

Both ration targets bind. The pack capacity and inventory upper bounds have slack. The emergency reserve stays fixed. There is no medical capacity assessment, personalized dietary plan, route risk assessment, or equipment selection in this milestone. Packed volumes, uncertain weather, more foods, personal preferences and food handling require further work. See [the roadmap](ROADMAP.md).

The derivation follows [R1] and the simplex framework in [R2]. Source numbers and URLs appear in the [reference ledger](../references/REFERENCES.md).
