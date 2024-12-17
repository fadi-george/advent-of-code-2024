import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 12", () => {
  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(140);
    expect(result.part2).toBe(80);
  });

  test("example input 2", () => {
    const input = readFile(`${dirname}/sample2.txt`);
    const result = solution(input);
    expect(result.part1).toBe(772);
  });

  test("example input 3", () => {
    const input = readFile(`${dirname}/sample3.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1930);
    expect(result.part2).toBe(1206);
  });

  test("example input 4", () => {
    const input = readFile(`${dirname}/sample4.txt`);
    const result = solution(input);
    expect(result.part2).toBe(236);
  });

  test("example input 5", () => {
    const input = readFile(`${dirname}/sample5.txt`);
    const result = solution(input);
    expect(result.part2).toBe(368);
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1375574);
    expect(result.part2).toBe(830566);
  });
});
