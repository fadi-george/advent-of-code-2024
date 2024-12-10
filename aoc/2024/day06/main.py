import fileinput

grid = [line.strip() for line in fileinput.input()]
sp = list(next((i, row.index("^")) for i, row in enumerate(grid) if "^" in row))

w = len(grid[0])
dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]
visited = set()


get_1d_index = lambda r, c, w: r * w + c
get_2d_index = lambda i, w: [i // w, i % w]
get_next = lambda r, c, d: [r + dirs[d][0], c + dirs[d][1]]


def traverse(check_loop=False):
    r, c, d = sp + [0]
    visited2 = set()
    while True:
        next = get_next(r, c, d)
        if not (0 <= next[0] < len(grid) and 0 <= next[1] < len(grid[0])):
            break
        if grid[next[0]][next[1]] == "#":
            d = (d + 1) & 3
            continue
        if not check_loop:
            visited.add(get_1d_index(next[0], next[1], w))
        else:
            key = (get_1d_index(next[0], next[1], w) << 2) | d
            if key in visited2:
                return True
            visited2.add(key)
        [r, c] = next
    return False


traverse()
print(len(visited))

p2 = 0
for i in visited:
    r, c = get_2d_index(i, w)
    if [r, c] != sp:
        row = grid[r]
        grid[r] = grid[r][:c] + "#" + grid[r][c + 1 :]
        if traverse(True):
            p2 += 1
        grid[r] = row
print(p2)
