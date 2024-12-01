import { readFile } from "../lib/file";

// part 1
const leftList: number[] = [];
const rightList: number[] = [];
readFile(import.meta.dir).forEach((line) => {
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

  console.log("Part 1: ", diff);
};

const part2 = () => {
  const freq: Record<number, number> = {};
  rightList.forEach((num) => {
    freq[num] = (freq[num] || 0) + 1;
  });

  const score = leftList.reduce((acc, num) => acc + num * (freq[num] || 0), 0);
  console.log("Part 2: ", score);
};

part1();
part2();
