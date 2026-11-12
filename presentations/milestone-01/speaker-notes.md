# Trail Balance presenter notes

Main talk: slides 1–12, approximately 15 minutes in English. The narrative focuses on the hiking problem, supplies, packing requirements and the result. Slides 13–20 contain optional mathematical detail and full references.

## Rehearsal timing

| Slide | Topic | Time window | Duration |
|---|---|---|---|
| 1 | Trail Balance | 00:00–00:30 | 00:30 |
| 2 | The packing problem | 00:30–02:00 | 01:30 |
| 3 | Our first hiking scenario | 02:00–03:00 | 01:00 |
| 4 | Basic supplies that stay in the pack | 03:00–04:45 | 01:45 |
| 5 | Water and carrying allowance | 04:45–06:15 | 01:30 |
| 6 | Food choices we can vary | 06:15–07:30 | 01:15 |
| 7 | What the packing plan must meet | 07:30–08:45 | 01:15 |
| 8 | How linear programming fits | 08:45–10:15 | 01:30 |
| 9 | Solving the example with simplex | 10:15–11:15 | 01:00 |
| 10 | The proposed packing list | 11:15–13:00 | 01:45 |
| 11 | What this first example establishes | 13:00–14:00 | 01:00 |
| 12 | Future work and website | 14:00–15:00 | 01:00 |

## 1. Trail Balance

30 seconds. Introduce Trail Balance as the Linear Programming final project. Frame the everyday question: how can we pack what a hike needs while keeping the backpack manageable? This first milestone uses one person and a simple day hike. Explain that the presentation focuses on the packing decision and its result. The appendix contains the full simplex calculation.

## 2. The packing problem

90 seconds. Describe the practical choice before introducing an algorithm. A hiker needs essential equipment, water and food, but extra supplies add mass. A useful packing plan meets stated trip needs, respects what is available and stays within a chosen allowance. Trail Balance will eventually address whole equipment and groups. Today we fix the essential kit and water, then decide the quantities of two foods. Ask the audience to think about how they would make that choice by hand. The purpose of optimization is to make that decision explicit and checkable, using measurable inputs and clearly stated assumptions.

## 3. Our first hiking scenario

60 seconds. Use a concrete example: one assumed 70 kg adult, a marked 10 km route with 500 m ascent, about four hours in mild conditions, no overnight stay and no planned refill. These are classroom assumptions. The moderate label comes from the proposal classification rather than a universal route standard. Point out which trip details affect packing: duration influences supplies, weather influences clothing, and an overnight stay would change the equipment needs. Keep those conditions fixed in this first example.

## 4. Basic supplies that stay in the pack

105 seconds. Walk through the basic supplies in terms of their purpose. Navigation and lighting support orientation and an unexpected late return. Clothing and sun protection respond to conditions. First aid, signalling and shelter cover an emergency delay. Practical supplies include containers, a repair/fire kit and a waste bag. The model also keeps a separate 200 g emergency food reserve. The full assumed mass ledger is in data/fixed_kit.csv and totals 2.3 kg, including the empty backpack and packaging. Explain that the optimizer cannot discard these supplies to make the solution lighter. Their categories follow the cited hiking guidance, while every mass is an unmeasured classroom example. [R3] https://www.nps.gov/articles/10essentials.htm [R4] https://americanhiking.org/10essentials/

## 5. Water and carrying allowance

90 seconds. Explain the two planning quantities in ordinary units. American Hiking Society gives a starting guideline of about 0.5 L per hour in moderate conditions. Four hours suggests 2 L, and this example adds an assumed 0.5 L reserve. Approximate the 2.5 L water contents as 2.5 kg, with containers included in the fixed kit. The 7 kg allowance comes from applying REI’s general 10% day-pack guideline to an assumed 70 kg person. It is a planning heuristic with individual limitations. The reviewed studies do not give a universal personal capacity formula from age, sex, weight and height. The older-adult study and military sex comparison concern specific populations, and backpack fit uses torso/hip measurements. A future website should accept an individually chosen allowance and explain its basis. [R3] https://www.nps.gov/articles/10essentials.htm [R4] https://americanhiking.org/10essentials/ [R5] https://www.rei.com/learn/expert-advice/backpacking-weight.html [R6] https://www.rei.com/learn/expert-advice/backpacks-adjusting-fit.html [R9] https://doi.org/10.1016/j.jbiomech.2018.03.018 [R10] https://doi.org/10.3390/biomechanics4030027

## 6. Food choices we can vary

