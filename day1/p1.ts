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

const diff = rightList.reduce(
  (acc, curr, i) => acc + Math.abs(curr - leftList[i]),
  0
);

console.log(diff);
