import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/file";
import solution from "./index";

describe("day 12", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day12/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(140);
  });

  test("example input 2", () => {
    const input = readFile("aoc/2024/day12/sample2.txt");
    const result = solution(input);
    expect(result.part1).toBe(772);
  });

  test("example input 3", () => {
    const input = readFile("aoc/2024/day12/sample3.txt");
    const result = solution(input);
    expect(result.part1).toBe(1930);
  });

  // test("puzzle input", () => {
  //   const input = readFile("aoc/2024/day12/input.txt");
  //   const result = solution(input);
  //   expect(result.part1).toBe("");
  //   expect(result.part2).toBe("");
  // });
});
