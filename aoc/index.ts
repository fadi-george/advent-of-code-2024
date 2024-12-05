import { readFile } from "./lib/file.ts";

const year = process.env.YEAR;
const day = process.env.DAY;
const fileName = process.env.FILE;

const runner = await import(`./${year}/day${day}/index.ts`);

const start = performance.now();
const input = readFile(`./aoc/${year}/day${day}/${fileName}.txt`);
const result = runner.default(input);
const end = performance.now();
console.log(result);
console.log(`Time: ${end - start}ms`);
