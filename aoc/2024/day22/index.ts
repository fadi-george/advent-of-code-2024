import { sum } from "../../lib/array";
import { modn, shiftLeft, shiftRight, xor } from "../../lib/general";

export default function solution(input: string) {
  const secrets = input.split("\n").map(Number);
  return { part1: sumSecrets(secrets), part2: getMostBananas(secrets) };
}

// using bigints for large numbers due to JS casting to 32-bit integers for bitwise operations
const mix = (secret: number, num: number) => xor(secret, num);
const prune = (secret: number) => modn(secret, 16777216);

const runSequence = (secret: number): number => {
  secret = prune(mix(secret, shiftLeft(secret, 6)));
  secret = prune(mix(secret, shiftRight(secret, 5)));
  secret = prune(mix(secret, shiftLeft(secret, 11)));
  return secret;
};

const getNSthSecret = (secret: number) => {
  for (let i = 0; i < 2000; i++) secret = runSequence(secret);
  return secret;
};
const sumSecrets = (secrets: number[]) => sum(secrets.map(getNSthSecret));

const getMostBananas = (secrets: number[]) => {
  let maxBananas = -1;

  // keep track of the same 4 change sequence that may occur for each secret
  // value will just be the sum as we go along
  const diffMap = new Map<number, number>();

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

    // keep track of each 4 change sequence for current secret
    const set = new Set<number>();
    for (let j = 0; j < changes.length; j++) {
      const seq = changes.slice(j, j + 4);
      if (seq.length !== 4) continue;

      // only need first value of each unique 4 change sequence
      const key = getHash(seq);
      if (set.has(key)) continue;
      set.add(key);

      const val = diffMap.get(key) ?? 0;
      diffMap.set(key, val + digits[j + 4]);
    }
  }

  for (const val of diffMap.values()) maxBananas = Math.max(maxBananas, val);

  return maxBananas;
};

// using base 18 to avoid collisions, faster than string key
const getHash = (changes: number[]) =>
  changes[0] * 18 ** 3 + changes[1] * 18 ** 2 + changes[2] * 18 + changes[3];
