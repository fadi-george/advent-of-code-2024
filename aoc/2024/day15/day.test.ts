import { describe, expect, test } from "bun:test";
import { readFile } from "../../lib/general";
import solution, { findRobot, moveRobot } from "./index";

const dirname = import.meta.dirname;

describe("day 15", () => {
  test("move big box 1", () => {
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

  test("move down - 1", () => {
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

  test("move down - 2", () => {
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

  test("puzzle input", () => {
    const input = readFile(`${dirname}/input.txt`);
    const result = solution(input);
    expect(result.part1).toBe(1577255);
    expect(result.part2).toBe(1597035);
  });
});
