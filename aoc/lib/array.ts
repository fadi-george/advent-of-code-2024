declare global {
  interface Array<T> {
    sum(): number;
  }
}

Array.prototype.sum = function () {
  return this.reduce((acc, curr) => acc + curr, 0);
};

export const get1DIndex = (r: number, c: number, width: number) =>
  r * width + c;

export const get2DIndex = (index: number, width: number) => [
  Math.floor(index / width),
  index % width,
];

export {};
