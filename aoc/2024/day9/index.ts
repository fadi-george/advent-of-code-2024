export default (input: string) => {
  const S = [];
  // const fullStr = input;
  let str = "";
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const amount = +input[i];
    if (i % 2 === 0) {
      S.push(...Array(amount).fill(id));
      // str += `${i / 2}`.repeat(amount);
      id++;
      if (amount === 0) continue;
    } else {
      S.push(...Array(amount).fill("."));
      // str += ".".repeat(amount);
    }
  }

  // let S = str.split("");
  let i = 0;
  let j = S.length - 1;
  while (i < j) {
    if (S[i] !== ".") {
      i++;
      continue;
    }
    if (S[j] === ".") {
      j--;
      continue;
    }
    [S[i], S[j]] = [S[j], S[i]];
  }

  // let p1 = 0;
  // for (let i = 0; i < S.length; i++) {
  //   if (S[i] === ".") continue;
  //   p1 += +S[i] * i;
  // }
  const p1 = S.filter((c) => c !== ".").reduce(
    (acc, curr, i) => acc + +curr * i,
    0
  );

  // const p1 = S.reduce((acc, curr, i) => {
  //   if (curr === ".") return acc;
  //   return acc + +curr * i;
  // }, 0);
  // console.log(p1);

  return { part1: p1, part2: "TODO" };
};

// 88957760693 - wrong, wrong
// 5609635945 - wrong
