const OPS = ["*", "+"];
export default (input: string) => {
  const vals: number[][] = [];
  input.split("\n").forEach((line) => {
    const nums = line.match(/\d+/g)!.map(Number);
    vals.push(nums);
  });

  let p1 = 0;
  vals.forEach((val) => {
    const product = val[0];
    const combs = getCombs(val.slice(1));
    if (combs.some((n) => n === product)) p1 += product;
  });

  return { part1: p1, part2: "" };
};

const getCombs = (val: number[]) => {
  // console.log(val);
  if (val.length === 2) {
    return [val[0] + val[1], val[0] * val[1]];
  } else if (val.length === 1) {
    return val;
  }
  const res: number[] = [];
  const last = val[val.length - 1];
  getCombs(val.slice(0, -1)).forEach((n) => {
    res.push(n + last);
    res.push(n * last);
  });
  // const res: number[] = [];
  // [val[0] + val[1], val[0] * val[1]].forEach((op) => {
  //   getCombs(val.slice(2)).forEach((n) => {
  //     res.push(op + n);
  //     res.push(op * n);
  //   });
  // });
  // const res: number[] = [];
  // const newStrs = getCombs(val.slice(1));
  // newStrs.forEach((newStr) => {
  //   res.push(val[0] + newStr);
  //   res.push(val[0] * newStr);
  // });
  return res;
};

// console.log(getCombs([1, 2, 3]));
console.log(getCombs([11, 6, 16, 20]));
