// import { DIRS } from "../../constants";

// const [START_HEIGHT, END_HEIGHT] = [0, 9];

export default (input: string) => {
  let stones = input.split("\n").map((r) => r.split(" ").map(Number))[0];
  let extra = 0;

  const blink = () => {
    const res = [];
    for (let i = 0; i < stones.length; i++) {
      const stone = stones[i];
      const stoneStr = `${stone}`;

      if (stone === 0) {
        extra += 1;
      } else if (stoneStr.length % 2 === 0) {
        const len = stoneStr.length;
        const left = +stoneStr.slice(0, len / 2);
        const right = +stoneStr.slice(len / 2);
        if (left === 0) {
          extra += 1;
        } else {
          res.push(left);
        }
        if (right === 0) {
          extra += 1;
        } else {
          res.push(right);
        }
      } else {
        res.push(stone * 2024);
      }
    }
    stones = res;
    return res;
  };

  // console.log(blink());

  for (let i = 0; i < 2; i++) {
    blink();
  }

  console.log(stones);
  console.log(stones.length);
  console.log(extra);
  return {
    part1: stones.length + extra,
    part2: "",
  };
};
