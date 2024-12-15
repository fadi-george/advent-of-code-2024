declare global {
  interface Array<T> {
    sum(): number;
    product(): number;
  }
}

export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

export const product = (arr: number[]) => arr.reduce((acc, curr) => acc * curr, 1);

export const get1DIndex = (r: number, c: number, width: number) => r * width + c;

export const get2DIndex = (index: number, width: number) => [
  Math.floor(index / width),
  index % width,
];

export const wrap = (value: number, min: number, max: number) =>
  (((value % (max - min)) + max) % max) - min;
