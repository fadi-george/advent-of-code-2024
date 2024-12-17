import { readFile } from "../../lib/general";
import path from "path";

class Computer {
  private a: number;
  private b: number;
  private c: number;
  private ip: number = 0;
  private output: number[] = [];
  private program: number[];

  constructor(a: number, b: number, c: number, program: number[]) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.program = program;
  }

  private getComboValue(operand: number): number {
    if (operand <= 3) return operand;
    if (operand === 4) return this.a;
    if (operand === 5) return this.b;
    if (operand === 6) return this.c;
    throw new Error(`Invalid combo operand: ${operand}`);
  }

  run(): string {
    while (this.ip < this.program.length) {
      const opcode = this.program[this.ip];
      const operand = this.program[this.ip + 1];

      switch (opcode) {
        case 0: // adv
          this.a = Math.floor(this.a / Math.pow(2, this.getComboValue(operand)));
          break;
        case 1: // bxl
          this.b ^= operand;
          break;
        case 2: // bst
          this.b = this.getComboValue(operand) % 8;
          break;
        case 3: // jnz
          if (this.a !== 0) {
            this.ip = operand;
            continue;
          }
          break;
        case 4: // bxc
          this.b ^= this.c;
          break;
        case 5: // out
          this.output.push(this.getComboValue(operand) % 8);
          break;
        case 6: // bdv
          this.b = Math.floor(this.a / Math.pow(2, this.getComboValue(operand)));
          break;
        case 7: // cdv
          this.c = Math.floor(this.a / Math.pow(2, this.getComboValue(operand)));
          break;
        default:
          throw new Error(`Unknown opcode: ${opcode}`);
      }
      this.ip += 2;
    }
    return this.output.join(",");
  }
}

const solve = () => {
  const input = readFile(path.resolve(__dirname, "./input.txt"));
  const [registerLines, programLines] = input.split(/\n\n/);
  const registers: number[] = registerLines
    .split(/\n/)
    .map((l) => l.match(/(\d+)/g)!.map(Number)[0]);
  const program = programLines.match(/\d+/g)!.map(Number);

  const computer = new Computer(registers[0], registers[1], registers[2], program);
  return computer.run();
};

console.log(solve());
