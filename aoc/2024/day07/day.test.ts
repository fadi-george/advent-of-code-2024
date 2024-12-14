import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

describe("day 7", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day7/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(3749);
    expect(result.part2).toBe(11387);
  });

  test("puzzle input", () => {
    const input = readFile("aoc/2024/day7/input.txt");
    const result = solution(input);
    expect(result.part1).toBe(20281182715321);
    expect(result.part2).toBe(159490400628354);
  });
});