75 seconds. Introduce two ready-to-eat foods so the audience can follow the entire decision. This specific Mission Restaurant Style label gives 50 g, 140 kcal and 4 g protein per tortilla. The 74 g StarKist pouch gives 70 kcal and 17 g protein. These are rounded label declarations. The example assumes six tortilla servings and two tuna servings are available. Explain that the data describe the foods, while our scenario determines what the ration must achieve. Continuous servings allow divisible contents for the LP. Handling and packaging are simplified. The final answer happens to use whole servings. [R7] https://www.missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas Manufacturer label: https://www.missionfoods.com/wp-content/uploads/2022/07/product-soft-taco-restaurant-style-flour-tortillas-nf.png [R8] https://starkist.com/product/light-tuna-in-water-pouch/

## 7. What the packing plan must meet

75 seconds. Read these requirements as a practical checklist. The chosen ration targets are at least 630 kcal and 33 g protein. They are teaching assumptions that create a small understandable example, rather than an estimate of total hiking energy expenditure or a personal diet. The separate emergency reserve remains fixed and receives no credit toward these targets. We cannot pack more food than the available stock. The entire backpack must remain within the planning allowance. Emphasize the distinction between a minimum need and a maximum available quantity. Explain that these same statements become constraints in the LP.

## 8. How linear programming fits

90 seconds. Connect the ordinary packing language to LP. The decisions are how many servings of each food to pack. Define x₁ as tortilla servings and x₂ as tuna servings. The objective minimizes edible food mass, written M = 50x₁ + 74x₂ in grams. The rules preserve the ration targets, stock limits and total pack allowance. The coefficients remain constant and the quantities are continuous, so these relationships are linear. Explain that a solver can check many combinations systematically. Keep the full inequalities and matrix notation for questions in the appendix. The professor’s simplex method solves the same small instance. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 9. Solving the example with simplex

60 seconds. Describe simplex through the packing changes. The full food inventory gives a feasible starting ration weighing 448 g. The equivalent maximum-removal formulation first reduces tuna until the protein target becomes tight. This gives a ration mass of 5766/17 g, displayed as 339.2 g. The second pivot adjusts the mix, reducing tortilla quantities and bringing some tuna back, until the energy target also becomes tight. The final ration weighs 274 g. The process preserves all stated ration requirements at every step. Its reduced-cost check confirms that no feasible improvement remains. The numerical tables and proof are available in the appendix, so the main talk can stay on the packing interpretation. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 10. The proposed packing list

105 seconds. Present the answer as something a hiker could read. Pack four tortilla servings and one tuna serving. The ration weighs 274 g and provides the stated 630 kcal and 33 g protein in the label-based model. Add 2.3 kg fixed kit and 2.5 kg water to obtain a 5.074 kg backpack total. This leaves 1.926 kg below the example’s 7 kg planning allowance. The chart shows that water and fixed equipment contribute most of the mass. The food choice saves 174 g compared with packing the full 448 g stock. Avoid presenting that as a large change in the entire backpack. The separate emergency reserve remains in the fixed kit. The result is an optimum for this stated ration model and does not establish a complete personal diet or a safety assessment. [R7] https://www.missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas Manufacturer label: https://www.missionfoods.com/wp-content/uploads/2022/07/product-soft-taco-restaurant-style-flour-tortillas-nf.png [R8] https://starkist.com/product/light-tuna-in-water-pouch/

## 11. What this first example establishes

60 seconds. Explain what the result demonstrates in practical terms: a packing decision can be written down, solved and checked against explicit needs. Both food targets bind in the example. The pack capacity has room left. Even the full food stock would make the modeled pack only 5.248 kg, so the 7 kg allowance is not the active restriction in this instance. Be candid about the scope: two foods, one ration and assumed equipment masses. The next useful data collection step is to weigh actual equipment, include more food choices and examine a scenario with a tighter weight or volume limit. This keeps later presentations focused on one extension at a time.

## 12. Future work and website

60 seconds. Close with a gradual expansion of the practical problem. First add measured masses, packed volume, more foods and different trip requirements. Then introduce whole equipment choices and show why these require integer decisions. Later assign shared supplies across a group while balancing normalized loads. The website should accept trip details, available inventory and a chosen personal allowance, then show an understandable packing list, total mass, capacity margins and an explanation if the requirements cannot be met. These are future milestones. The current deliverable remains a simple solved solo example.

## 13. Appendix: LP formulation

Optional calculation detail. Presentation notation maps to the model note as x₁=t and x₂=u. Minimize M=50x₁+74x₂ subject to 140x₁+70x₂≥630, 4x₁+17x₂≥33, 0≤x₁≤6, 0≤x₂≤2 and 4800+M≤7000. All masses are in grams. The capacity inequality is redundant because the full food stock weighs 448 g and the full pack weighs 5248 g. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 14. Appendix: simplex reformulation

