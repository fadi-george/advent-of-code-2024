import "./array"; // array prototype methods
import fs from "fs";
import path from "path";
const file = import.meta.env.FILE;

export const readFile = (dir = "./", regex: string | RegExp = "\n") => {
  if (!file) throw new Error("FILE is not set");
  const data = fs.readFileSync(path.resolve(dir, file), "utf8");
  return data.split(regex);
};
