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

// Credits: to rvodden - aoc 2024 day 24 part 2
const getSwappedWires = (wireMap: WireMap, gates: Gate[]) => {
  const swaps = new Set<string>();

  const findGate = (left: string, right: string, op: string): string | undefined => {
    return gates.find(
      (gate) =>
        gate.op === op &&
        ((gate.left === left && gate.right === right) ||
          (gate.left === right && gate.right === left)) // Check both orderings
    )?.output;
  };

  const swap = (a: string, b: string) => {
    const tempVal = wireMap.get(a);
    wireMap.set(a, wireMap.get(b)!);
    wireMap.set(b, tempVal!);
    swaps.add(a);
    swaps.add(b);
  };

  let carryIn: string | undefined;
  let carryOut: string | undefined;

  for (let i = 0; i < 45; i++) {
    const label = i.toString().padStart(2, "0");
    const x = "x" + label;
    const y = "y" + label;

    let node0 = findGate(x, y, "XOR")!;
    let node1 = findGate(x, y, "AND")!;
    let output = node0;

    if (carryIn) {
      let node2 = findGate(carryIn, node0, "AND");
      if (!node2) {
        swap(node0, node1);
        [node0, node1] = [node1, node0];
        node2 = findGate(carryIn, node0, "AND")!;
      }

      output = findGate(carryIn, node0, "XOR")!;

      if (node0?.startsWith("z")) {
        swap(node0, output);
        [output, node0] = [node0, output];
      }
      if (node1?.startsWith("z")) {
        swap(node1, output);
        [output, node1] = [node1, output];
      }
      if (node2?.startsWith("z")) {
        swap(node2, output);
        [output, node2] = [node2, output];
      }

      carryOut = findGate(node1, node2, "OR");
    }

    if (carryOut?.startsWith("z") && carryOut !== "z45") {
      swap(carryOut, output!);
      [carryOut, output] = [output, carryOut];
    }

    carryIn = carryIn ? carryOut : node1;
  }

  return [...swaps].sort().join(",");
};
