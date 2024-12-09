export default (input: string) => {
  const S = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const amount = +input[i];
    if (i % 2 === 0) {
      S.push(...Array(amount).fill(id));
      id++;
      if (amount === 0) continue;
    } else {
      S.push(...Array(amount).fill("."));
    }
  }

  const p1 = getChecksum(moveBlocks(S));
  const p2 = getChecksum(moveBlocks2(S));

  return { part1: p1, part2: p2 };
};

const moveBlocks = (s: string[]) => {
  const str = s.slice();
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

const moveBlocks2 = (_s: string[]) => {
  const str = _s.slice();

  let s = 0;
  let e = str.length - 1;
  while (s < e) {
    if (str[s] !== ".") {
      s++;
      continue;
    }
    if (str[e] === ".") {
      e--;
      continue;
    }

    let j = e;
    let sub = 1;

    // count ids
    const ch = str[j];
    while (str[j] === ch) j--;
    const rightLen = e - j;

    for (let i = s; i < j; i++) {
      if (str[i] !== ".") {
        continue;
      }

      // count dots
      let leftLen = 0;
      let d = i;
      while (str[d] === ".") {
        leftLen++;
        d++;
      }

      const min = Math.min(leftLen, rightLen);

      if (rightLen <= leftLen) {
        for (let n = 0; n < min; n++) {
          str[d - leftLen + n] = ch;
          str[j + n + 1] = ".";
        }
        sub = min;
        break;
      }
      i++;
    }

    e -= rightLen;
  }

  return str;
};

const getChecksum = (s: string[]) => {
  return s.reduce((acc, curr, i) => {
    if (curr === ".") return acc;
    return acc + +curr * i;
  }, 0);
};
