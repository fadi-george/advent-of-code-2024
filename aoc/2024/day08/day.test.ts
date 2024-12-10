import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/file";
import solution from "./index";

describe("day 8", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day8/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(14);
    expect(result.part2).toBe(34);
  });

  test("puzzle input", () => {
    const input = readFile("aoc/2024/day8/input.txt");
    const result = solution(input);
    expect(result.part1).toBe(400);
    expect(result.part2).toBe(1280);
  });
});
