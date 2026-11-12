# Incremental course milestones

Only milestone 1 is implemented. Later milestones are proposals, subject to the instructor's feedback.

| Milestone | Mathematical question | Demonstrable result |
|---|---|---|
| 1. Solo ration LP | How can one hiker meet stated ration targets with minimum food mass? | Two-variable LP, two simplex pivots, references and certificate |
| 2. Richer solo inputs | How do more foods, volume and changed targets affect feasibility? | Measured catalogue, scenario comparisons and sensitivity examples |
| 3. Whole equipment | How do indivisible objects change the answer? | Binary selection model and comparison with its LP relaxation |
| 4. Group allocation | How can shared items be assigned fairly? | MILP with item-copy inventory and normalized minimax loads |
| 5. Website prototype | How can a user understand and inspect a packing plan? | Trip/inventory forms, model summary and per-hiker output |

## Next mathematical work

Collect actual masses and packed volumes. Specify a range of scenarios, with a defensible source or an explicit project assumption for every target. Compare changed energy/protein targets and demonstrate an infeasible full inventory. If the transformed right-hand side becomes negative, the current slack-start solver must reject the instance. A Phase I implementation or an established solver belongs to a later milestone.

Introduce binary decisions only when selecting whole equipment copies. Ordinary simplex solves a continuous LP or a node's LP relaxation, not an arbitrary MILP by itself. Explain branch-and-bound only when that extension is introduced.

For a group, restore the proposals' auxiliary variable `z` and constraints `Wi <= Ci z` and `Vi <= Bi z`, with hard capacity limits and appropriate personal/shared-item requirements. The capacities are fixed input parameters within each solve. The proposals' secondary objective can break ties after fixing optimal `z`.

## Capacity and evidence

Keep body-mass heuristics separate from measured or individually chosen limits. Research age and sex effects in their studied populations and distinguish biological sex from gender identity. Height alone is an inadequate measure of backpack fit. Validate any later personalization method for the intended population before representing it as a personal capacity estimate.

The proposed 5/10/15/20% route rule needs review. Steeper, longer or hotter routes should not automatically increase the allowed load. A model may instead reduce an input allowance or change requirements, with a documented rationale.

## Website direction

The initial website should let users inspect the same model demonstrated in class before supporting a large catalogue. Show units, source IDs and assumptions beside inputs. Distinguish food energy from estimated metabolic expenditure. Display mandatory supplies, variable supplies, total mass, capacity margin, binding constraints and an explanation when the scenario is infeasible. Accept a user-chosen planning allowance rather than presenting a demographic formula as validated.

Later support multiple hikers, measured volume, dietary exclusions, trip conditions and inventory copies. Introduce uncertain water availability and weather as scenario or robust-optimization questions after the deterministic version is understood. A map, account system, live weather and deployed service remain future proposals.
