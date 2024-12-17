let num1 = 7894237947293;
let num2 = 4353453453;

const numberXor = (a: number, b: number) => a ^ b;
const bigIntXor = (a: bigint, b: bigint) => a ^ b;
const fixedXor = (n1: number, n2: number) => {
  let r = 0;
  let i = 1;

  while (n1 > 0 || n2 > 0) {
    var a = n1 % 0x100000000;
    var b = n2 % 0x100000000;

    var c = a ^ b;

    r = r + i * c;

    i *= 0x100000000;

    n1 = Math.floor(n1 / 0x100000000);
    n2 = Math.floor(n2 / 0x100000000);
  }

  return r;
};

console.time("Number XOR");
console.log(numberXor(num1, num2));
console.timeEnd("Number XOR");

console.time("BigInt XOR");
console.log(bigIntXor(BigInt(num1), BigInt(num2)));
console.timeEnd("BigInt XOR");

console.time("Fixed XOR");
console.log(fixedXor(num1, num2));
console.timeEnd("Fixed XOR");
