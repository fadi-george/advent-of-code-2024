export default (input: string) => {
  const S = [];
  for (let i = 0; i < input.length; i++)
    S.push(...Array(+input[i]).fill(i % 2 === 0 ? i / 2 : "."));

  const p1 = getChecksum(moveBlocks(S));
  const p2 = getChecksum(moveBlocks2(S));

  return { part1: p1, part2: p2 };
};

const moveBlocks = (blocks: string[]) => {
  const str = blocks.slice();
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

const moveBlocks2 = (blocks: string[]) => {
  const str = blocks.slice();
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    while (str[left] !== ".") left++;
    while (str[right] === ".") right--;

    // s will stay on same "hole" until its filled
    let j = right;

    // count same id segment
    const ch = str[j];
    while (str[j] === ch) j--;
    const blockLen = right - j;

    for (let i = left; i < right; i++) {
      if (str[i] !== ".") continue;

      // count dots
      let freeStart = i;
      while (str[freeStart] === ".") freeStart++;
      const freeLen = freeStart - i;

      const min = Math.min(freeLen, blockLen);

      if (blockLen <= freeLen) {
        for (let n = 0; n < min; n++) {
          str[freeStart - freeLen + n] = ch;
          str[j + n + 1] = ".";
        }
        break;
      }
      i++;
    }

    // done with this segment
    right -= blockLen;
  }

  return str;
};

const getChecksum = (s: string[]) =>
  s.reduce((acc, curr, i) => (curr === "." ? acc : acc + +curr * i), 0);
