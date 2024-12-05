const findMiddleItem = (arr: any[]) => arr[arr.length >> 1];

export default (input: string) => {
  const [rules, updates] = input.split("\n\n");

  const collections: Record<string, Set<string>> = {};
  rules.split("\n").forEach((rule) => {
    const [p1, p2] = rule.split("|");
    if (!collections[p1]) collections[p1] = new Set();
    collections[p1].add(p2);
  });

  const updatesTable: string[][] = [];
  updates.split("\n").forEach((update) => updatesTable.push(update.split(",")));

  let p1Sum = 0;
  let p2Sum = 0;

  for (const updates of updatesTable) {
    let isValid = true;
    const orderedUpdates = updates.toSorted((a, b) => {
      if (collections[a]?.has(b)) {
        isValid = false;
        return -1;
      }
      return 0;
    });

    if (isValid) p1Sum += +findMiddleItem(orderedUpdates);
    else p2Sum += +findMiddleItem(orderedUpdates);
  }

  return {
    part1: p1Sum,
    part2: p2Sum,
  };
};
