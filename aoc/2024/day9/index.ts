export default (input: string) => {
  const S = [];
  for (let i = 0; i < input.length; i++)
    S.push(...Array(+input[i]).fill(i % 2 === 0 ? i / 2 : "."));

  const p1 = getChecksum(moveBlocks(S));
  const p2 = getChecksum(moveBlocks2(S));

  return { part1: p1, part2: p2 };
};

const moveBlocks = (s: string[]) => {
  const str = s.slice();
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    while (str[left] !== ".") left++;
    while (str[right] === ".") right--;
    if (right < left) break;
    [str[left], str[right]] = [str[right], str[left]];
  }
  return str;
};

const moveBlocks2 = (_s: string[]) => {
  const str = _s.slice();

  let s = 0;
  let e = str.length - 1;
  while (s < e) {
    while (str[s] !== ".") s++;
    while (str[e] === ".") e--;

    // s will stay on same "hole" until its filled
    let j = e;

    // count same id segment
    const ch = str[j];
    while (str[j] === ch) j--;
    const rightLen = e - j;

    for (let i = s; i < j; i++) {
      if (str[i] !== ".") continue;

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
        break;
      }
      i++;
    }

    // done with this segment
    e -= rightLen;
  }

  return str;
};

const getChecksum = (s: string[]) =>
  s.reduce((acc, curr, i) => (curr === "." ? acc : acc + +curr * i), 0);
