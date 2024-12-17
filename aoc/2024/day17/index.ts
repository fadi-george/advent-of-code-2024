import { compareArrays } from "../../lib/array";
import { xor } from "../../lib/general";

export default (input: string) => {
  const [registerLines, programLines] = input.split(/\n\n/);
  const registers = registerLines.split(/\n/).map((l) => +l.match(/\d+/)![0]);
  const program = programLines.match(/\d+/g)!.map(Number);

  return {
    part1: runProgram(registers, program).out.join(","),
    part2: fixARegister(program),
  };
};

export const runProgram = (registers: number[], program: number[]) => {
  let insPtr = 0;
  let out: number[] = [];

  const runLiteralOp = (op: number, comboOp: number) => {
    let noJump = true;

    const getAdv = () => Math.floor(registers[0] / Math.pow(2, getComboVal(comboOp)));

    switch (op) {
      case 0: // adv
        registers[0] = getAdv();
        break;
      case 1: // bxl
        registers[1] = xor(registers[1], comboOp);
        break;
      case 2: // bst
        registers[1] = getComboVal(comboOp) % 8;
        break;
      case 3: // jnz
        const AVal = registers[0];
        if (AVal !== 0) {
          insPtr = comboOp;
          noJump = false;
        }
        break;
      case 4: // bxc
        registers[1] = xor(registers[1], registers[2]);
        break;
      case 5: // out
        out.push(getComboVal(comboOp) % 8);
        break;
      case 6: // bdv
        registers[1] = getAdv();
        break;
      case 7: // cdv
        registers[2] = getAdv();
        break;
    }

    return noJump;
  };

  const getComboVal = (op: number) => {
    if (op <= 3) return op;
    if (op === 4) return registers[0];
    if (op === 5) return registers[1];
    if (op === 6) return registers[2];
    throw new Error(`Invalid combo operand: ${op}`);
  };

  while (insPtr < program.length) {
    const noJump = runLiteralOp(program[insPtr], program[insPtr + 1]);
    if (noJump) insPtr += 2;
  }

  return { out, registers };
};

export const fixARegister = (program: number[]) => {
  let a = 1;
  while (true) {
    const { out } = runProgram([a, 0, 0], program);
    if (out.length > program.length) return null;

    if (compareArrays(out, program.slice(program.length - out.length))) {
      if (out.length === program.length) break;
      a *= 8;
    } else a++;
  }

  return a;
};