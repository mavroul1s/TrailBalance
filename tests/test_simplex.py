import csv
from fractions import Fraction as F
from itertools import combinations
import json
from pathlib import Path
import unittest
from trailbalance.simplex import simplex, solve_linear

ROOT = Path(__file__).resolve().parents[1]


class SimplexTests(unittest.TestCase):
    def test_hiking_and_certificate(self):
        data = json.loads((ROOT / "data/solo_moderate.json").read_text())
        lp = data["simplex_lp"]
        result = simplex(lp["A"], lp["b"], lp["c"], lp["names"])
        self.assertEqual(result["x"], [2, 1])
        self.assertEqual(result["objective"], 174)
        self.assertEqual(result["slacks"], [0, 0, 4, 1])
        self.assertEqual([r.get("step") for r in result["trace"][:-1]], [F(25, 17), F(2)])
        self.assertEqual(result["dual"], [F(277, 1050), F(49, 15), 0, 0])
        self.assertEqual(sum(F(b) * u for b, u in zip(lp["b"], result["dual"])), 174)
        self.assertEqual(630 * F(277, 1050) + 33 * F(49, 15), 274)
        packed = [a - y for a, y in zip(data["food_inventory"], result["x"])]
        self.assertEqual(packed, [4, 1])
        self.assertEqual(50 * packed[0] + 74 * packed[1], 274)
        self.assertEqual(140 * packed[0] + 70 * packed[1], 630)
        self.assertEqual(4 * packed[0] + 17 * packed[1], 33)

    def test_course_example(self):
        r = simplex([[1, -1], [2, -1], [0, 1]], [1, 3, 5], [4, 3])
        self.assertEqual(r["x"], [4, 5])
        self.assertEqual(r["objective"], 31)
        self.assertEqual([(s["entering"], s["leaving"]) for s in r["trace"][:-1]],
                         [("x1", "s1"), ("x2", "s2"), ("s1", "s3")])

    def test_independent_vertex_enumeration(self):
        # Enumerate the original minimization polygon, without simplex.
        lines = [(140,70,630),(4,17,33),(1,0,0),(0,1,0),(1,0,6),(0,1,2)]
        candidates = []
        for u, v in combinations(lines, 2):
            if u[0]*v[1] == u[1]*v[0]:
                continue
            t, tuna = solve_linear([u[:2],v[:2]], [u[2],v[2]])
            if 0 <= t <= 6 and 0 <= tuna <= 2 and 140*t+70*tuna >= 630 and 4*t+17*tuna >= 33:
                candidates.append((50*t+74*tuna, t, tuna))
        self.assertEqual(min(candidates), (274, 4, 1))

    def test_fixed_kit_and_capacity(self):
        with (ROOT / "data/fixed_kit.csv").open() as handle:
            mass = sum(int(row["mass_g"]) for row in csv.DictReader(handle))
        self.assertEqual(mass, 2300)
        self.assertEqual(F(mass+2500+274, 1000), F(2537,500))
        self.assertLessEqual(mass+2500+50*6+74*2, 7000)

    def test_unbounded(self):
        self.assertEqual(simplex([[-1]], [1], [1])["status"], "unbounded")

    def test_phase_one_required(self):
        with self.assertRaisesRegex(ValueError, "Phase I"):
            simplex([[-1]], [-1], [1])

    def test_degenerate_zero_step(self):
        result = simplex([[1]], [0], [1], rule="bland")
        self.assertEqual(result["trace"][0]["step"], 0)
        self.assertEqual(result["objective"], 0)

    def test_bland_avoids_classic_cycling(self):
        result = simplex([[F(1,2),F(-11,2),F(-5,2),9],
                          [F(1,2),F(-3,2),F(-1,2),1], [1,0,0,0]],
                         [0,0,1], [10,-57,-9,-24], rule="bland")
        self.assertEqual(result["objective"], 1)


if __name__ == "__main__":
    unittest.main()
