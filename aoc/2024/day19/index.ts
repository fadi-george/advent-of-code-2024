import { sum } from "../../lib/array";
import { memoize } from "../../lib/general";

export default function solution(input: string) {
  const [towelPatterns, onsenLine] = input.split(/\n\n/);
  const [patterns, onsenPatterns] = [towelPatterns.split(", "), onsenLine.split(/\n/)];
  const { validCount, waysCount } = checkDesigns(patterns, onsenPatterns);

  return { part1: validCount, part2: waysCount };
}

const checkDesigns = (patterns: string[], designs: string[]) => {
  patterns.sort((a, b) => b.length - a.length);

  const getWays = memoize((str: string): number => {
    if (!str.length) return 1;
    let count = 0;
    for (const pattern of patterns)
      if (str.startsWith(pattern)) count += getWays(str.substring(pattern.length));
    return count;
  });

  const ways = designs.map(getWays);
  return {
    validCount: ways.reduce((acc, way) => acc + (way > 0 ? 1 : 0), 0),
    waysCount: sum(ways),
  };
};
