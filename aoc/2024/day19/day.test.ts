import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 19", () => {
  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(6);
    // expect(result.part2).toBe("");
  });

  // test("puzzle input", () => {
  //   const input = readFile(`${dirname}/input.txt`);
  //   const result = solution(input);
  //   expect(result.part1).toBe("");
  //   // expect(result.part2).toBe("");
  // });
});

// 301 - wrong
