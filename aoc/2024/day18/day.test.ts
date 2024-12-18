import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 18", () => {
  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input, 7, 12);
    expect(result.part1).toBe(22);
    expect(result.part2).toBe("6,1");
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input, 71, 1024);
    expect(result.part1).toBe(304);
    expect(result.part2).toBe("50,28");
  });
});
