import { downloadInput, getDay, readFile, submit } from "./lib/general";

const year = process.env.YEAR ?? new Date().getFullYear().toString();
const fileName = process.env.FILE;
const submitPart = process.env.SUBMIT as "1" | "2" | undefined;
const day = await getDay();

const dir = import.meta.dir;
if (fileName === "input") {
  await downloadInput(dir, year, day);
}

const runner = (await import(`${dir}/${year}/day${day}/index.ts`)) as {
  default: (input: string) => { part1: string; part2: string };
};

console.info("Day ", day);
const start = performance.now();
const input = readFile(`${dir}/${year}/day${day}/${fileName}.txt`);
const result = runner.default(input);
const end = performance.now();
console.info(result);
console.info(`Time: ${end - start}ms`);

if (submitPart) {
  const answer = submitPart === "1" ? result.part1 : result.part2;
  const submitResult = await submit({ year, day, level: submitPart, answer });
  if (submitResult) {
    console.info("Correct!");
  } else {
    console.info("Incorrect");
  }
}
