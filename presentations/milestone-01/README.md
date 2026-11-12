# First progress presentation

**Title:** Trail Balance

**Audience:** Linear Programming class and instructor

**Format:** English, approximately 15 minutes for the 12 main slides. Eight appendix slides support questions and further study. The main talk emphasizes the practical hiking and packing problem. Detailed equations and simplex pivots sit in the appendix.

The [editable PowerPoint](TrailBalance-Milestone-01.pptx) and [PDF](TrailBalance-Milestone-01.pdf) accompany this directory. Full source URLs appear in speaker notes and reference slides. [Presenter notes](speaker-notes.md) include the timing and the questions worth rehearsing. [The model note](../../docs/milestone-01-model.md) contains every calculation.

The source course PDF identifies no author. Its citation therefore uses its title and date, with the instructor attribution left for confirmation rather than invented. The professor's PDF and the full textbook are not included in the public repository.

Rebuild the PowerPoint with `node scripts/build_presentation.mjs` using `@oai/artifact-tool` in an environment that provides it, then export PDF with LibreOffice or PowerPoint. The delivered PDF uses LibreOffice conversion. The mathematics itself requires no third-party packages. The authoring source and content JSON remain editable independently of the exported deck. The main chart shows the backpack mass breakdown. The appendix uses properly indexed variables and exact fractions for the simplex calculations.
