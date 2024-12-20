import { describe, expect, test } from "bun:test";
import { getGrid, readFile } from "../../lib/general";
import solution, { findCheats, getBestPath } from "./index";
import { findInGrid } from "../../lib/array";

const dirname = import.meta.dirname;

describe("day 20", () => {
  test("example input 1", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const grid = getGrid(input);
    const start = findInGrid(grid, "S");
    const end = findInGrid(grid, "E");
    const bestPath = getBestPath(grid, start, end);
    const cheats = findCheats(bestPath, 2);
    expect(cheats).toEqual({
      "2": 14,
      "4": 14,
      "6": 2,
      "8": 4,
      "10": 2,
      "12": 3,
      "20": 1,
      "36": 1,
      "38": 1,
      "40": 1,
      "64": 1,
    });

    const cheats2 = findCheats(bestPath, 20);
    expect(cheats2).toMatchObject({
      "50": 32,
      "52": 31,
      "54": 29,
      "56": 39,
      "58": 25,
      "60": 23,
      "62": 20,
      "64": 19,
      "66": 12,
      "68": 14,
      "70": 12,
      "72": 22,
      "74": 4,
      "76": 3,
    });
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1395);
    expect(result.part2).toBe(993178);
  });
});
