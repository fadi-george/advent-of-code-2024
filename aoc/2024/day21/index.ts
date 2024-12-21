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
//   ["7", "8", "9"],
//   ["4", "5", "6"],
//   ["1", "2", "3"],
//   ["0", "0", "A"],
const NumKeyMap = {
  "0": [3, 1],
  "1": [2, 0],
  "2": [2, 1],
  "3": [2, 2],
  "4": [1, 0],
  "5": [1, 1],
  "6": [1, 2],
  "7": [0, 0],
  "8": [0, 1],
  "9": [0, 2],
  A: [3, 2],
};

// Quick Lookup for Direction Keys for
//   ["", "^", "A"],
//   ["<", "v", ">"],
const DirKeyMap = {
  "^": [0, 1],
  A: [0, 2],
  "<": [1, 0],
  v: [1, 1],
  ">": [1, 2],
};

const getNumDirs = (sequence: string) => {
  const q = new MinPriorityQueue(
    (v: { r: number; c: number; str: string; i: number }) => v.str.length
  );
  q.enqueue({ r: 3, c: 2, str: "", i: 0 }); // start at 'A' button
  const res: string[] = [];

  while (!q.isEmpty()) {
    const { r, c, str, i } = q.dequeue()!;

    if (i >= sequence.length) {
      res.push(str);
      continue;
    }

    // the blank key
    if (r === 3 && c === 0) {
      continue;
    }

    const [r1, c1] = NumKeyMap[sequence[i] as keyof typeof NumKeyMap];
    const rDiff = r1 - r;
    const cDiff = c1 - c;

    if (rDiff === 0 && cDiff === 0) {
      q.enqueue({ r: r1, c: c1, str: str + "A", i: i + 1 });
      continue;
    }

    if (rDiff < 0) q.enqueue({ r: r - 1, c: c, str: str + "^", i });
    else if (rDiff > 0) q.enqueue({ r: r + 1, c: c, str: str + "v", i });
    if (cDiff < 0) q.enqueue({ r: r, c: c - 1, str: str + "<", i });
    else if (cDiff > 0) q.enqueue({ r: r, c: c + 1, str: str + ">", i });
  }
  return res;
};

const getKeyDirs = (sequence: string) => {
  const q = new MinPriorityQueue(
    (v: { r: number; c: number; str: string; i: number }) => v.str.length
  );
  q.enqueue({ r: 0, c: 2, str: "", i: 0 }); // start at 'A' button
  const res: string[] = [];

  while (!q.isEmpty()) {
    const { r, c, str, i } = q.dequeue()!;

    if (i >= sequence.length) {
      res.push(str);
      continue;
    }

    // the blank key
    if (r === 0 && c === 0) {
      continue;
    }

    const [r1, c1] = DirKeyMap[sequence[i] as keyof typeof DirKeyMap];
    const rDiff = r1 - r;
    const cDiff = c1 - c;

    if (rDiff === 0 && cDiff === 0) {
      q.enqueue({ r, c, str: str + "A", i: i + 1 });
      continue;
    }

    if (rDiff < 0) q.enqueue({ r: r - 1, c: c, str: str + "^", i });
    else if (rDiff > 0) q.enqueue({ r: r + 1, c: c, str: str + "v", i });
    if (cDiff < 0) q.enqueue({ r: r, c: c - 1, str: str + "<", i });
    else if (cDiff > 0) q.enqueue({ r: r, c: c + 1, str: str + ">", i });
  }

  return res;
};

const checkChunk = memoize((chunk: string, depth: number): number => {
  if (depth === 0) return chunk.length;
  const ways = /^\d/.test(chunk) ? getNumDirs(chunk) : getKeyDirs(chunk);

  let minLength = Infinity;
  for (const way of ways) {
    const chunks = way.match(/[^A]*A/g)! as string[];
    const tmpMin = sum(chunks.map((c) => checkChunk(c, depth - 1)));
    if (tmpMin < minLength) {
      minLength = tmpMin;
    }
  }
  return minLength;
});

// const m1 = getNumDirs("379A");
// for (const s of m1) {
//   console.log(s);
//   const m2 = getKeyDirs(s);
//   console.table(m2);
//   console.log(m2[0].length);
// }

// console.log("hmm", checkChunk("^A^<^<A>>AvvvA", 1));
// console.log("hmm", checkChunk("^A<<^^A>>AvvvA", 1));
// console.log("hmm", checkChunk("379A", 3));
