import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution, { getCheats } from "./index";
import { findInGrid } from "../../lib/array";

const dirname = import.meta.dirname;

describe("day 20", () => {
  test("example input", () => {
    const grid = `
      ###############
      #...#...#.....#
      #.#.#.#.#.###.#
      #S#...#.#.#...#
      #######.#.#.###
      #######.#.#...#
      #######.#.###.#
      ###..E#...#...#
      ###.#######.###
      #...###...#...#
      #.#####.#.###.#
      #.#...#.#.#...#
      #.#.#.#.#.#.###
      #...#...#...###
      ###############
    `
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    const start = findInGrid(grid, "S");
    const end = findInGrid(grid, "E");

    const cheats = getCheats(grid, start, end, 84);
    expect(cheats).toEqual({
      "2": 12,
      "4": 12,
      "8": 2,
      "10": 1,
      "12": 2,
      "20": 1,
      "36": 1,
      "40": 1,
      "64": 1,
    });
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1395);
    expect(result.part2).toBe("");
  });
});
