const getCombs2 = (v: number[], allowConcat = false) => {
  const res: string[] = [];
  if (v.length === 1) return [];
  if (v.length === 2)
    return [`${v[0]} + ${v[1]}`, `${v[0]} * ${v[1]}`].concat(
      allowConcat ? [`${v[0]} || ${v[1]}`] : []
    );

  getCombs2(v.slice(1), allowConcat).forEach((strs) => {
    res.push(`${v[0]} + ${strs}`);
    res.push(`${v[0]} * ${strs}`);
    if (allowConcat) res.push(`${v[0]} || ${strs}`);
  });

  return res;
};
const evalCombs = (combs: string[]) =>
  combs.map((comb) => {
    const ops = comb.split(" ");

    let res = +ops[0];
    for (let i = 1; i < ops.length; i += 2) {
      if (ops[i] === "+") {
        res += +(+ops[i + 1]);
      } else if (ops[i] === "*") {
        res = res * +(+ops[i + 1]);
      } else if (ops[i] === "||") {
        res = +`${res}${ops[i + 1]}`;
      }
    }

    return res;
  });

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
    const combs = evalCombs(getCombs2(val.slice(1)));
    const combs2 = evalCombs(getCombs2(val.slice(1), true));
    if (combs.some((n) => n === product)) p1 += product;
    if (combs2.some((n) => n === product)) {
      p2 += product;
    }
  });

  return { part1: p1, part2: p2 };
};

// 74493743489417 too low
