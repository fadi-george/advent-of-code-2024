import { describe, expect, test } from "bun:test";
import { printGrid, readFile } from "../../lib/general";
import solution from "./index";

const path = "aoc/2024/day16/";

describe("day 16", () => {
  test("sample 1", () => {
    const input = readFile(`${path}sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(7036);
    // expect(result.part2).toBe(1597035);
  });

  test("sample 2", () => {
    const input = readFile(`${path}sample2.txt`);
    const result = solution(input);
    expect(result.part1).toBe(11048);
    // expect(result.part2).toBe(1597035);
  });

  // test("puzzle input", () => {
  //   const input = readFile(`${path}input.txt`);
  //   const result = solution(input);
  //   expect(result.part1).toBe(1577255);
  //   expect(result.part2).toBe(1597035);
  // });
});
