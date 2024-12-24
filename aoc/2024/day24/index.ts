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

  // console.log({ wireMap, gates });
  const p1 = run(wireMap, gates);
  return { part1: p1, part2: 0 };
}

type WireMap = Map<string, number>;
type Gate = { left: string; op: string; right: string; output: string };

const run = (wireMap: WireMap, gates: Gate[]) => {
  // Keep processing gates until no more changes occur
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

      // Only update if the value is different
      const current = wireMap.get(gate.output);
      if (current !== val) {
        wireMap.set(gate.output, val);
        changed = true;
      }
    });
  }

  // Rest of the code remains the same
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
