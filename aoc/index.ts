import { readFile } from "./lib/file";

const year = process.env.YEAR;
const day = process.env.DAY;
const fileName = process.env.FILE;

const input = await readFile(`./aoc/${year}/day${day}/${fileName}.txt`);
const runner = await import(`./${year}/day${day}/index.ts`);

console.log(runner.default(input));
