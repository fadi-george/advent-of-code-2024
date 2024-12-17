import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 16", () => {
  test("sample 1", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(7036);
    expect(result.part2).toBe(45);
  });

  test("sample 2", () => {
    const input = readFile(`${dirname}/sample2.txt`);
    const result = solution(input);
    expect(result.part1).toBe(11048);
    expect(result.part2).toBe(64);
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(90440);
  });
});
