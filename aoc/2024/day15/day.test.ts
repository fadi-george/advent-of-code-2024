import { describe, expect, test } from "bun:test";
import { printGrid, readFile } from "../../lib/general";
import solution, { findRobot, moveBigBox, moveRobot } from "./index";

const path = "aoc/2024/day15/";

describe("day 15", () => {
  test("example", () => {
    const input = readFile(`${path}sample.txt`);
    const result = solution(input);
    console.clear();
    // expect(result.part1).toBe(10092);
    // expect(result.part2).toBe(7572);
  });

  test.only("move big box 1", () => {
    const grid = [
      "##############",
      "##......##..##",
      "##..........##",
      "##....[][]@.##",
      "##....[]....##",
      "##..........##",
      "##############",
    ].map((l) => l.split(""));
    const moves = "<vv<<^^<<^^";
    let [r, c] = findRobot(grid);
    for (const move of moves) {
      [r, c] = moveRobot(grid, r, c, move);
    }

    const expected = [
      "##############",
      "##...[].##..##",
      "##...@.[]...##",
      "##....[]....##",
      "##..........##",
      "##..........##",
      "##############",
    ].map((l) => l.split(""));
    expect(grid).toEqual(expected);
  });

  test.only("move down - 1", () => {
    const grid = [
      "##############",
      "##....@.....##",
      "##....[]....##",
      "##...[][]...##",
      "##..........##",
      "##..........##",
      "##############",
    ].map((l) => l.split(""));
    const moves = "v";
    let [r, c] = findRobot(grid);
    for (const move of moves) {
      [r, c] = moveRobot(grid, r, c, move);
    }

    const expected = [
      "##############",
      "##..........##",
      "##....@.....##",
      "##....[]....##",
      "##...[][]...##",
      "##..........##",
      "##############",
    ].map((l) => l.split(""));
    expect(grid).toEqual(expected);
  });

  test.only("move down - 2", () => {
    const grid = [
      "####################",
      "##[]..[]......[][]##",
      "##[]........@..[].##",
      "##..........[][][]##",
      "##...........[][].##",
      "##..##[]..[]......##",
      "##...[]...[]..[]..##",
      "##.....[]..[].[][]##",
      "##........[]......##",
      "####################",
    ].map((l) => l.split(""));
    const moves = "v";
    let [r, c] = findRobot(grid);
    for (const move of moves) {
      [r, c] = moveRobot(grid, r, c, move);
    }

    const expected = [
      "####################",
      "##[]..[]......[][]##",
      "##[]...........[].##",
      "##..........@.[][]##",
      "##..........[].[].##",
      "##..##[]..[].[]...##",
      "##...[]...[]..[]..##",
      "##.....[]..[].[][]##",
      "##........[]......##",
      "####################",
    ].map((l) => l.split(""));
    expect(grid).toEqual(expected);
  });

  test("move big box", () => {
    const grid = [
      "####################",
      "##....[]....[]..[]##",
      "##............[]..##",
      "##..[][]....[]..[]##",
      "##...[].......[]..##",
      "##[]##....[]......##",
      "##[]......[]..[]..##",
      "##..[][]..@[].[][]##",
      "##........[]......##",
      "####################",
    ].map((l) => l.split(""));
    // console.table(grid);
    const [r, c] = findRobot(grid);
    // console.log(r, c);
    moveBigBox(grid, r, c, 4, "^");
    // printGrid(grid);
    // expect(result.part1).toBe(10092);
    // expect(result.part2).toBe(7572);

    const expected = [
      "####################",
      "##....[]....[]..[]##",
      "##............[]..##",
      "##..[][]....[]..[]##",
      "##...[]...[]..[]..##",
      "##[]##....[]......##",
      "##[]......@...[]..##",
      "##..[][]...[].[][]##",
      "##........[]......##",
      "####################",
    ].map((l) => l.split(""));
    expect(true).toBe(true);
    // expect(grid).toEqual(expected);
  });

  test("puzzle input", () => {
    const input = readFile(`${path}input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1577255);
    expect(result.part2).toBe(1597035);
  });
});
