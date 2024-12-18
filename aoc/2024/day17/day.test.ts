import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution, { B, runProgram } from "./index";

const dirname = import.meta.dirname;

describe("day 17", () => {
  test("examples", () => {
    let out;
    let registers;
    ({ registers } = runProgram([0, 0, 9], [2, 6]));
    expect(registers[B]).toEqual(1);

    ({ out } = runProgram([10, 0, 0], [5, 0, 5, 1, 5, 4]));
    expect(out.join(",")).toEqual("0,1,2");

    ({ out } = runProgram([2024, 0, 0], [0, 1, 5, 4, 3, 0]));
    expect(out.join(",")).toEqual("4,2,5,6,7,7,7,7,3,1,0");

    ({ out, registers } = runProgram([0, 29, 0], [1, 7]));
    expect(registers[B]).toEqual(26);

    ({ out, registers } = runProgram([0, 2024, 43690], [4, 0]));
    expect(registers[B]).toEqual(44354);
  });

  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe("4,6,3,5,6,3,5,2,1,0");
  });

  test("example input 2", () => {
    const input = readFile(`${dirname}/sample2.txt`);
    const result = solution(input);
    expect(result.part2).toBe(117440);
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe("2,3,4,7,5,7,3,0,7");
    expect(result.part2).toBe(190384609508367);
  });
});
