export default function solution(input: string) {
  const [wires, gateLines] = input.split("\n\n");
  const wireMap = new Map<string, number>();
  for (const wire of wires.split("\n")) {
    const [name, value] = wire.split(": ");
    wireMap.set(name, +value);
  }

  const gates = gateLines.split("\n").map((line) => {
    const [input, output] = line.split(" -> ");
    const [left, op, right] = input.split(" ");
    return { left, op, right, output };
  });

  const p1 = run(wireMap, gates);
  const p2 = getSwappedWires(wireMap, gates);
  return { part1: p1, part2: p2 };
}

type WireMap = Map<string, number>;
type Gate = { left: string; op: string; right: string; output: string };

const run = (wireMap: WireMap, gates: Gate[]) => {
  let changed = true;
  while (changed) {
    changed = false;
    gates.forEach((gate) => {
      const left = wireMap.get(gate.left)!;
      const right = wireMap.get(gate.right)!;

      let val = 0;
      switch (gate.op) {
        case "AND":
          val = left & right;
          break;
        case "OR":
          val = left | right;
          break;
        case "XOR":
          val = left ^ right;
          break;
      }

      const current = wireMap.get(gate.output);
      if (current !== val) {
        wireMap.set(gate.output, val);
        changed = true;
      }
    });
  }

  let res: number[] = [];
  [...wireMap.entries()].forEach(([key, value]) => {
    if (key.startsWith("z")) {
      const index = +key.slice(1);
      res[index] = value;
    }
  });

  const val = res.reverse().join("");
  return parseInt(val, 2);
};

const getSwappedWires = (wireMap: WireMap, gates: Gate[]) => {
  const zCount = [...wireMap.entries()].filter(([key]) => key.startsWith("z")).length;
  let swaps: string[] = [];
  // console.log({ gates });
  const gateMap = new Map<string, Gate>();
  gates.forEach((gate) => {
    gateMap.set(gate.output, gate);
  });

  // order can be different
  const getGate = (x?: string, y?: string, op?: string) =>
    gates.find(
      (gate) =>
        (gate.op === op && gate.left === x && gate.right === y) ||
        (gate.left === y && gate.right === x)
    );

  // return "";
  let carryIn: string | undefined;
  // let carryOut: string | undefined;
  for (let i = 0; i < zCount; i++) {
    const nI = i.toString().padStart(2, "0");
    const [x, y] = [`x${nI}`, `y${nI}`];

    // half adder
    if (i === 0) {
      const sum = getGate(x, y, "XOR")?.output;
      carryIn = getGate(x, y, "AND")?.output;
      // carryIn = carryOut;

      if (sum !== "z00") {
        throw new Error("sum is not z00");
      }

      continue;
    }

    // // full adder
    // let xor1 = getGate(x, y, "XOR")?.output;
    // let sum = getGate(xor1, carryIn, "XOR")?.output;
    // let and1 = getGate(xor1, carryIn, "AND")?.output;
    // let and2 = getGate(x, y, "AND")?.output;
    // carryIn = getGate(and1, and2, "OR")?.output;
    // // carryIn = carryOut;

    // if (sum !== `z${nI}`) {
    //   throw new Error(`sum is not z${i}`);
    // }

    // work backwards from output
  }

  return swaps.sort().join(",");
};
