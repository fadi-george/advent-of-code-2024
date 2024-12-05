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
    let pageSet = new Set<string>();
    let orderedPages: string[] = [];
    let isValid = true;

    for (const page of updates) {
      const pageCollection = collections[page];

      if (pageCollection) {
        if (isValid && pageSet.intersection(pageCollection).size > 0)
          isValid = false;

        const pIndex = orderedPages.findIndex((p) => pageCollection.has(p));
        if (pIndex !== -1) orderedPages.splice(pIndex, 0, page);
        else orderedPages.push(page);
      }
      pageSet.add(page);
    }

    if (isValid) validUpdates.push(updates);
    else modifiedUpdates.push(orderedPages);
  }

  return {
    part1: sumMiddleItems(validUpdates),
    part2: sumMiddleItems(modifiedUpdates),
  };
};
