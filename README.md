# Advent of Code 2024

Solutions written in Typescript.

<img width="1912" alt="Screenshot 2024-12-01 at 12 49 58 AM" src="https://github.com/user-attachments/assets/a7325c9d-294f-4de1-ac61-93391dfa1591">
<img width="1912" alt="Screenshot 2024-12-01 at 12 50 09 AM" src="https://github.com/user-attachments/assets/c4a1abc5-335b-4a98-8419-714c63523201">

## Running

### CLI

Can run individual files located in the `aoc` folder by passing in the `FILE`, `YEAR`, and `DAY` environment variables. E.g.

```
FILE=sample YEAR=2024 DAY=1 bun aoc/index.ts
```

### Webp App + Server

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
