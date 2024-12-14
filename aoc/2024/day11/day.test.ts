import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

describe("day 11", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day11/sample.txt");
    const result = solution(input, 1);
    expect(result.part1).toBe(7);
  });

  test("example input 2", () => {
    const input = readFile("aoc/2024/day11/sample2.txt");
    const result = solution(input, 6);
    expect(result.part1).toBe(22);

    const result2 = solution(input, 25);
    expect(result2.part1).toBe(55312);
  });

  test("puzzle input", () => {
    const input = readFile("aoc/2024/day11/input.txt");
    const result = solution(input);
    expect(result.part1).toBe(212655);
    expect(result.part2).toBe(253582809724830);
  });
});
