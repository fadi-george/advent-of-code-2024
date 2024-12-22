const iterations = 10000;
const numbers = [
  [12, 1], // small number, small shift
  [12345, 3], // medium number, small shift
  [123456789, 5], // large number, medium shift
  [987654321, 10], // large number, large shift
  [2147483647, 15], // max 32-bit int, large shift
  [9007199254740991, 20], // max safe integer, large shift
];

numbers.forEach(([n, m]) => {
  console.log(`\nTesting with number: ${n}, shift: ${m}`);

  console.time("bigint-method");
  for (let i = 0; i < iterations; i++) {
    let result = Number(BigInt(n) << BigInt(m));
  }
  console.timeEnd("bigint-method");

  console.time("math-pow");
  for (let i = 0; i < iterations; i++) {
    let result = n * Math.pow(2, m);
  }
  console.timeEnd("math-pow");

  // Verify results match
  const bigintResult = Number(BigInt(n) << BigInt(m));
  const mathResult = n * Math.pow(2, m);
  console.log("Results match:", bigintResult === mathResult);
});
