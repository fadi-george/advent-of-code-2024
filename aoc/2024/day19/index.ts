import { sum } from "../../lib/array";

export default function solution(input: string) {
  const [towelPatterns, onsenLine] = input.split(/\n\n/);
  const [patterns, onsenPatterns] = [towelPatterns.split(", "), onsenLine.split(/\n/)];
  const { validCount, waysCount } = checkDesigns(patterns, onsenPatterns);

  return { part1: validCount, part2: waysCount };
}

const checkDesigns = (patterns: string[], designs: string[]) => {
  const cache = new Map<string, number>();
  patterns.sort((a, b) => b.length - a.length);

  const getWays = (str: string): number => {
    if (!str.length) return 1;
    if (cache.has(str)) return cache.get(str)!;

    let count = 0;
    for (const pattern of patterns)
      if (str.startsWith(pattern)) count += getWays(str.substring(pattern.length));

    cache.set(str, count);
    return count;
  };

  const ways = designs.map(getWays);
  return {
    validCount: ways.reduce((acc, way) => acc + (way > 0 ? 1 : 0), 0),
    waysCount: sum(ways),
  };
};
