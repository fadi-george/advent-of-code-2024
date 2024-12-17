import fs from "fs";
import path from "path";

export const readFile = (filePath: string) => {
  if (!filePath) throw new Error("FILE is not set");
  return fs.readFileSync(filePath, "utf8");
};

export const downloadInput = async (year: string, day: string) => {
  const inputPath = path.resolve(`./aoc/${year}/day${day}/input.txt`);
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
    fs.writeFileSync(inputPath, text);
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

export const printGrid = (grid: string[][]) => {
  console.log(grid.map((row) => row.join("")).join("\n"));
  console.log("\n");
};

export const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};
