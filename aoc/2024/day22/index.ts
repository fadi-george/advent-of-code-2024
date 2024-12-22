import { sum } from "../../lib/array";
import { modn, shiftRight, xor } from "../../lib/general";

export default function solution(input: string) {
  const secrets = input.split("\n").map(Number);
  const p1 = solve(secrets, 2000);

  return { part1: p1, part2: "" };
}

// const mix = (secret: number, num: number) => (secret = secret ^ num);
// const prune = (secret: number) => (secret = secret % 16777216);

const mix = (secret: number, num: number) => xor(secret, num);
const prune = (secret: number) => modn(secret, 16777216);

const ops = [
  (secret: number) => secret * 64,
  (secret: number) => Math.floor(shiftRight(secret, 5)),
  (secret: number) => secret * 2048,
];

const getNSthSecret = (secret: number, limit: number) => {
  for (let i = 0; i < limit; i++) {
    for (let j = 0; j < ops.length; j++) {
      const op = ops[j];
      const value = op(secret);
      secret = mix(secret, value);
      secret = prune(secret);
    }
  }
  return secret;
};

const solve = (secrets: number[], limit: number) => {
  const result = [];
  for (const secret of secrets) {
    result.push(getNSthSecret(secret, limit));
  }
  return sum(result);
};
