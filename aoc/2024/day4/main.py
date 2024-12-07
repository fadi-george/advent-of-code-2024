import fileinput

grid = [list(line.strip()) for line in fileinput.input()]
w, h = len(grid[0]), len(grid)
dirs = [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)]

get = lambda i, j: None if i < 0 or j < 0 or i >= h or j >= w else grid[i][j]
check_dir = (
    lambda i, j, dx, dy: get(i + dy, j + dx) == "M"
    and get(i + 2 * dy, j + 2 * dx) == "A"
    and get(i + 3 * dy, j + 3 * dx) == "S"
)

check_pattern = lambda i, j: (
    (
        (get(i - 1, j - 1) == "M" and get(i + 1, j + 1) == "S")
        or (get(i - 1, j - 1) == "S" and get(i + 1, j + 1) == "M")
    )
    and (
        (get(i - 1, j + 1) == "M" and get(i + 1, j - 1) == "S")
        or (get(i - 1, j + 1) == "S" and get(i + 1, j - 1) == "M")
    )
)

print(
    sum(
        [
            check_dir(i, j, dx, dy)
            for i in range(h)
            for j in range(w)
            for dx, dy in dirs
            if grid[i][j] == "X"
        ]
    )
)
print(
    sum([check_pattern(i, j) for i in range(h) for j in range(w) if grid[i][j] == "A"])
)
