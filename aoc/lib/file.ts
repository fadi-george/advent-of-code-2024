import fs from "fs";
import "./array"; // array prototype methods
import path from "path";

export const readFile = (file: string) => {
  if (!file) throw new Error("FILE is not set");
  return fs.readFileSync(path.resolve(file), "utf8");
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
