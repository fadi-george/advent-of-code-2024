export default (input: string) => {
  const S = [];
  let S2 = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const amount = +input[i];
    if (i % 2 === 0) {
      S.push(...Array(amount).fill(id));
      S2.push(`${id}`.repeat(amount));
      id++;
      if (amount === 0) continue;
    } else {
      S.push(...Array(amount).fill("."));
      S2.push(".".repeat(amount));
    }
  }

  console.log(S);
  console.log(S2);

  console.log(S2.join(""));
  console.log(S2);

  // let p1 = 0;
  // for (let i = 0; i < S.length; i++) {
  //   if (S[i] === ".") continue;
  //   p1 += +S[i] * i;
  // }
  const p1 = updateChecksum(S)
    .filter((c) => c !== ".")
    .reduce((acc, curr, i) => acc + +curr * i, 0);

  let i = 0;
  let j = S2.length - 1;
  while (i < j) {
    if (!S2[i].startsWith(".")) {
      i++;
      continue;
    }
    if (S2[j].startsWith(".")) {
      j--;
      continue;
    }
    if (S2[j].length <= S2[i].length) {
      [S2[i], S2[j]] = [S2[j], S2[i]];
      i++;
      j--;
    } else {
      j--;
    }
  }

  console.log([...S2.join("")].join(""));
  S2 = updateChecksum([...S2.join("")]);
  console.log(S2.join(""));
  const p2 = S2.reduce((acc, curr, i) => {
    if (curr === ".") return acc;
    return acc + +curr * i;
  }, 0);

  // const p1 = S.reduce((acc, curr, i) => {
  //   if (curr === ".") return acc;
  //   return acc + +curr * i;
  // }, 0);
  // console.log(p1);

  return { part1: p1, part2: p2 };
};

const updateChecksum = (str: string[]) => {
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== ".") {
      i++;
      continue;
    }
    if (str[j] === ".") {
      j--;
      continue;
    }
    [str[i], str[j]] = [str[j], str[i]];
  }

  return str;
};

// 88957760693 - wrong, wrong
// 5609635945 - wrong
