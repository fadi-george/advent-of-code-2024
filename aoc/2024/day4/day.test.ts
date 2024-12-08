import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/file";
import solution from "./index";

describe("day 6", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day4/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(18);
    expect(result.part2).toBe(9);
  });

  test("puzzle input", () => {
    const input = readFile("aoc/2024/day4/input.txt");
    const result = solution(input);
    expect(result.part1).toBe(2514);
    expect(result.part2).toBe(1888);
  });
});
