import { downloadInput, readFile, submit } from "./lib/general";

const year = process.env.YEAR;
const day = process.env.DAY?.padStart(2, "0");
const fileName = process.env.FILE;
const SUBMIT = process.env.SUBMIT as "1" | "2" | undefined;

if (!year || !day) throw new Error("YEAR and DAY must be set");

await downloadInput(year, day);

const dir = import.meta.dir;
const runner = (await import(`${dir}/${year}/day${day}/index.ts`)) as {
  default: (input: string) => { part1: string; part2: string };
};

const start = performance.now();
const input = readFile(`${dir}/${year}/day${day}/${fileName}`);
const result = runner.default(input);
const end = performance.now();
console.log(result);
console.log(`Time: ${end - start}ms`);

if (SUBMIT) {
  const answer = SUBMIT === "1" ? result.part1 : result.part2;
  const submitResult = await submit({ year, day, level: SUBMIT, answer });
  if (submitResult) {
    console.log("Correct!");
  } else {
    console.log("Incorrect");
  }
}
