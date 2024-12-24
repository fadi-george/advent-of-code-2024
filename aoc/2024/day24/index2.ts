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

  const findGate = (left: string, right: string, op: string) =>
    gates.find(
      (g) =>
        g.op === op &&
        ((g.left === left && g.right === right) || (g.left === right && g.right === left))
    )?.output;

  const swap = (a: string, b: string) => {
    [wireMap.set(a, wireMap.get(b)!), wireMap.set(b, wireMap.get(a)!)];
    swaps.add(a).add(b);
  };

  let carryIn: string | undefined;
  let carryOut: string | undefined;

  const swapIfZOutput = (nodeToCheck: string, output: string) => {
    if (nodeToCheck?.startsWith("z")) {
      swap(nodeToCheck, output);
      return output;
    }
    return nodeToCheck;
  };

  for (let i = 0; i < 45; i++) {
    const nI = i.toString().padStart(2, "0");
    const [x, y] = [`x${nI}`, `y${nI}`];

    let node0 = findGate(x, y, "XOR")!; // Sum without carry
    let node1 = findGate(x, y, "AND")!; // Potential carry
    let output = node0;

    if (carryIn) {
      let node2 = findGate(carryIn, node0, "AND");
      if (!node2) {
        swap(node0, node1);
        [node0, node1] = [node1, node0];
        node2 = findGate(carryIn, node0, "AND")!;
      }

      output = findGate(carryIn, node0, "XOR")!;

      node0 = swapIfZOutput(node0, output);
      node1 = swapIfZOutput(node1, output);
      node2 = swapIfZOutput(node2!, output);

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
