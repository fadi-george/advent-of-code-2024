const getCombs = (arr: number[], allowConcat = false) => {
  if (arr.length === 1) return [arr[0]];

  const res: number[] = [];
  const q = [
    { v: arr[0] + arr[1], l: 2 },
    { v: arr[0] * arr[1], l: 2 },
    ...(allowConcat ? [{ v: +`${arr[0]}${arr[1]}`, l: 2 }] : []),
  ];

  for (const curr of q) {
    if (curr.l === arr.length) {
      res.push(curr.v);
      continue;
    }

    q.push(
      { v: curr.v + arr[curr.l], l: curr.l + 1 },
      { v: curr.v * arr[curr.l], l: curr.l + 1 },
      ...(allowConcat ? [{ v: +`${curr.v}${arr[curr.l]}`, l: curr.l + 1 }] : [])
    );
  }

  return res;
};

export default (input: string) => {
  const vals: number[][] = [];
  input.split("\n").forEach((line) => {
    const nums = line.match(/\d+/g)!.map(Number);
    vals.push(nums);
  });

  let p1 = 0;
  let p2 = 0;
  vals.forEach((val) => {
    const [product, ...rest] = val;
    const combs = getCombs(rest);
    const combs2 = getCombs(rest, true);
    p1 += combs.includes(product) ? product : 0;
    p2 += combs2.includes(product) ? product : 0;
  });

  return { part1: p1, part2: p2 };
};
