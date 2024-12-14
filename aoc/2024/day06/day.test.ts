import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

describe("day 6", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day6/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(41);
    expect(result.part2).toBe(6);
  });

  test("puzzle input", () => {
    const input = readFile("aoc/2024/day6/input.txt");
    const result = solution(input);
    expect(result.part1).toBe(4883);
    expect(result.part2).toBe(1655);
  });
});
