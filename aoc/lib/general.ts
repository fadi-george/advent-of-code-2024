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

export const makeGrid = (w: number, h: number, ch: string | number) =>
  Array(h)
    .fill(0)
    .map(() => Array(w).fill(ch));

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
  const high = Math.floor(n1 / 65536) ^ Math.floor(n2 / 65536);
  const low = (n1 & 0xffff) ^ (n2 & 0xffff);
  return high * 65536 + low;
};

export const modn = (n: number, m: number) => Number(BigInt(n) % BigInt(m));

/**
 * This is a fixed shift right function that works for large numbers. Since JavaScript
 * cast values to 32-bit integers, we need to use this to shift right large numbers.
 */
export const shiftRight = (n: number, m: number) => Number(BigInt(n) >> BigInt(m));

export const shiftLeft = (n: number, m: number) => n * Math.pow(2, m);

export const memoize = <Args extends any[], Result>(func: (...args: Args) => Result) => {
  const cache = new Map<string, Result>();

  return function (...args: Args): Result {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};
