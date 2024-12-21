import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export default function solution(input: string) {
  const keys = input.split(/\n/);
  const p1 = solve(keys);
  return { part1: p1, part2: "" };
}

const solve = (keys: string[]) => {
  let res = 0;
  keys.forEach((key) => {
    const num = parseInt(key.match(/\d+/)?.[0] ?? "0");
    const lvl1 = getNumDirs(key);
    const lvl2 = getSmallestStr(lvl1.flatMap(getKeyDirs(true)));
    const lvl3 = getSmallestStr(lvl2.flatMap(getKeyDirs(false)));

    res += num * lvl3[0].length;
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

const getKeyDirs = (returnAll: boolean) => (sequence: string) => {
  const q = new MinPriorityQueue(
    (v: { r: number; c: number; str: string; i: number }) => v.str.length
  );
  q.enqueue({ r: 0, c: 2, str: "", i: 0 }); // start at 'A' button
  const res: string[] = [];

  while (!q.isEmpty()) {
    const { r, c, str, i } = q.dequeue()!;

    if (i >= sequence.length) {
      if (!returnAll) return str;
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

  return getSmallestStr(res);
};

const getSmallestStr = (strs: string[]) => {
  let minLength = Infinity;
  for (const str of strs) {
    if (str.length < minLength) {
      minLength = str.length;
    }
  }
  return strs.filter((s) => s.length === minLength);
};

// console.time("lvl1");
// const lvl1 = getNumDirs("029A");
// console.timeEnd("lvl1");
// console.log({ lvl1, lvl1Length: lvl1.length });

// console.time("lvl2");
// const lvl2 = getKeyDirs("<A^A>^^AvvvA");
// console.timeEnd("lvl2");
// console.log({ lvl2, lvl2Length: lvl2.length });

// console.time("lvl3");
// const lvl3 = getKeyDirs("v<<A>>^A<A>AvA<^AA>A<vAAA>^A", false);
// console.timeEnd("lvl3");
// console.log({ lvl3, lvl3Length: lvl3.length });
// const m1 = getNumDirs("379A");
// const m2 = getSmallestStr(m1.flatMap((s) => getKeyDirs(s, true)));
// const m3 = getSmallestStr(m2.flatMap((s) => getKeyDirs(s, false)));
// console.log({ m2, m3 });

// // const m1min = Math.min(...m1.map((s) => s.length));
// // const m1max = Math.max(...m1.map((s) => s.length));
// // console.log({ m1min, m1max });

// // const m2min = Math.min(...m2.map((s) => s.length));
// // const m2max = Math.max(...m2.map((s) => s.length));
// // console.log({ m2min, m2max });

// const m3min = Math.min(...m3.map((s) => s.length));
// const m3max = Math.max(...m3.map((s) => s.length));
// console.log({ m3min, m3max });

// const m1 = getNumDirs("379A");
// const m2 = getSmallestStr(m1.flatMap(getKeyDirs(true)));
// const m3 = getSmallestStr(m2.slice(0, 30).flatMap(getKeyDirs(false)));
// console.table(m1);
// console.log(m1[0].length);
// console.table(m2);
// console.log(m2[0].length);
// console.table(m3);
// console.log(m3[0].length);
