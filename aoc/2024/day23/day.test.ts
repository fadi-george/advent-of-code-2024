import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution from "./index";

const dirname = import.meta.dirname;

describe("day 23", () => {
  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe(7);
    expect(result.part2).toBe("co,de,ka,ta");
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1046);
    expect(result.part2).toBe("de,id,ke,ls,po,sn,tf,tl,tm,uj,un,xw,yz");
  });
});
