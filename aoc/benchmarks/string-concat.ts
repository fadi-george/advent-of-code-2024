// string concatenation benchmarks
const str = "abcdefghijklmnopqrstuvwxyz".repeat(1000);
const iterations = 10000;
const pos = 5;
const newChar = "O";

console.time("slice");
for (let i = 0; i < iterations; i++) {
  let result = str.slice(0, pos) + newChar + str.slice(pos + 1);
}
console.timeEnd("slice");

console.time("array-reuse");
for (let i = 0; i < iterations; i++) {
  const chars = [...str];
  chars[pos] = newChar;
  let result = chars.join("");
}
console.timeEnd("array-reuse");

console.time("map");
for (let i = 0; i < iterations; i++) {
  let result = [...str].map((c, i) => (i === pos ? newChar : c)).join("");
}
console.timeEnd("map");

// Fastest
console.time("substring");
for (let i = 0; i < iterations; i++) {
  let result = str.substring(0, pos) + newChar + str.substring(pos + 1);
}
console.timeEnd("substring");
