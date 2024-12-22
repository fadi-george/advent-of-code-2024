import { isEqualArr, sum } from "../../lib/array";
import { memoize, modn, shiftRight, xor } from "../../lib/general";

export default function solution(input: string) {
  const secrets = input.split("\n").map(Number);
  const p1 = solve(secrets);
  const p2 = solve2(secrets);

  return { part1: p1, part2: p2 };
}

const mix = (secret: number, num: number) => xor(secret, num);
const prune = (secret: number) => modn(secret, 16777216);

const ops = [
  (secret: number) => secret * 64,
  (secret: number) => Math.floor(shiftRight(secret, 5)),
  (secret: number) => secret * 2048,
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

const getNSthSecret = (secret: number) => {
  for (let i = 0; i < 2000; i++) {
    secret = runSequence(secret);
  }
  return secret;
};

const solve = (secrets: number[]) => {
  const result = [];
  for (const secret of secrets) {
    result.push(getNSthSecret(secret));
  }
  return sum(result);
};

const CHANGE_SEQUENCE = [-2, 1, -1, 3];
const solve2 = (secrets: number[]) => {
  const bananas = [];
  for (let i = 0; i < secrets.length; i++) {
    let secret = secrets[i];
    const results = [secret % 10];

    for (let j = 0; j < 2000; j++) {
      secret = runSequence(secret);
      results.push(secret % 10);
    }
    const changes = results
      .map((val, j) => (j === 0 ? 0 : val - results[j - 1]))
      .slice(1);

    const seqI = changes.findIndex((_, ci) => {
      const seq = changes.slice(ci, ci + CHANGE_SEQUENCE.length);
      if (seq.length !== CHANGE_SEQUENCE.length) return false;
      return seq.every((v, i) => v === CHANGE_SEQUENCE[i]);
    });

    if (seqI !== -1) {
      bananas.push(results[seqI + 4]);
    }
  }
  return sum(bananas);
};

// 1102 too low
