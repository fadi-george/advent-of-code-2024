const iterations = 10000;
const numbers = [
  [1, 2], // single digits
  [12, 34], // double digits
  [123, 456], // triple digits
  [1234, 5678], // four digits
  [12345, 67890], // five digits
];

numbers.forEach(([a, b]) => {
  console.log(`\nTesting with numbers: ${a}, ${b}`);

  console.time("number-set");
  for (let i = 0; i < iterations; i++) {
    let numSet = new Set([a, b]);
    let result = +Array.from(numSet).join("");
  }
  console.timeEnd("number-set");

  console.time("string-set");
  for (let i = 0; i < iterations; i++) {
    let strSet = new Set([a.toString(), b.toString()]);
    let result = +Array.from(strSet).join("");
  }
  console.timeEnd("string-set");
});
