import fs from "fs";
import path from "path";
import { createInterface } from "readline/promises";

export const readFile = (filePath: string) => {
  if (!filePath) throw new Error("FILE is not set");
  return fs.readFileSync(filePath, "utf8");
};

export const downloadInput = async (dir: string, year: string, day: string) => {
  const inputPath = path.resolve(`${dir}/${year}/day${day}/input.txt`);
  if (!fs.existsSync(inputPath)) {
    console.log(`Downloading input for ${year} day ${day}...`);
    const input = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
      headers: {
        Cookie: process.env.AOC_SESSION_COOKIE || "",
      },
    });
    if (!input.ok) {
      throw new Error(
        `Failed to download input for ${year} day ${day}: ${input.statusText}`
      );
    }
    const text = await input.text();
    fs.writeFileSync(inputPath, text.trim());
  }
};

export const submit = async ({
  answer,
  day,
  level,
  year,
}: {
  answer: string;
  day: string;
  level: "1" | "2";
  year: string;
}) => {
  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
    method: "POST",
    body: new URLSearchParams({ level, answer }),
    headers: {
      Cookie: process.env.AOC_SESSION_COOKIE || "",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const text = await response.text();
  const dom = new DOMParser().parseFromString(text, "text/html");
  return dom.body.textContent?.includes("That's the right answer!");
};

export const getDay = async () => {
  const day = process.env.DAY;

  const formatDay = (day: string) => {
    return clamp(parseInt(day), 1, 25).toString().padStart(2, "0");
  };

  if (day) return formatDay(day);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const input = await rl.question("Enter the day: ");
  await rl.close();
  return formatDay(input);
};

export const getGrid = (input: string) => input.split("\n").map((row) => row.split(""));

export const printGrid = (grid: string[][]) => {
  console.log(grid.map((row) => row.join("")).join("\n"));
  console.log("\n");
};

export const mod = (n: number, m: number) => ((n % m) + m) % m;

export const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export const largeXor = (a: bigint, b: bigint) => a ^ b;

/**
 * This is a fixed xor function that works for large numbers. Since JavaScript
 * cast values to 32-bit integers, we need to use this to xor large numbers.
 */
export const xor = (n1: number, n2: number) => {
  let result = 0;
  let multiplier = 1;

  while (n1 > 0 || n2 > 0) {
    const chunk1 = n1 % 0x100000000;
    const chunk2 = n2 % 0x100000000;
    result += multiplier * (chunk1 ^ chunk2);

    multiplier *= 0x100000000;
    n1 = Math.floor(n1 / 0x100000000);
    n2 = Math.floor(n2 / 0x100000000);
  }

  return result;
};
