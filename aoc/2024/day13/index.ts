const COST = [3, 1]; // A, B button

export default (input: string) => {
  const machines: number[][] = [];
  let i = 0;
  input.split("\n").forEach((line) => {
    // matcb digit
    const digits = line.match(/\d+/g);
    if (digits) {
      const [x, y] = digits.map(Number);
      // console.log(x, y);
      // if (line.startsWith("Button")) {
      //   machines.push([x, y]);
      // }
      if (!machines[i]) machines[i] = [];
      machines[i].push(x, y);
    } else {
      i++;
    }
  });

  let p1 = 0;
  let p2 = 0;
  machines.forEach((machine, i) => {
    const [a, b, c, d, x, y] = machine;
    const res = solveMatrix(a, c, b, d, x, y);
    const res2 = solveMatrix(a, c, b, d, x + 10000000000000, y + 10000000000000);

    // const res2 = solveMatrix2(
    //   BigInt(a),
    //   BigInt(c),
    //   BigInt(d),
    //   BigInt(b),
    //   BigInt(x) + 10000000000000n,
    //   BigInt(y) + 10000000000000n
    // );
    // console.log({ x: x + 10000000000000, y: y + 10000000000000, res2 });
    // // console.log(x + 10000000000000);
    // // console.log(y + 10000000000000);
    // // if (res) {
    // //   p1 += res[0] * 3 + res[1] * 1;
    // // }
    // if (res2) {
    //   p2 += res2[0] * 3n + res2[1] * 1n;
    // }
    if (res) {
      p1 += res[0] * 3 + res[1] * 1;
    }
    if (res2) {
      // console.log({ i, res2 });
      p2 += res2[0] * 3 + res2[1] * 1;
    }
  });
  // let [p1, p2] = [0, 0];

  // // Solve matrix equation: [[a,b],[c,d]] * [n,m] = [x,y]
  // // Using Cramer's rule to solve for n and m

  return { part1: p1, part2: p2 };
};

const solveMatrix = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  y: number
) => {
  const det = a * d - b * c;
  if (det === 0) return null; // No solution if determinant is 0

  const n = (d * x - b * y) / det;
  const m = (-c * x + a * y) / det;
  if (Number.isInteger(n) && Number.isInteger(m)) return [n, m];
  return null;
};

// const solveMatrix2 = (
//   a: bigint,
//   b: bigint,
//   c: bigint,
//   d: bigint,
//   x: bigint,
//   y: bigint
// ) => {
//   const det = a * d - b * c;
//   console.log({ det });
//   if (det === 0n) return null; // No solution if determinant is 0

//   const n = (d * x - b * y) / det;
//   const m = (-c * x + a * y) / det;
//   console.log("what");
//   return [n, m];
// };
