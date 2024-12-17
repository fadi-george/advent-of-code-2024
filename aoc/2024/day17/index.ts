import { compareArrays } from "../../lib/array";

// import { getGrid } from "../../lib/general";
export const RegMap = {
  A: 0,
  B: 1,
  C: 2,
};

export default (input: string) => {
  const [registerLines, programLines] = input.split(/\n\n/);
  const registers: bigint[] = registerLines
    .split(/\n/)
    .map((l) => l.match(/(\d+)/g)!.map(BigInt)[0]);
  const program = programLines.match(/\d+/g)!.map(BigInt);

  return {
    part1: runProgram(registers, program).out.join(","),
    part2: fixARegister(program),
  };
};

export const runProgram = (registers: bigint[], program: bigint[]) => {
  let insPtr = 0;
  let out: bigint[] = [];

  const runLiteralOp = (op: bigint, comboOp: bigint) => {
    let noJump = true;

    const getAdv = (): bigint => registers[RegMap.A] / 2n ** BigInt(getComboVal(comboOp));

    switch (op) {
      case 0n: // adv
        registers[RegMap.A] = getAdv();
        break;
      case 1n: // bxl
        registers[RegMap.B] ^= comboOp;
        break;
      case 2n: // bst
        registers[RegMap.B] = getComboVal(comboOp) % 8n;
        break;
      case 3n: // jnz
        const AVal = registers[RegMap.A];
        if (AVal !== 0n) {
          insPtr = Number(comboOp);
          noJump = false;
        }
        break;
      case 4n: // bxc
        registers[RegMap.B] ^= registers[RegMap.C];
        break;
      case 5n: // out
        out.push(getComboVal(comboOp) % 8n);
        break;
      case 6n: // bdv
        registers[RegMap.B] = getAdv();
        break;
      case 7n: // cdv
        registers[RegMap.C] = getAdv();
        break;
    }

    return noJump;
  };

  const getComboVal = (op: bigint) => {
    if (op <= 3n) return op;
    if (op === 4n) return registers[RegMap.A];
    if (op === 5n) return registers[RegMap.B];
    if (op === 6n) return registers[RegMap.C];
    throw new Error(`Invalid combo operand: ${op}`);
  };

  while (insPtr < program.length) {
    // if (program[insPtr + 1] === undefined) break;
    const noJump = runLiteralOp(program[insPtr], program[insPtr + 1]);
    if (noJump) {
      insPtr += 2;
    }
  }

  return { out, registers };
};

export const fixARegister = (program: bigint[]) => {
  let a = 1n;

  while (true) {
    const { out } = runProgram([a, 0n, 0n], program);
    if (out.length > program.length) {
      return null;
    }

    if (compareArrays(out, program.slice(program.length - out.length))) {
      if (out.length === program.length) break;
      a *= 8n;
    } else {
      a += 1n;
    }
  }

  return a;
};
