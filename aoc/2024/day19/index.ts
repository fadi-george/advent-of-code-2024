import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export default function solution(input: string) {
  const [towelPatterns, onsenLine] = input.split(/\n\n/);
  const patterns = new Set(towelPatterns.split(", "));
  const onsenPatterns = onsenLine.split(/\n/);

  const p1 = validatePatterns(patterns, onsenPatterns);
  return { part1: p1, part2: "" };
}

type Info = {
  str: string;
};

const validatePatterns = (patternSet: Set<string>, onsenPatterns: string[]) => {
  let validPatterns = [];
  const patterns = [...patternSet];

  for (const onsenPattern of onsenPatterns) {
    const visited = new Set<string>();

    const pq = new MinPriorityQueue<Info>((v) => v.str.length);
    pq.enqueue({ str: onsenPattern });
    while (!pq.isEmpty()) {
      const { str } = pq.dequeue()!;
      if (str.length === 0) {
        validPatterns.push(onsenPattern);
        break;
      }

      if (visited.has(str)) continue;
      visited.add(str);

      for (const pattern of patterns) {
        if (str.startsWith(pattern)) {
          pq.enqueue({ str: str.replace(pattern, "") });
        }
      }
    }
  }
  return validPatterns.length;
};
