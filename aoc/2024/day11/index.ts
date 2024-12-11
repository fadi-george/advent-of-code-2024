// import { DIRS } from "../../constants";

// const [START_HEIGHT, END_HEIGHT] = [0, 9];

export default (input: string) => {
  let stones = input.split("\n").map((r) => r.split(" ").map(Number))[0];
  console.log(stones);

  const blink = () => {
    const res = [];
    for (let i = 0; i < stones.length; i++) {
      const stone = stones[i];
      const stoneStr = `${stone}`;
      let oldValue = stone;

      if (stone === 0) {
        res.push(1);
        oldValue = 1;
      } else if (stoneStr.length % 2 === 0) {
        const len = stoneStr.length;
        const left = +stoneStr.slice(0, len / 2);
        const right = +stoneStr.slice(len / 2);
        oldValue = right;
        res.push(left, right);
      } else {
        res.push(stone * 2024);
      }
    }
    stones = res;
    return res;
  };

  // console.log(blink());

  for (let i = 0; i < 75; i++) {
    blink();
  }
  console.log(stones.length);

  return {
    part1: "",
    part2: "",
  };
};
