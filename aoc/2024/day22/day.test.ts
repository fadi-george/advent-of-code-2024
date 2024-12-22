import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 22", () => {
  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(37327623);
  });

  test("example input 2", () => {
    const input = readFile(`${dirname}/sample2.txt`);
    const result = solution(input);
    expect(result.part2).toBe(23);
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(13185239446);
    expect(result.part2).toBe(1501);
  });
});
