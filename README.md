# Advent of Code 2024

Solutions written in Typescript.

<img width="1912" alt="Screenshot 2024-12-04 at 10 36 14 PM" src="https://github.com/user-attachments/assets/46bd6ca2-7fce-4be1-bfa0-f5affe0d667e">
<img width="1912" alt="Screenshot 2024-12-01 at 12 50 09 AM" src="https://github.com/user-attachments/assets/c4a1abc5-335b-4a98-8419-714c63523201">

## Running

### CLI

Can run individual files located in the `aoc` folder by passing in the `FILE`, `YEAR`, and `DAY` environment variables. E.g.

Create a `txt` file in the `aoc/2024/day<some-number>` folder. If the file is named `input.txt`, then you can run the file with:

```
FILE=input YEAR=2024 DAY=1 bun aoc/index.ts
```

Bun version: 1.1.36 is recommended for debugging.

Can run the `Bun Debug AoC` launch config to run the script with debugging enabled.
This will require setting the `FILE`, `YEAR`, and `DAY` in a `.env` file in the `aoc` folder. E.g.

```
FILE=sample.txt
YEAR=2024
DAY=1
```

### Web App + Server

Create an `.env` file in the server folder. Set the value of `AOC_SESSION_COOKIE` to `'session=<YOUR-VALUE-HERE>'`.
You can grab your session cookie by looking at your headers in the network log on adventofcode.com.

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
