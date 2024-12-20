import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 20", () => {
  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1395);
    expect(result.part2).toBe(993178);
  });
});
