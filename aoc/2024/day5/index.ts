const findMiddleItem = (arr: unknown[]) => arr[arr.length >> 1];

const sumMiddleItems = (arr: string[][]) => {
  const middleItems = arr.map(findMiddleItem).map(Number);
  return middleItems.sum();
};

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

  const validUpdates: string[][] = [];
  const modifiedUpdates: string[][] = [];

  for (const updates of updatesTable) {
    let isValid = true;
    const orderedUpdates = updates.toSorted((a, b) => {
      if (collections[a]?.has(b)) {
        isValid = false;
        return -1;
      }
      return 0;
    });
    if (isValid) validUpdates.push(updates);
    else modifiedUpdates.push(orderedUpdates);
  }

  return {
    part1: sumMiddleItems(validUpdates),
    part2: sumMiddleItems(modifiedUpdates),
  };
};
