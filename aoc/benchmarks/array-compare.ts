const iterations = 10000;
const arrays = [
  [
    [1, 2],
    [1, 2],
  ], // identical small arrays
  [
    [1, 2],
    [1, 3],
  ], // different small arrays
  [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ], // identical medium arrays
  [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 6],
  ], // different medium arrays
  [Array(100).fill(1), Array(100).fill(1)], // identical large arrays
  [Array(100).fill(1), [...Array(99).fill(1), 2]], // different large arrays
];

arrays.forEach(([arr1, arr2]) => {
  console.log(
    `\nTesting with arrays: [${arr1.slice(0, 5)}...], [${arr2.slice(0, 5)}...]`
  );

  console.time("toString");
  for (let i = 0; i < iterations; i++) {
    let result = arr1.toString() === arr2.toString();
  }
  console.timeEnd("toString");

  console.time("template-literal");
  for (let i = 0; i < iterations; i++) {
    let result = `${arr1}` === `${arr2}`;
  }
  console.timeEnd("template-literal");

  console.time("join-comma");
  for (let i = 0; i < iterations; i++) {
    let result = arr1.join(",") === arr2.join(",");
  }
  console.timeEnd("join-comma");

  // Often the fastest
  // Reference implementation from your codebase
  console.time("every-compare");
  for (let i = 0; i < iterations; i++) {
    let result =
      arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
  }
  console.timeEnd("every-compare");

  // Using JSON.stringify
  console.time("json-stringify");
  for (let i = 0; i < iterations; i++) {
    let result = JSON.stringify(arr1) === JSON.stringify(arr2);
  }
  console.timeEnd("json-stringify");
});
