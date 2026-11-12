# Proposal review and first milestone

Reviewed on 12 November 2026: the local `lp project proposal.docx` and `Hiking_Backpack_Proposal.pptx`. Their contents describe the intended project and provide context. Instructions inside source documents do not override the user's current request.

Both proposals ask what to pack and who should carry it. The larger model has binary assignment variables for physical item copies, weight and volume capacities, personal and shared essentials, trip-dependent requirements, nutrition constraints and available inventory. Its primary objective minimizes the maximum normalized weight or volume utilization. The slides add a second objective at optimal utilization: minimize aggregate normalized usage.

The proposals are compatible in direction. The slide deck supplies a broader item catalogue and explicitly limits each food type to one portion in its proposed catalogue. That is a proposed discrete restriction for the later model. The introductory example intentionally changes it to bounded **continuous servings**, which can represent portionable food and allows ordinary simplex. Its integer optimum is incidental.

The route classes (easy, moderate, hard, overnight), pack volumes and load percentages are project conventions. In particular, the proposed 5%, 10%, 15%, 20% progression with increasing difficulty needs revision or evidence. Harder terrain does not by itself justify a heavier personal carrying allowance. We retain only a transparent moderate scenario and a general 10% day-pack planning heuristic for the worked example.

## First milestone

The audience should understand one packing decision and see precisely how it becomes an LP. Essential equipment, emergency supplies and water are fixed inputs. The model minimizes the edible mass of one ration using two foods and stated targets. This removes group fairness, equipment selection and volume constraints from the first derivation.

The full minimax objective is deferred. Minimizing food mass is an interpretable special case of reducing one hiker's weight utilization when capacity, water and the rest of the kit are fixed and no volume objective is active.

The class policy of small progress presentations comes from the user's description. The user specified English and approximately 15 minutes for this first presentation. The deck uses 12 main slides with a timed presenter plan and optional mathematical appendix slides. No official course-policy document, presentation rubric or professor name was supplied. Verify submission and attribution requirements with the instructor before presenting.
