const iterations = 10000;
const numbers = [12, 1234, 123456, 12345678, 1234567890];

numbers.forEach((n) => {
  console.log(`\nTesting with number: ${n}`);

  console.time("string slice");
  for (let i = 0; i < iterations; i++) {
    const str = `${n}`;
    const mid = str.length >> 1;
    let left = +str.slice(0, mid);
    let right = +str.slice(mid);
  }
  console.timeEnd("string slice");

  console.time("string substring");
  for (let i = 0; i < iterations; i++) {
    const str = `${n}`;
    const mid = str.length >> 1;
    let left = +str.substring(0, mid);
    let right = +str.substring(mid);
  }
  console.timeEnd("string substring");

  // fastest
  console.time("log10 division");
  for (let i = 0; i < iterations; i++) {
    const digits = Math.floor(Math.log10(n)) + 1;
    const divisor = Math.pow(10, digits >> 1);
    let left = Math.floor(n / divisor);
    let right = n % divisor;
  }
  console.timeEnd("log10 division");
});
