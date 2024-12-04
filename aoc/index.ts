import { readFile } from "./lib/file";

const year = process.env.YEAR;
const day = process.env.DAY;
const fileName = process.env.FILE;

const runner = await import(`./${year}/day${day}/index.ts`);

const start = Bun.nanoseconds();
const input = readFile(`./aoc/${year}/day${day}/${fileName}.txt`);
const result = runner.default(input);
const end = Bun.nanoseconds();
console.log(result);
console.log(`Time: ${((end - start) / 1e6).toFixed(3)}ms`);
