import fs from "fs";
import "./array"; // array prototype methods
import path from "path";

export const readFile = (file: string) => {
  if (!file) throw new Error("FILE is not set");
  return fs.readFileSync(path.resolve(file), "utf8");
};