Optional calculation detail. Let y₁=6−x₁ and y₂=2−x₂ denote removed servings. The full inventory supplies 980 kcal and 58 g protein, leaving removal allowances of 350 kcal and 25 g protein. Minimize 448−50y₁−74y₂ by maximizing ζ=50y₁+74y₂. The point y=(0,0) keeps all inventory and has a feasible slack basis. These variables correspond to yT,yU in the code. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 15. Appendix: matrix and starting basis

Optional calculation detail. Variable order is (y₁,y₂,s₁,s₂,s₃,s₄). Slacks correspond to energy, protein, tortilla stock and tuna stock. The last four columns are the identity matrix I₄. Initial basic values are (350,25,6,2). Objective coefficients are (50,74,0,0,0,0). The lecture sign convention gives initial nonbasic reduced costs (−50,−74). [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 16. Appendix: simplex pivot 1

Optional calculation detail. Initial reduced costs are (−50,−74). Enter y₂. Its direction in slack-basis order is (70,17,0,1). Eligible ratios are 5,25/17,2. Step length 25/17 makes s₂ leave. The new basis is (s₁,y₂,s₃,s₄), with values (4200/17,25/17,6,9/17). Removed mass is 1850/17 g, so packed ration mass is 5766/17 g. The remaining improving reduced cost is −554/17. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 17. Appendix: simplex pivot 2

Optional calculation detail. Enter y₁. In current basis order (s₁,y₂,s₃,s₄), the direction is (2100/17,4/17,1,−4/17). Eligible ratios are 2,25/4,6. Step length 2 makes s₁ leave. The final basis is (y₁,y₂,s₃,s₄), values (2,1,4,1). Remaining nonbasic reduced costs are 277/1050 and 49/15, both positive. Convert removal back to packed quantities (4,1). The detailed dual updates remain in docs/milestone-01-model.md and the exact solver trace. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 18. Appendix: optimality certificate

Optional proof. Take λ₁=277/1050 and λ₂=49/15, both nonnegative. They satisfy 140λ₁+4λ₂=50 and 70λ₁+17λ₂=74. Any feasible ration therefore has M≥630λ₁+33λ₂=274 g. The feasible packing (4,1) attains this bound. This proves the minimum without requiring the audience to inspect every pivot. [R1] The Simplex Method in Matrix Notation, 26 October 2026. [R2] Matoušek & Gärtner (2007), https://doi.org/10.1007/978-3-540-30717-4

## 19. References: LP and hiking guidance

[R1] The Simplex Method in Matrix Notation. 26 October 2026. User-supplied SimplexComplexity_tex-4.pdf. Author not identified. Physical pp. 3-11 and 12-18. [R2] Jiri Matousek and Bernd Gartner. Understanding and Using Linear Programming. Universitext. Springer, 2007. https://doi.org/10.1007/978-3-540-30717-4 [R3] U.S. National Park Service. Ten Essentials. https://www.nps.gov/articles/10essentials.htm [R4] American Hiking Society. The Ten Essentials of Hiking. https://americanhiking.org/10essentials/ [R5] Joe Pasteris. How Much Should Your Pack Weigh? REI Expert Advice. https://www.rei.com/learn/expert-advice/backpacking-weight.html Web sources accessed 12 November 2026.

## 20. References: fit, foods and research

[R6] REI Expert Advice. How to Size and Fit a Backpack. https://www.rei.com/learn/expert-advice/backpacks-adjusting-fit.html [R7] Mission Foods. Soft Taco Restaurant Style Flour Tortillas. https://www.missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas Label image https://www.missionfoods.com/wp-content/uploads/2022/07/product-soft-taco-restaurant-style-flour-tortillas-nf.png [R8] StarKist. Light Tuna in Water (Pouch), 74 g size. https://starkist.com/product/light-tuna-in-water-pouch/ [R9] Walsh GS, Low DC, Arkesteijn M. Effect of stable and unstable load carriage on walking gait variability, dynamic stability and muscle activity of older adults. Journal of Biomechanics 73 (2018),18-23. https://doi.org/10.1016/j.jbiomech.2018.03.018 [R10] Vickery-Howe DM et al. Physiological, Perceptual, and Biomechanical Responses to Load Carriage While Walking at Military-Relevant Speeds and Loads—Are There Differences between Males and Females? Biomechanics 4(3) (2024),382-410. https://doi.org/10.3390/biomechanics4030027 Web sources accessed 12 November 2026.

## Questions to rehearse

- What stays fixed, and what can the optimizer change?
- Which quantities come from labels or guidance, and which are classroom assumptions?
- What makes a packing plan feasible?
- Why do we use continuous food quantities in the first milestone?
- How does the answer translate back into a packing list?
- Why is the carrying allowance not the active limit in this instance?
- Which practical extension should come next?
