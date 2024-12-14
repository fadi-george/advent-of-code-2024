import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const path = "aoc/2024/day14/";

describe("day 13", () => {
  test("puzzle input", () => {
    const input = readFile(`${path}input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(221616000);
    expect(result.part2).toBe(7572);
  });
});
