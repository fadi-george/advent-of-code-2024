const findMiddleItem = (arr: string[]) => {
  return arr[arr.length >> 1];
};

export default (input: string) => {
  const [rules, updates] = input.split("\n\n");

  const collections: Record<string, string[]> = {};
  rules.split("\n").forEach((rule) => {
    const [p1, p2] = rule.split("|");
    if (!collections[p1]) collections[p1] = [];
    collections[p1].push(p2);
  });

  const pages: string[][] = [];
  updates.split("\n").forEach((update) => {
    pages.push(update.split(","));
  });

  const validUpdates: string[][] = [];
  const invalidUpdates: string[][] = [];
  let i = 0;
  for (const pageArr of pages) {
    let pageSet = new Set<string>();
    let isValid = true;

    for (const page of pageArr) {
      const pageCollection = collections[page];
      if (pageCollection?.some((p) => pageSet.has(p))) {
        isValid = false;
        continue;
      }
      pageSet.add(page);
    }

    if (isValid) {
      validUpdates.push(pageArr);
    } else {
      invalidUpdates.push(pageArr);
    }
    i++;
  }

  // part 1
  const middleItems = validUpdates.map(findMiddleItem).map(Number);
  const sum = middleItems.sum();

  // part 2
  console.log({
    collections,
  });
  const modifiedUpdates: string[][] = [];
  invalidUpdates.forEach((updateArr) => {
    const pageSet: string[] = [];
    for (let i = 0; i < updateArr.length; i++) {
      const page = updateArr[i];
      const pageCollection = collections[page];
      const pIndex = pageCollection?.findIndex((p) => pageSet.includes(p));
      if (pIndex !== undefined && pIndex !== -1) {
        const _page = pageCollection[pIndex];
        const j = pageSet.findIndex((p) => _page === p);
        if (j !== -1) {
          pageSet.splice(j, 0, page);
        }
      } else {
        pageSet.push(page);
      }
    }
    modifiedUpdates.push(pageSet);
  });

  console.log(modifiedUpdates);
  return {
    part1: sum,
    part2: "p2",
  };
};
