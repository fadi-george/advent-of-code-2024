export default (input: string) => {
  const S = [];
  for (let i = 0; i < input.length; i++)
    S.push(...Array(+input[i]).fill(i % 2 === 0 ? i / 2 : "."));

  const p1 = getChecksum(moveBlocks(S));
  const p2 = getChecksum(moveBlocks2(S));

  return { part1: p1, part2: p2 };
};

const moveBlocks = (blocks: string[]) => {
  const s = blocks.slice();
  for (let l = 0, r = s.length - 1; l < r; l += +(s[l] !== "."), r -= +(s[r] === "."))
    if (s[l] === "." && s[r] !== ".") [s[l], s[r]] = [s[r], s[l]];
  return s;
};

const moveBlocks2 = (blocks: string[]) => {
  const s = blocks.slice();
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (s[left] !== ".") left++;
    while (s[right] === ".") right--;

    // count the length of the id block
    let j = right;
    const ch = s[j];
    while (s[j] === ch) j--;
    const blockLen = right - j;

    for (let i = left; i < right; i++) {
      // count number of free spaces
      if (s[i] !== ".") continue;
      let freeStart = i;
      while (s[freeStart] === ".") freeStart++;
      const freeLen = freeStart - i;

      if (blockLen <= freeLen) {
        for (let n = 0; n < blockLen; n++)
          [s[freeStart - freeLen + n], s[j + n + 1]] = [ch, "."];
        break;
      }
    }
    right -= blockLen;
  }
  return s;
};

const getChecksum = (s: string[]) =>
  s.reduce((acc, curr, i) => (curr === "." ? acc : acc + +curr * i), 0);
