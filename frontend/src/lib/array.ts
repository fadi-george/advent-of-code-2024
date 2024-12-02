declare global {
  interface Array<T> {
    sum(): number;
  }
}

Array.prototype.sum = function () {
  return this.reduce((acc, curr) => acc + curr, 0);
};

export {};
