"""Run the two-pivot hiking example or the professor's three-pivot example."""
import argparse
from fractions import Fraction
import json
from pathlib import Path
from .simplex import simplex


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--course-example", action="store_true")
    parser.add_argument("--json", action="store_true", help="Print a machine-readable exact trace")
    args = parser.parse_args()
    scenario = json.loads((Path(__file__).resolve().parents[2] / "data/solo_moderate.json").read_text())
    lp = scenario["simplex_lp"]
    if args.course_example:
        lp = dict(A=[[1, -1], [2, -1], [0, 1]], b=[1, 3, 5], c=[4, 3], names=["x1", "x2"])
    result = simplex(lp["A"], lp["b"], lp["c"], lp["names"])
    if args.json:
        print(json.dumps(result, indent=2, default=str))
        return
    for state in result["trace"]:
        print(f"Basis {state['iteration']}: {state['basis']}")
        print(f"  Basic values: {list(map(str, state['x_basic']))}")
        print(f"  z_N: { {k: str(v) for k, v in state['z_nonbasic'].items()} }")
        print(f"  Objective: {state['objective']}")
        if "entering" in state:
            print(f"  Enter {state['entering']}, leave {state['leaving']}, t={state['step']}")
    if not args.course_example and result["status"] == "optimal":
        tortilla, tuna = [Fraction(u) - removed for u, removed in zip(scenario["food_inventory"], result["x"])]
        mass = 50 * tortilla + 74 * tuna
        print(f"\nPacked servings: tortillas={tortilla}, tuna={tuna}")
        print(f"Food: {mass} g, energy: {140*tortilla+70*tuna} kcal, protein: {4*tortilla+17*tuna} g")
        print(f"Pack total: {float((2300+2500+mass)/1000):.3f} kg. Planning limit: 7 kg")


if __name__ == "__main__":
    main()
