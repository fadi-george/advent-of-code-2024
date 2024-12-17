// import { getGrid } from "../../lib/general";
export const RegMap = {
  A: 0,
  B: 1,
  C: 2,
};

export default (input: string) => {
  const [registerLines, programLines] = input.split(/\n\n/);
  const registers: number[] = registerLines
    .split(/\n/)
    .map((l) => l.match(/(\d+)/g)!.map(Number)[0]);
  const program = programLines.match(/\d+/g)!.map(Number);

  const { out: p1 } = runProgram(registers, program);

  return {
    part1: p1,
    part2: "TODO",
  };
};

export const runProgram = (registers: number[], program: number[]) => {
  let insPtr = 0;
  let out: number[] = [];

  const runLiteralOp = (op: number, comboOp: number) => {
    let noJump = true;

    const getAdv = () =>
      Math.floor(registers[RegMap.A] / Math.pow(2, getComboVal(comboOp)));

    switch (op) {
      case 0: // adv
        registers[RegMap.A] = getAdv();
        break;
      case 1: // bxl
        registers[RegMap.B] ^= comboOp;
        break;
      case 2: // bst
        registers[RegMap.B] = getComboVal(comboOp) % 8;
        break;
      case 3: // jnz
        const AVal = registers[RegMap.A];
        if (AVal !== 0) {
          insPtr = comboOp;
          noJump = false;
        }
        break;
      case 4: // bxc
        registers[RegMap.B] ^= registers[RegMap.C];
        break;
      case 5: // out
        out.push(getComboVal(comboOp) % 8);
        break;
      case 6: // bdv
        registers[RegMap.B] = getAdv();
        break;
      case 7: // cdv
        registers[RegMap.C] = getAdv();
        break;
    }

    return noJump;
  };

  const getComboVal = (op: number) => {
    if (op <= 3) return op;
    if (op === 4) return registers[RegMap.A];
    if (op === 5) return registers[RegMap.B];
    if (op === 6) return registers[RegMap.C];
    throw new Error(`Invalid combo operand: ${op}`);
  };

  while (insPtr < program.length) {
    // if (program[insPtr + 1] === undefined) break;
    const noJump = runLiteralOp(program[insPtr], program[insPtr + 1]);
    if (noJump) {
      insPtr += 2;
    }
  }

  console.log({ out });
  return { out: out.join(","), registers };
};

// 1,3,3,6,6,6,1,0,6
