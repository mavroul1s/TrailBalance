# TrailBalance

**Linear Programming course project, University of Thessaly.** TrailBalance studies how to meet hiking needs with limited backpack capacity. The long-term proposal covers selecting gear and distributing it fairly among hikers using mixed-integer linear programming.

The first milestone is deliberately smaller: **one moderate day hike, fixed essential equipment and water, and two continuous food quantities solved by the primal simplex method taught in class.** A website and the full group model are future work.

## First presentation

- [Presentation and presenter notes](presentations/milestone-01/README.md)
- [Model and complete hand derivation](docs/milestone-01-model.md)
- [Course slide study guide](docs/course-simplex-study-guide.md)
- [References and evidence limits](references/REFERENCES.md)
- [Proposal review and scope decisions](docs/proposal-review.md)
- [Future milestones, including the website](docs/ROADMAP.md)

The illustrative optimum packs **4 tortilla servings and 1 tuna serving**, with **274 g of food**, meeting the assumed **630 kcal and 33 g protein** ration targets. Fixed kit and water bring the example pack to **5.074 kg**, below the illustrative **7 kg** planning limit. These are classroom scenario results, not a personalized hiking or nutrition prescription.

## Reproduce the mathematics

Python 3.10 or later is sufficient. The model and tests use only the standard library.

```bash
PYTHONPATH=src python -m trailbalance
PYTHONPATH=src python -m trailbalance --json
PYTHONPATH=src python -m trailbalance --course-example
PYTHONPATH=src python -m unittest discover -s tests -v
```

The exact rational solver reports each basis, the professor's reduced costs `z_N`, entering and leaving variables, step lengths and dual quantities. It reproduces both the new hiking example and the handout's original optimum `(4, 5)` with objective `31`. It assumes an initially feasible slack basis and does not implement Phase I or integer optimization.

## Evidence and assumptions

The nutrition coefficients come from the two manufacturers' labels. Route duration, inventory, ration targets and equipment masses are explicit teaching assumptions. The 10% body-mass planning limit is a general REI day-hiking guideline, with important individual limitations. The proposal's route classes and 5/10/15/20% progression do not constitute a validated physiological rule.

The reference ledger addresses body mass, age, biological sex and height separately. The reviewed sources do not establish a universal personal load-capacity equation using those four inputs. A future interface should accept an individually chosen planning limit and explain its provenance.

The original proposal files remain local. The professor's PDF and the textbook are cited rather than redistributed. No software license has been selected yet. Third-party material retains its original rights.
