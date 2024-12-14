import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

describe("day 9", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day9/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(1928);
    expect(result.part2).toBe(2858);
  });

  test("puzzle input", () => {
    const input = readFile("aoc/2024/day9/input.txt");
    const result = solution(input);
    expect(result.part1).toBe(6259790630969);
    expect(result.part2).toBe(6289564433984);
  });
});
