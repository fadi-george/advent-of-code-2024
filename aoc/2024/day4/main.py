import fileinput

dirs = [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)]
grid = [list(line.strip()) for line in fileinput.input()]
w, h = len(grid[0]), len(grid)
wr, hr = range(w), range(h)


get = lambda i, j: "" if not (0 <= i < h and 0 <= j < w) else grid[i][j]

check_dir = (
    lambda i, j, dx, dy: "".join(get(i + dy * d, j + dx * d) for d in range(4))
    == "XMAS"
)

check_pat = lambda i, j: all(
    "".join(get(i + dy, j + dx) for dx, dy in pair) in {"MAS", "SAM"}
    for pair in [[(-1, -1), (0, 0), (1, 1)], [(-1, 1), (0, 0), (1, -1)]]
)

print(sum(check_dir(i, j, dx, dy) for i in hr for j in wr for dx, dy in dirs))
print(sum(check_pat(i, j) for i in hr for j in wr))
