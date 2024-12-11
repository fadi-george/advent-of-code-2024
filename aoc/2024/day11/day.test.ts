import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/file";
import solution from "./index";

describe("day 11", () => {
  test("example input", () => {
    const input = readFile("aoc/2024/day11/sample.txt");
    const result = solution(input);
    expect(result.part1).toBe(1);
  });
});
