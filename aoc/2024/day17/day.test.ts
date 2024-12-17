import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution, { RegMap, runProgram } from "./index";

const dirname = import.meta.dirname;

describe("day 17", () => {
  test("examples", () => {
    let out;
    let registers;
    ({ registers } = runProgram([0n, 0n, 9n], [2n, 6n]));
    expect(registers[RegMap.B]).toEqual(1n);

    ({ out } = runProgram([10n, 0n, 0n], [5n, 0n, 5n, 1n, 5n, 4n]));
    expect(out.join(",")).toEqual("0,1,2");

    ({ out } = runProgram([2024n, 0n, 0n], [0n, 1n, 5n, 4n, 3n, 0n]));
    expect(out.join(",")).toEqual("4,2,5,6,7,7,7,7,3,1,0");

    ({ out, registers } = runProgram([0n, 29n, 0n], [1n, 7n]));
    expect(registers[RegMap.B]).toEqual(26n);

    ({ out, registers } = runProgram([0n, 2024n, 43690n], [4n, 0n]));
    expect(registers[RegMap.B]).toEqual(44354n);
  });

  test("example input", () => {
    const input = readFile(`${dirname}/sample.txt`);
    const result = solution(input);
    expect(result.part1).toBe("4,6,3,5,6,3,5,2,1,0");
  });

  test("example input 2", () => {
    const input = readFile(`${dirname}/sample2.txt`);
    const result = solution(input);
    expect(result.part2).toBe(117440n);
  });

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe("2,3,4,7,5,7,3,0,7");
    expect(result.part2).toBe(190384609508367n);
  });
});
