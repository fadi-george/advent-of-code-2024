const findMiddleItem = (arr: string[]) => {
  return arr[arr.length >> 1];
};

export default (input: string) => {
  const [rules, updates] = input.split("\n\n");
  console.log({ rules, updates });

  const collections: Record<string, Set<string>> = {};
  rules.split("\n").forEach((rule) => {
    const [p1, p2] = rule.split("|");
    if (!collections[p1]) collections[p1] = new Set();
    collections[p1].add(p2);
  });

  const pages: string[][] = [];
  updates.split("\n").forEach((update) => {
    pages.push(update.split(","));
  });

  console.log({ collections, pages });

  const validUpdates: string[][] = [];
  let i = 0;
  for (const pageArr of pages) {
    let pageSet = new Set<string>();
    let isValid = true;

    for (const page of pageArr) {
      const pageCollection = collections[page];
      if (pageCollection && [...pageCollection].some((p) => pageSet.has(p))) {
        isValid = false;
        continue;
      }
      pageSet.add(page);
    }

    if (isValid) {
      validUpdates.push(pageArr);
    }
    i++;
  }

  const middleItems = validUpdates.map(findMiddleItem).map(Number);
  const sum = middleItems.sum();
  console.log({ middleItems, sum });

  // const pageSet = new Set(pages[0]);
  // const validUpdates: string[] = [];

  // for (let i = 1; i < pages.length; i++) {
  //   const page = pages[i];
  //   const pageCollection = collections[page];
  //   if (pageCollection.has(page)) {
  //     continue;
  //   }
  //   // const prevPageIndex = prevPage.indexOf(page);
  //   // const nextPageIndex = prevPageIndex + 1;
  //   // prevPage = prevPage.slice(nextPageIndex) + page;
  // }

  return {
    part1: sum,
    part2: "p2",
  };
};
