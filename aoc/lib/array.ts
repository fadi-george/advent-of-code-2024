export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

export const product = (arr: number[]) => arr.reduce((acc, curr) => acc * curr, 1);

export const get1DIndex = (r: number, c: number, width: number) => r * width + c;

export const get2DIndex = (index: number, width: number) => [
  Math.floor(index / width),
  index % width,
];

export const wrap = (value: number, min: number, max: number) =>
  (((value % (max - min)) + max) % max) - min;

export const findInGrid = <T = string>(grid: T[][], value: T): [number, number] => {
  const r = grid.findIndex((line) => line.includes(value));
  return [r, grid[r].indexOf(value)];
};

export const isEqualArr = (a: any[], b: any[]) =>
  a.length === b.length && a.every((val, index) => val === b[index]);

export const manhattanDistance = (a: [number, number], b: [number, number]) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

export const getPermutations = (input: string | string[]): string[] => {
  const arr = typeof input === "string" ? input.split("") : input;

  // Base case
  if (arr.length <= 1) return arr;

  const result = new Set<string>();

  // For each element in the array
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    // Skip duplicate starting characters
    if (i > 0 && arr[i] === arr[i - 1]) continue;

    // Get remaining elements
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];

    // Recursively get permutations of remaining elements
    const perms = getPermutations(remaining);

    // Add current element to beginning of each permutation
    for (const perm of perms) {
      result.add(current + perm);
    }
  }

  return Array.from(result);
};
