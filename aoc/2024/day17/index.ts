import { getGrid } from "../../lib/general";

export default (input: string) => {
  const grid = getGrid(input);
  return {
    part1: "1",
    part2: "2",
  };
};
