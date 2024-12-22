import { isEqualArr, sum } from "../../lib/array";
import { memoize, modn, shiftLeft, shiftRight, xor } from "../../lib/general";

export default function solution(input: string) {
  const secrets = input.split("\n").map(Number);
  const p1 = solve(secrets);
  const p2 = solve2(secrets);

  return { part1: p1, part2: p2 };
}

const mix = (secret: number, num: number) => xor(secret, num);
const prune = (secret: number) => modn(secret, 16777216);

const ops = [
  (secret: number) => shiftLeft(secret, 6),
  (secret: number) => shiftRight(secret, 5),
  (secret: number) => shiftLeft(secret, 11),
];

const runSequence = memoize((num: number) => {
  let secret = num;
  for (let j = 0; j < ops.length; j++) {
    const op = ops[j];
    const value = op(secret);
    secret = mix(secret, value);
    secret = prune(secret);
  }
  return secret;
});

const getNSthSecret = memoize((secret: number) => {
  for (let i = 0; i < 2000; i++) {
    secret = runSequence(secret);
  }
  return secret;
});

const solve = (secrets: number[]) => {
  const result = [];
  for (const secret of secrets) {
    result.push(getNSthSecret(secret));
  }
  return sum(result);
};

const solve2 = (secrets: number[]) => {
  // const SEQUENCES = [];
  // for (let n1 = -9; n1 <= 9; n1++) {
  //   for (let n2 = -9; n2 <= 9; n2++) {
  //     for (let n3 = -9; n3 <= 9; n3++) {
  //       for (let n4 = -9; n4 <= 9; n4++) {
  //         SEQUENCES.push([n1, n2, n3, n4]);
  //       }
  //     }
  //   }
  // }

  let maxBananas = -1;
  const diffMap = new Map<string, number[]>();

  for (let i = 0; i < secrets.length; i++) {
    let secret = secrets[i];
    const digits = [modn(secret, 10)];

    for (let j = 0; j < 2000; j++) {
      secret = runSequence(secret);
      digits.push(modn(secret, 10));
    }

    const changes = [];
    for (let j = 1; j < digits.length; j++) {
      changes.push(digits[j] - digits[j - 1]);
    }

    let innerMap = new Map<string, number>();
    for (let j = 0; j < changes.length; j++) {
      const seq = changes.slice(j, j + 4);
      if (seq.length !== 4) continue;
      if (innerMap.has(seq.toString())) continue;

      // keep track of the max for each sequence
      innerMap.set(seq.toString(), digits[j + 4]);
    }

    for (const [key, val] of innerMap.entries()) {
      const diffVal = diffMap.get(key) ?? [];
      diffMap.set(key, [...diffVal, val]);
    }
  }

  for (const [key, val] of diffMap.entries()) {
    const bananas = sum(val);
    maxBananas = Math.max(maxBananas, bananas);
  }

  return maxBananas;
};

// 1102 too low
// 1115 too low
solve2([1]);
