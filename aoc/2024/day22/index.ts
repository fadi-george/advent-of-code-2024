import { sum } from "../../lib/array";
import { modn, shiftLeft, xor } from "../../lib/general";

export default function solution(input: string) {
  const secrets = input.split("\n").map(Number);
  return { part1: sumSecrets(secrets), part2: getMostBananas(secrets) };
}

// using custom bitwise helpers since JS casting to signed 32-bit integers is not safe for large numbers
const mix = (secret: number, num: number) => xor(secret, num);
const prune = (secret: number) => modn(secret, 16777216);

// don't meed second prune since first prune & shift right keeps it under 23 bits
const runSequence = (secret: number): number => {
  secret = prune(mix(secret, secret << 6));
  secret = mix(secret, secret >> 5);
  secret = prune(mix(secret, shiftLeft(secret, 11)));
  return secret;
};

const getNSthSecret = (secret: number) => {
  for (let i = 0; i < 2000; i++) secret = runSequence(secret);
  return secret;
};

const sumSecrets = (secrets: number[]) => sum(secrets.map(getNSthSecret));

const getMostBananas = (secrets: number[]) => {
  // keep track of the same 4 change sequence that may occur for each secret
  // value will just be the sum as we go along
  const diffMap = new Map<number, number>();

  for (let i = 0; i < secrets.length; i++) {
    let secret = secrets[i];
    const digits = [secret % 10];

    for (let j = 0; j < 2000; j++) {
      secret = runSequence(secret);
      digits.push(secret % 10);
    }

    const changes = [];
    for (let j = 1; j < digits.length; j++) changes.push(digits[j] - digits[j - 1]);

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

  // max bananas
  return Math.max(...diffMap.values());
};

// using base 32 to avoid collisions, faster than string key e.g `1,2,3,4` vs 339341
const getHash = (changes: number[]) =>
  ((changes[0] + 9) << 15) |
  ((changes[1] + 9) << 10) |
  ((changes[2] + 9) << 5) |
  (changes[3] + 9);
