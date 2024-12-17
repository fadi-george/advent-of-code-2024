let num1 = 7894237947293;
let num2 = 4353453453;

const numberXor = (a: number, b: number) => a ^ b;
const bigIntXor = (a: bigint, b: bigint) => a ^ b;
const fixedXor = (a: number, b: number) => {
  let r = 0;
  let i = 1;

  while (num1 > 0 || num2 > 0) {
    var a = num1 % 0x100000000;
    var b = num2 % 0x100000000;

    var c = a ^ b;

    r = r + i * c;

    i *= 0x100000000;

    num1 = Math.floor(num1 / 0x100000000);
    num2 = Math.floor(num2 / 0x100000000);
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
