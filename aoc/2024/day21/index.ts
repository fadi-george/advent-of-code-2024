import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { memoize } from "../../lib/general";
import { sum } from "../../lib/array";

export default function solution(input: string) {
  const keys = input.split(/\n/);
  return { part1: solve(keys, 3), part2: solve(keys, 26) };
}

const solve = (keys: string[], robots: number) => {
  let res = 0;
  keys.forEach((key) => {
    const num = parseInt(key.match(/\d+/)?.[0] ?? "0");
    const minLength = checkChunk(key, robots);
    res += num * minLength;
  });
  return res;
};

// Quick Lookup for Numeric Pad
// ["7", "8", "9"],
// ["4", "5", "6"],
// ["1", "2", "3"],
// [" ", "0", "A"],
const NUM_KEY_MAP = {
  "7": [0, 0],
  "8": [0, 1],
  "9": [0, 2],
  "4": [1, 0],
  "5": [1, 1],
  "6": [1, 2],
  "1": [2, 0],
  "2": [2, 1],
  "3": [2, 2],
  " ": [3, 0],
  "0": [3, 1],
  A: [3, 2],
};

// Quick Lookup for Direction Keys for
// [" ", "^", "A"],
// ["<", "v", ">"],
const DIR_KEY_MAP = {
  " ": [0, 0],
  "^": [0, 1],
  A: [0, 2],
  "<": [1, 0],
  v: [1, 1],
  ">": [1, 2],
};

type Info = { r: number; c: number; str: string; i: number };

const getDirs = (sequence: string, isNumeric: boolean) => {
  const q = new MinPriorityQueue((v: Info) => v.str.length);
  const keyMap = isNumeric ? NUM_KEY_MAP : DIR_KEY_MAP;
  const start = keyMap["A"]; // start at 'A' button
  const blank = keyMap[" "]; // blank key position

  q.enqueue({ r: start[0], c: start[1], str: "", i: 0 });
  const res: string[] = [];

  while (!q.isEmpty()) {
    const { r, c, str, i } = q.dequeue()!;

    if (i >= sequence.length) {
      res.push(str);
      continue;
    }

    // skip blank key position
    if (r === blank[0] && c === blank[1]) continue;

    const [r1, c1] = keyMap[sequence[i] as keyof typeof keyMap];
    const rDiff = r1 - r;
    const cDiff = c1 - c;

    // arrived at next key in sequence so can just press 'A
    if (rDiff === 0 && cDiff === 0) {
      q.enqueue({ r, c, str: str + "A", i: i + 1 });
      continue;
    }

    // move up, down, left, right
    if (rDiff < 0) q.enqueue({ r: r - 1, c: c, str: str + "^", i });
    else if (rDiff > 0) q.enqueue({ r: r + 1, c: c, str: str + "v", i });
    if (cDiff < 0) q.enqueue({ r: r, c: c - 1, str: str + "<", i });
    else if (cDiff > 0) q.enqueue({ r: r, c: c + 1, str: str + ">", i });
  }
  return res;
};

const checkChunk = memoize((chunk: string, depth: number): number => {
  if (depth === 0) return chunk.length;
  const ways = getDirs(chunk, /[0-9]/.test(chunk));

  let minLength = Infinity;
  for (const way of ways) {
    // split into chunks that end with 'A', some sub-chunks might might be the same for all different ways
    // other sub-chunks might be lead to shorter strings e.g. '^^A>vA<A' -> ['^^A', '>vA', '<A']
    const chunks = way.match(/[^A]*A/g)!;
    minLength = Math.min(minLength, sum(chunks.map((c) => checkChunk(c, depth - 1))));
  }
  return minLength;
});
