import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const path = "aoc/2024/day14/";

describe("day 13", () => {
  test("example input", () => {
    const input = readFile(`${path}sample.txt`);
    const result = solution(input);
    // expect(result.part1).toBe(480);
    // expect(result.part2).toBe(80);
  });

  test("puzzle input", () => {
    const input = readFile(`${path}input.txt`);
    const result = solution(input);
    // expect(result.part1).toBe(29877);
    // expect(result.part2).toBe(99423413811305);
  });
});
