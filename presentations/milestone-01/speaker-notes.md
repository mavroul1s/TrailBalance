# Presenter notes

Main talk: slides 1-12, approximately 10 minutes. Slides 13-18 provide optional mathematical detail and references.

## 1. TrailBalance

20 seconds. Introduce TrailBalance as the Linear Programming final project. This is the first progress milestone. The full proposal concerns equipment selection and fair group allocation. Today we study a smaller continuous problem that can be solved completely using the professor's primal simplex method.

## 2. One moderate day hike

45 seconds. Assume one 70 kg adult, a marked 10 km route, 500 m ascent and four hours in mild weather. The proposed moderate label is a project convention. Fix 2.3 kg of mandatory kit, including a separate emergency food reserve and packaging. Water starts from AHS guidance of about 0.5 L per hour in moderate conditions. Four hours gives 2 L, and we assume another 0.5 L reserve. Approximate water mass as 2.5 kg. The decision is how much of two foods to pack for a modeled ration, after protecting these fixed essentials. All kit masses are hypothetical and need measurement. Sources: [R3] https://www.nps.gov/articles/10essentials.htm [R4] https://americanhiking.org/10essentials/

## 3. Carrying allowance and personal inputs

45 seconds. The 7 kg allowance is a transparent planning heuristic, not a medical safety threshold. REI describes about 10% of body mass for a loaded day pack and acknowledges exceptions. The age study concerns 14 older adults in short trials and does not estimate an age multiplier. The sex study involves 23 soldiers and is not a universal recreational-hiking formula. Biological sex findings should not be converted into a coefficient for gender identity. For fit, measure torso and hip dimensions rather than infer capacity from overall height. Future capacity remains an externally chosen input until personalization is validated. [R5] https://www.rei.com/learn/expert-advice/backpacking-weight.html [R6] https://www.rei.com/learn/expert-advice/backpacks-adjusting-fit.html [R9] https://doi.org/10.1016/j.jbiomech.2018.03.018 [R10] https://doi.org/10.3390/biomechanics4030027

## 4. The ration data

50 seconds. The manufacturer label for this specific Mission Restaurant Style tortilla declares 50 g, 140 kcal and 4 g protein. The 74 g StarKist pouch declares 70 kcal and 17 g protein. Avoid mixing the tortilla with a different 49 g listing. These are rounded nutrition-label declarations. We choose inventories 6 and 2 and targets 630 kcal and 33 g protein to make a readable example. These targets define one modeled ration, not total metabolic needs or a personal diet. Fractional servings are mathematically allowed, representing divisible contents. Handling and packaging are abstracted. The final optimum happens to use whole servings. [R7] https://www.missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas and https://www.missionfoods.com/wp-content/uploads/2022/07/product-soft-taco-restaurant-style-flour-tortillas-nf.png [R8] https://starkist.com/product/light-tuna-in-water-pouch/

## 5. The minimum-mass LP

60 seconds. Minimize edible food mass M=50t+74u. Require 140t+70u at least 630 kcal and 4t+17u at least 33 g protein. Inventory bounds are 0<=t<=6 and 0<=u<=2. The total pack is 4800+M grams and must be at most 7000 grams. However, the entire food inventory weighs only 448 g, so every point in the inventory box is below the capacity limit. Capacity is redundant in this instance and can be removed before solving. The interesting tradeoff is the ration composition. All coefficients are constants and variables are continuous, making this an LP. Minimizing food mass also reduces this hiker's weight utilization when the other load and capacity are fixed. [R1] The Simplex Method in Matrix Notation, 26 October 2026, physical pp. 3-8. [R2] Matousek and Gartner, 2007, https://doi.org/10.1007/978-3-540-30717-4

## 6. A feasible maximization form

65 seconds. The professor starts from a maximization LP with <= inequalities and a feasible basis. Define yT=6-t and yU=2-u as servings removed from the full inventory. Original mass is 448-50yT-74yU, so maximize removed mass. The full inventory has 980 kcal and 58 g protein. We may remove at most 350 kcal and 25 g protein. Keep removal bounds yT<=6 and yU<=2 and nonnegativity. At y=(0,0), all food is packed and all targets are satisfied. Add slacks to obtain the identity basis. No Phase I is needed for this instance. Directly negating >= nutrition constraints would not produce a feasible all-slack basis. [R1] The Simplex Method in Matrix Notation, physical pp. 3-8. [R2] https://doi.org/10.1007/978-3-540-30717-4

