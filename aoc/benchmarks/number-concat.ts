const iterations = 10000;
const numbers = [
  [1, 2], // single digits
  [12, 34], // double digits
  [123, 456], // triple digits
  [1234, 5678], // four digits
  [12345, 67890], // five digits
  [12345, 1],
  [12345, 12],
  [12345, 123],
  [12345, 1234],
];

numbers.forEach(([a, b]) => {
  console.log(`\nTesting with numbers: ${a}, ${b}`);

  console.time("template-literal");
  for (let i = 0; i < iterations; i++) {
    let result = +`${a}${b}`;
  }
  console.timeEnd("template-literal");

  // fastest
  console.time("math-method");
  for (let i = 0; i < iterations; i++) {
    let result = a * 10 ** (Math.floor(Math.log10(b)) + 1) + b;
  }
  console.timeEnd("math-method");

  // Often faster than template literals
  console.time("string-concat");
  for (let i = 0; i < iterations; i++) {
    let result = Number(a.toString() + b.toString());
  }
  console.timeEnd("string-concat");

  // Usually fastest for small numbers
  console.time("math-multiply");
  for (let i = 0; i < iterations; i++) {
    let result = parseInt(a + "0".repeat(b.toString().length)) + b;
  }
  console.timeEnd("math-multiply");

  // Another fast approach for small numbers
  console.time("parse-int");
  for (let i = 0; i < iterations; i++) {
    let result = parseInt(a + "" + b);
  }
  console.timeEnd("parse-int");

  // While loop
  console.time("while-loop");
  for (let i = 0; i < iterations; i++) {
    let result = 0;
    let i = 1;
    while (i < b) i *= 10;
    result = a * i + b;
  }
  console.timeEnd("while-loop");
});
