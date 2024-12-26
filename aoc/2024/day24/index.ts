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
  const p2 = getSwappedWires(gates);
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

const getSwappedWires = (gates: Gate[]) => {
  const zCount = gates.filter((g) => g.output.startsWith("z")).length;
  let swaps: string[] = [];

  // order can be different
  const getGate = (x?: string, y?: string, op?: string) =>
    gates.find(
      (g) =>
        g.op === op &&
        ((g.left === x && g.right === y) || (g.left === y && g.right === x))
    );

  // return "";
  let carryIn: string | undefined;
  let carryOut: string | undefined;

  for (let i = 0; i < zCount - 1; i++) {
    const nI = i.toString().padStart(2, "0");
    const [x, y, z] = [`x${nI}`, `y${nI}`, `z${nI}`];

    // half adder
    if (i === 0) {
      const sumG = getGate(x, y, "XOR")!;
      const andG = getGate(x, y, "AND")!;

      if (sumG.output !== "z00") {
        let tmp = sumG.output;
        sumG.output = "z00";
        andG.output = tmp;
      }
      carryIn = andG.output;
      continue;
    }

    let xor1 = getGate(x, y, "XOR")!;
    let sumG = getGate(xor1.output, carryIn, "XOR")!;

    // z output is disconnected from the first xor gate
    if (!sumG) {
      const andG = getGate(x, y, "AND")!;
      let tmp = xor1.output;
      swaps.push(andG.output, xor1.output);
      xor1.output = andG.output;
      andG.output = tmp;
      sumG = getGate(xor1.output, carryIn, "XOR")!;
    }

    // z output is disconnected from the second/last xor gate
    // e.g Xn xor Yn = Zn
    if (sumG.output !== z) {
      swaps.push(sumG.output, z);
      let tmp = sumG.output;
      let zG = gates.find((g) => g.output === z)!;
      sumG.output = z;
      zG.output = tmp;
    }

    let and1 = getGate(xor1.output, carryIn, "AND")?.output;
    let and2 = getGate(x, y, "AND")?.output;
    carryOut = getGate(and1, and2, "OR")?.output;
    carryIn = carryOut;
  }

  return swaps.sort().join(",");
};
