# Advent of Code 2024

Solutions written in Typescript.

<img width="1912" alt="Screenshot 2024-12-25 at 6 26 58 PM" src="https://github.com/user-attachments/assets/258e0e28-e95f-4876-b63b-a8f3008ba4c7" />
<img width="1912" alt="Screenshot 2024-12-05 at 11 02 25 AM" src="https://github.com/user-attachments/assets/45ae8a28-b33e-4030-ba9e-facbd2f5eb2c">

## Setup

Install Bun: https://bun.sh/docs/installation

Create an `.env` file in the root folder. Set the value of `AOC_SESSION_COOKIE` to `'session=<YOUR-VALUE-HERE>'`.
You can grab your session cookie by looking at your headers in the network log on adventofcode.com.

Run `bun install` for each folder: `aoc`, `frontend`, and `server`.

## Running

### CLI

Can run individual files located in the `aoc` folder by passing in the `FILE`, `YEAR`, and `DAY` environment variables. E.g.

Create a `txt` file in the `aoc/2024/day<some-number>` folder. If the file is named `input.txt`, then you can run the file with:

```
FILE=input YEAR=2024 DAY=1 bun aoc/index.ts
```

Bun version: 1.1.36 is recommended for debugging.

Can run the `Bun Debug AoC` launch config to run the script with debugging enabled.
This will require setting the `FILE`, `YEAR`, and `DAY` in a `.env` file in the root folder. E.g.

```
FILE=sample.txt
YEAR=2024
DAY=1
```

### Web App + Server

Run the hono backend server:

```
cd server;
npm run dev;
```

Run the frontend dev server:

```
cd frontend;
npm run dev;
```

Can navigate to different days and put in custom inputs.