## 7. The professor's simplex convention

60 seconds. B is the matrix of basic columns, N contains nonbasic columns. Set xN=0 and solve xB=B^-1 b. The lecture defines zN=N^T B^-T cB-cN and writes the objective as zeta=zeta*-zN^T xN. A negative z value therefore improves the maximization objective. Enter a variable with negative z. Solve d=B^-1 a_j. Use the minimum xB_i/d_i over positive direction components to keep all basic variables nonnegative, and let a minimum-ratio variable leave. Recompute or update the dictionary and repeat. Stop when all zN are nonnegative. Degeneracy can produce zero-length steps, so the general method may require an anti-cycling rule. The appendix and code record the lecture's dual updates too. [R1] physical pp. 6-11. [R2] https://doi.org/10.1007/978-3-540-30717-4

## 8. Pivot 1: tuna removal enters

60 seconds. Initial basis is (sE,sP,sT,sU), values (350,25,6,2), and reduced costs for (yT,yU) are (-50,-74). Choose yU because it has the most negative reduced cost. Its direction is (70,17,0,1). Eligible ratios are 5,25/17,2, ignoring the zero direction. The minimum is 25/17, so protein slack sP leaves. We now remove 25/17 tuna servings, with yT still zero. The new basis is (sE,yU,sT,sU), values (4200/17,25/17,6,9/17). Removed mass is 1850/17 g, about 108.824 g. Fractional intermediate points are permitted in the LP. [R1] physical pp. 9-11. Full exact trace: docs/milestone-01-model.md.

## 9. Pivot 2: tortilla removal enters

60 seconds. The remaining decision variable yT has reduced cost -554/17, so it enters. In current basis order (sE,yU,sT,sU), the direction is (2100/17,4/17,1,-4/17). Ratios for positive directions are 2,25/4,6. Thus step 2 makes energy slack sE leave. The final basis is (yT,yU,sT,sU) with values (2,1,4,1). Removed mass is 174 g. Nonbasic slack reduced costs are z_sE=277/1050 and z_sP=49/15, both positive. All slacks and basic values remain nonnegative, so the solution is feasible and optimal. [R1] physical pp. 9-11. Full arithmetic and dual updates: docs/milestone-01-model.md.

## 10. The optimal ration

50 seconds. Translate removals back to packed quantities. t=6-2=4 tortilla servings, u=2-1=1 tuna serving. Food mass is 274 g, energy is 630 kcal and protein is 33 g. Fixed kit 2300 g plus water 2500 g plus food 274 g gives 5074 g or 5.074 kg, leaving 1.926 kg below the 7 kg planning cap. The chart follows the successive removal decisions (0,0), (0,25/17) and (2,1), showing the two straight simplex pivot segments. This is an exact optimum for the stated LP. The separate emergency reserve remains fixed. The ration is not a full dietary or safety assessment. [R7] https://www.missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas [R8] https://starkist.com/product/light-tuna-in-water-pouch/

## 11. Reference map

20 seconds. Every outside claim is tied to a source ID. R1 is the supplied course handout, and R2 is the requested Matousek and Gartner textbook. R3 and R4 support basic supplies and water guidance. R5 and R6 are practical pack-weight and fit guidance. R7 and R8 provide food-label coefficients. R9 and R10 give population-specific load-carriage evidence and explain why we avoid a demographic capacity formula. Full sources are in the appendix and repository reference ledger. Instructor attribution for R1 needs confirmation because the PDF does not name an author.

## 12. Future work

45 seconds. The next presentation can add measured masses and volume, more foods and changed targets, including an infeasible scenario. Later introduce binary equipment decisions and show why a continuous LP relaxation can split items. Then restore the proposal's group minimax objective and shared-item assignments. A website should collect trip and inventory inputs and show an understandable packing list, source assumptions, binding constraints and capacity margin. A personal limit remains an explicit input, with evidence-based personalization as a separate research question. We are not implementing or solving the whole proposal in this first milestone.

## 13. Appendix: full matrix form

Optional backup. x=(yT,yU,sE,sP,sT,sU). A's rows are [140,70,1,0,0,0], [4,17,0,1,0,0], [1,0,0,0,1,0], [0,1,0,0,0,1]. b=(350,25,6,2) and c=(50,74,0,0,0,0). The initial basis consists of the four identity slack columns. xB=b is nonnegative. The code uses generic slack names s1,s2,s3,s4 corresponding to sE,sP,sT,sU. [R1] physical pp. 3-8.

