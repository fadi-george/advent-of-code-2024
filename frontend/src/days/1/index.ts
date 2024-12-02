export default (input: string) => {
  const leftList: number[] = [];
  const rightList: number[] = [];

  input.split("\n").forEach((line) => {
    const [a, b] = line.split(/\s+/);
    leftList.push(+a);
    rightList.push(+b);
  });

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  const part1 = () => {
    const diff = rightList.reduce(
      (acc, curr, i) => acc + Math.abs(curr - leftList[i]),
      0
    );

    return diff;
  };

  const part2 = () => {
    const freq: Record<number, number> = {};
    rightList.forEach((num) => {
      freq[num] = (freq[num] || 0) + 1;
    });

    const score = leftList.reduce(
      (acc, num) => acc + num * (freq[num] || 0),
      0
    );
    return score;
  };

  return {
    part1: part1(),
    part2: part2(),
  };
};
