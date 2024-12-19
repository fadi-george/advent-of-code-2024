export default function solution(input: string) {
  const [towelPatterns, onsenLine] = input.split(/\n\n/);
  const patterns = new Set(towelPatterns.split(", "));
  const onsenPatterns = onsenLine.split(/\n/);
  // console.log({ onsenPatterns, patterns });

  const p1 = validatePatterns(patterns, onsenPatterns);
  return { part1: p1, part2: "" };
}

const validatePatterns = (patternSet: Set<string>, onsenPatterns: string[]) => {
  // console.log({ onsenPatterns, patternSet });
  const patterns = [...patternSet].sort((a, b) => b.length - a.length);
  const patternsRev = [...patterns].reverse();
  // console.log({ patterns });
  let validPatterns = [];

  for (const onsenPattern of onsenPatterns) {
    let str = onsenPattern;
    for (const pattern of patterns) {
      if (onsenPattern.includes(pattern)) {
        str = str.replaceAll(pattern, "");
      }
    }
    if (str.length === 0) {
      validPatterns.push(onsenPattern);
      continue;
    }

    str = onsenPattern;
    for (const pattern of patternsRev) {
      if (onsenPattern.includes(pattern)) {
        str = str.replaceAll(pattern, "");
      }
    }
    if (str.length === 0) {
      validPatterns.push(onsenPattern);
    }
    // console.log({ str });
  }
  // console.log({ validPatterns });

  return validPatterns.length;
};

// 301 wrong
// 342 ???
