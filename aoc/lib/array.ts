declare global {
  interface Array<T> {
    sum(): number;
    product(): number;
  }
}

Array.prototype.sum = function () {
  return this.reduce((acc, curr) => acc + curr, 0);
};

Array.prototype.product = function () {
  return this.reduce((acc, curr) => acc * curr, 1);
};

export const get1DIndex = (r: number, c: number, width: number) => r * width + c;

export const get2DIndex = (index: number, width: number) => [
  Math.floor(index / width),
  index % width,
];

export const wrap = (value: number, min: number, max: number) =>
  (((value % (max - min)) + max) % max) - min;
