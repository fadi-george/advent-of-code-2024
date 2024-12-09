export default (input: string) => {
  const fullStr = input.split("\n")[0];
  let str = "";
  let id = 0;
  let dotCount = 0;
  for (let i = 0; i < fullStr.length; i++) {
    if ((i & 1) === 0) {
      let amount = +fullStr[i];
      str += `${id}`.repeat(amount);
      id++;
    } else {
      str += ".".repeat(+fullStr[i]);
      dotCount += 1;
    }
  }

  let i = 0;
  let j = str.length - 1;
  const S = str.split("");
  while (i < j) {
    if (S[i] !== ".") {
      i++;
      continue;
    }
    if (S[j] === ".") {
      j--;
      continue;
    }
    let temp = S[i];
    S[i] = S[j];
    S[j] = temp;
    i++;
    j--;
  }

  const p1 = S.reduce((acc, curr, i) => {
    if (curr === ".") return acc;
    return acc + +curr * i;
  }, 0);
  console.log(p1);

  return { part1: p1, part2: "TODO" };
};

// 88957760693 - wrong
// 5609635945 - wrong
