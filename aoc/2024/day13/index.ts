export default (input: string) => {
  const clawVals = input.split("\n\n").map((group) => group.match(/\d+/g)!.map(Number));

  return {
    part1: getCost(clawVals),
    part2: getCost(clawVals.map((v) => [...v.slice(0, 4), v[4] + 1e13, v[5] + 1e13])),
  };
};

const solveMatrix = (...args: number[]) => {
  const [a, c, b, d, x, y] = args; // swapping b,c since ordering is different in input
  const det = a * d - b * c;
  if (det === 0) return null; // No solution if determinant is 0

  const n = (d * x - b * y) / det;
  const m = (-c * x + a * y) / det;
  return Number.isInteger(n) && Number.isInteger(m) ? [n, m] : null;
};

const getCost = (vals: number[][]) =>
  vals.reduce((acc, v) => {
    const sol = solveMatrix(...v);
    return sol ? acc + sol[0] * 3 + sol[1] * 1 : acc;
  }, 0);
