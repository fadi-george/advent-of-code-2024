export default (input: string) => {
  const [grid, visited] = [input.split("\n"), new Set<string>()];
  let [p1, p2] = [0, 0];

  return { part1: "", part2: "" };
};