## 14. Appendix: dual pivot updates

Optional backup for lecture steps 6-9. Pivot 1 uses pre-exchange nonbasic order (yT,yU), delta z=(-4,-17), and dual step 74/17. The resulting reduced costs are z_yT=-554/17 and z_sP=74/17. Pivot 2 uses pre-exchange order (yT,sP), delta z=(-2100/17,70/17), and dual step 277/1050. The resulting reduced costs are z_sE=277/1050 and z_sP=49/15. Basis columns are replaced in slot order rather than sorted. Nonbasic ordering can differ from the PDF while representing the same dictionary. [R1] physical page 11.

## 15. Appendix: an optimality certificate

Optional backup. The nonnegative multipliers lambdaE=277/1050 and lambdaP=49/15 satisfy 140lambdaE+4lambdaP=50 and 70lambdaE+17lambdaP=74. Every feasible original ration therefore satisfies M>=630lambdaE+33lambdaP=274 g. The feasible point (4,1) attains the bound, proving global optimality. This direct certificate is independent of choosing a particular pivot path. It also matches the final simplex dictionary zeta=174-(277/1050)sE-(49/15)sP. [R2] Chapter 6, duality, https://doi.org/10.1007/978-3-540-30717-4

## 16. Appendix: fixed kit assumptions

Optional backup. All gram values are illustrative and unmeasured. The fixed kit totals 2300 g, including a 200 g emergency food reserve and 20 g food-packaging allowance. Water contents add 2500 g separately. Worn clothing and footwear are outside the backpack-mass accounting. The list groups essential systems for a mild day-hike teaching scenario and must be adapted to actual conditions. NPS and AHS support categories, not these masses. [R3] https://www.nps.gov/articles/10essentials.htm [R4] https://americanhiking.org/10essentials/

## 17. References: LP and hiking guidance

[R1] The Simplex Method in Matrix Notation. 26 October 2026. User-supplied SimplexComplexity_tex-4.pdf. Author not identified. Physical pp. 3-11 and 12-18. [R2] Jiri Matousek and Bernd Gartner. Understanding and Using Linear Programming. Universitext. Springer, 2007. https://doi.org/10.1007/978-3-540-30717-4 [R3] U.S. National Park Service. Ten Essentials. https://www.nps.gov/articles/10essentials.htm [R4] American Hiking Society. The Ten Essentials of Hiking. https://americanhiking.org/10essentials/ [R5] Joe Pasteris. How Much Should Your Pack Weigh? REI Expert Advice. https://www.rei.com/learn/expert-advice/backpacking-weight.html Web sources accessed 12 November 2026.

## 18. References: fit, foods and research

[R6] REI Expert Advice. How to Size and Fit a Backpack. https://www.rei.com/learn/expert-advice/backpacks-adjusting-fit.html [R7] Mission Foods. Soft Taco Restaurant Style Flour Tortillas. https://www.missionfoods.com/products/soft-taco-restaurant-style-flour-tortillas Label image https://www.missionfoods.com/wp-content/uploads/2022/07/product-soft-taco-restaurant-style-flour-tortillas-nf.png [R8] StarKist. Light Tuna in Water (Pouch), 74 g size. https://starkist.com/product/light-tuna-in-water-pouch/ [R9] Walsh GS, Low DC, Arkesteijn M. Effect of stable and unstable load carriage on walking gait variability, dynamic stability and muscle activity of older adults. Journal of Biomechanics 73 (2018),18-23. https://doi.org/10.1016/j.jbiomech.2018.03.018 [R10] Vickery-Howe DM et al. Physiological, Perceptual, and Biomechanical Responses to Load Carriage While Walking at Military-Relevant Speeds and Loads—Are There Differences between Males and Females? Biomechanics 4(3) (2024),382-410. https://doi.org/10.3390/biomechanics4030027 Web sources accessed 12 November 2026.

## Questions to rehearse

- Why are the quantities continuous, and what changes for whole equipment?
- Why do we fix essential gear and water before optimizing?
- Why is the pack-capacity inequality redundant here?
- Why does y=(0,0) represent the full inventory?
- Why does a negative lecture reduced cost improve the objective?
- Why do we use only positive direction components in the ratio test?
- How do the final reduced costs or the dual certificate prove optimality?
- Which values are sources, and which are assumptions?
- Why does the evidence not justify an age/sex/height capacity formula?
- How does the group MILP extend this first LP?
