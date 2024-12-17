import { isEqualArr } from "../../lib/array";
import { xor } from "../../lib/general";

const [A, B, C] = [0, 1, 2];

export default (input: string) => {
  const [registerLines, programLines] = input.split(/\n\n/);
  const registers = registerLines.split(/\n/).map((l) => +l.match(/\d+/)![0]);
  const program = programLines.match(/\d+/g)!.map(Number);

  return {
    part1: runProgram(registers, program).out.join(","),
    part2: fixRegister(program),
  };
};

export const runProgram = (reg: number[], program: number[]) => {
  let [ptr, out] = [0, [] as number[]];

  // NOTE: Not using ^ or >> operator since it doesn't work well for large numbers
  const getVal = (op: number) => (op <= 3 ? op : reg[op - 4]);
  const getAdv = (c: number) => Math.floor(reg[0] / Math.pow(2, getVal(c)));

  const ops: ((c: number) => number | boolean)[] = [
    (c) => (reg[A] = getAdv(c)), // adv
    (c) => (reg[B] = xor(reg[B], c)), // bxl
    (c) => (reg[B] = getVal(c) % 8), // bst
    (c) => reg[A] && ((ptr = c), true), // jnz
    (c) => (reg[B] = xor(reg[B], reg[C])), // bxc
    (c) => out.push(getVal(c) % 8), // out
    (c) => (reg[B] = getAdv(c)), // bdv
    (c) => (reg[C] = getAdv(c)), // cdv
  ];

  while (ptr < program.length) if (ops[program[ptr]](program[ptr + 1]) !== true) ptr += 2;
  return { out, registers: reg };
};

export const fixRegister = (program: number[]) => {
  let a = 1;
  while (true) {
    const { out } = runProgram([a, 0, 0], program);
    if (out.length > program.length) return null;

    const target = program.slice(-out.length);
    if (isEqualArr(out, target)) {
      if (out.length === program.length) return a;
      a *= 8;
    } else a++;
  }
};
