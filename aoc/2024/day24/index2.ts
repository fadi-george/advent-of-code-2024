type Operation = { (vals: boolean[]): boolean };

interface Node {
  inputs: string[];
  operation: string;
}

type Graph = Map<string, Node>;

const operations = new Map<string, Operation>([
  ["OR", (vals) => vals[0] || vals[1]],
  ["AND", (vals) => vals[0] && vals[1]],
  ["XOR", (vals) => vals[0] !== vals[1]],
  ["TRUE", (_) => true],
  ["FALSE", (_) => false],
]);

const parseInput = (input: string) => {
  const [inputText, wiringText] = input.split("\n\n");

  const wiring = new Map(
    wiringText
      .split("\n")
      .filter((x) => x != "")
      .map((line) => {
        const elems = line.split(" ");
        return [elems[4], { inputs: [elems[0], elems[2]], operation: elems[1] }];
      })
  );

  inputText.split("\n").forEach((line) => {
    const input = line.split(": ");
    if (input[1] === "1") wiring.set(input[0], { inputs: [], operation: "TRUE" });
    if (input[1] === "0") wiring.set(input[0], { inputs: [], operation: "FALSE" });
  });

  return wiring;
};

const evaluate = (nodeName: string, wiring: Graph): boolean => {
  let node = wiring.get(nodeName)!;
  if (node.inputs.length === 0) return operations.get(node.operation)!([]);

  // // copy the wiring so we don't mess everything up
  // wiring = new Map([...wiring].map(([name, node]) => [name, {inputs: node.inputs.slice(), operation: node.operation}]));

  // // get the copied node
  // node = wiring.get(nodeName)!;
  const inputs = node.inputs.map((node) => evaluate(node, wiring));
  const value = operations.get(node.operation)!(inputs);
  node.inputs = [];
  node.operation = value ? "TRUE" : "FALSE";
  return value;
};

const convertToDecimal = (nodes: string[], wiring: Graph): number =>
  [
    ...nodes.map(
      (nodeName) => [nodeName, evaluate(nodeName, wiring)] as [string, boolean]
    ),
  ]
    .sort((lhs, rhs) => lhs[0].localeCompare(rhs[0]))
    .map(([name, val], idx) => (val ? 2 ** idx : undefined))
    .filter((x) => x !== undefined)
    .reduce((lhs, rhs) => lhs + rhs);

const getDecimalValueOfNodesStartingWith = (c: string, wiring: Graph): number =>
  convertToDecimal([...wiring.keys().filter((node) => node[0] === c)], wiring);

const part1 = (input: string): number => {
  const wiring = parseInput(input);
  // const order = topologicalSort(wiring);

  return getDecimalValueOfNodesStartingWith("z", wiring);
};

const part2 = (input: string) => {
  const wiring = parseInput(input);
  const swaps = new Set<string>();

  console.log({
    wiring,
  });

  const getNodeName = (inputs: string[], operation: string): string | undefined => {
    const entry = wiring
      .entries()
      .find(
        ([_, node]) =>
          node.operation === operation &&
          inputs.every((input) => node.inputs.includes(input))
      );
    return entry ? entry[0] : undefined;
  };

  const swap = (lhs: string, rhs: string) => {
    const temp = wiring.get(lhs);
    wiring.set(lhs, wiring.get(rhs)!);
    wiring.set(rhs, temp!);
    swaps.add(lhs);
    swaps.add(rhs);
  };

  let carryIn: string | undefined = undefined;
  let carryOut: string | undefined = undefined;

  for (const number of Array(45).keys()) {
    const label = number.toString().padStart(2, "0");

    // *** half adder ***
    // x__ XOR y__ -> node0
    // x__ AND y__ -> node1
    // carryIn AND node0 -> node2
    // carryIn XOR node0 -> output
    // node1 OR node2 -> carry1
    let node0 = getNodeName(["x" + label, "y" + label], "XOR")!;
    let node1 = getNodeName(["x" + label, "y" + label], "AND")!;
    let output: string;

    if (carryIn !== undefined) {
      let node2 = getNodeName([carryIn, node0], "AND");
      if (node2 === undefined) {
        swap(node0, node1);
        [node0, node1] = [node1, node0];
        node2 = getNodeName([carryIn, node0], "AND")!;
      }

      output = getNodeName([carryIn, node0], "XOR")!;
      if (node0?.startsWith("z")) {
        swap(node0, output!);
        [output, node0] = [node0, output];
      }
      if (node1?.startsWith("z")) {
        swap(node1, output!);
        [output, node1] = [node1, output];
      }
      if (node2?.startsWith("z")) {
        swap(node2, output!);
        [output, node2] = [node2, output];
      }

      carryOut = getNodeName([node1, node2], "OR");
    }

    if (carryOut?.startsWith("z") && carryOut != "z45") {
      swap(carryOut, output!);
      [carryOut, output] = [output, carryOut];
    }

    if (carryIn) carryIn = carryOut;
    else carryIn = node1;
  }

  return [...swaps].sort().join(",");
};

// export { part1, expectedFirstSolution, part2, expectedSecondSolution };
export default function solution(input: string) {
  const p1 = part1(input);
  const p2 = part2(input);
  return { part1: p1, part2: p2 };
}
