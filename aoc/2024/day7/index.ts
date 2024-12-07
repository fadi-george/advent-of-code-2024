const OPS = ["*", "+"];
export default (input: string) => {
  const vals: number[][] = [];
  input.split("\n").forEach((line) => {
    const nums = line.match(/\d+/g)!.map(Number);
    vals.push(nums);
  });

  let p1 = 0;
  let p2 = 0;
  vals.forEach((val) => {
    const product = val[0];
    const combs = getCombs(val.slice(1));
    const combs2 = getCombs(val.slice(1), true);
    // console.log(product, combs, combs2);
    if (combs.some((n) => n === product)) p1 += product;
    if (combs2.some((n) => n === product)) p2 += product;
  });

  return { part1: p1, part2: p2 };
};

const getCombs = (val: number[], allowConcat = false) => {
  // console.log(val);
  if (val.length === 2) {
    const res = [val[0] + val[1], val[0] * val[1]];
    if (allowConcat) res.push(+`${val[0]}${val[1]}`);
    return res;
  } else if (val.length === 1) {
    return val;
  }
  const res: number[] = [];
  const last = val[val.length - 1];
  const first = val[0];
  getCombs(val.slice(0, -1)).forEach((n) => {
    res.push(n + last);
    res.push(n * last);
    if (allowConcat) res.push(+`${n}${last}`);
  });
  if (allowConcat) {
    getCombs(val.slice(1), true).forEach((n) => {
      res.push(+`${first}${n}`);
      res.push(+`${n}${first}`);
    });
  }
  return res;
};

// console.log(getCombs([1, 2, 3]));
console.log(getCombs([11, 6, 16, 20]));
