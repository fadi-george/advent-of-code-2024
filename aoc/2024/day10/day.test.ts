import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 10", () => {
  test("example 1 input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1);
  });

  test("example 2 input", () => {
    const input = readFile(`${dirname}/sample2.txt`);
    const result = solution(input);
    expect(result.part1).toBe(2);
  });

  test("example 3 input", () => {
    const input = readFile(`${dirname}/sample3.txt`);
    const result = solution(input);
    expect(result.part1).toBe(4);
    expect(result.part2).toBe(13);
  });

  test("example 4 input", () => {
    const input = readFile(`${dirname}/sample4.txt`);
    const result = solution(input);
    expect(result.part1).toBe(3);
  });

  test("example 5 input", () => {
    const input = readFile(`${dirname}/sample5.txt`);
    const result = solution(input);
    expect(result.part1).toBe(36);
    expect(result.part2).toBe(81);
  });

  test("example 6 input", () => {
    const input = readFile(`${dirname}/sample6.txt`);
    const result = solution(input);
    expect(result.part2).toBe(3);
  });

  test("example 7 input", () => {
    const input = readFile(`${dirname}/sample7.txt`);
    const result = solution(input);
    expect(result.part2).toBe(227);
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(472);
    expect(result.part2).toBe(969);
  });
});
