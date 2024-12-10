# import fileinput
# from itertools import combinations

# grid = [line.strip() for line in fileinput.input()]
# w, h = len(grid[0]), len(grid)

# ants = {
#     char: [(i, j) for i in range(h) for j in range(w) if grid[i][j] == char]
#     for char in set(char for row in grid for char in row if char not in ".#")
# }


# def get_impact(is_capped):
#     visited = set()

#     def visit_points(p, direction):
#         while 0 <= p[0] < h and 0 <= p[1] < w:
#             visited.add((p[0], p[1]))
#             p = [p[0] + direction[0], p[1] + direction[1]]
#             if is_capped:
#                 break

#     for points in ants.values():
#         pairs = combinations(points, 2)
#         for (x1, y1), (x2, y2) in pairs:
#             dx, dy = x2 - x1, y2 - y1
#             p1, p2 = [x1 - dx, y1 - dy], [x2 + dx, y2 + dy]

#             if not is_capped:
#                 visited.update([(x1, y1), (x2, y2)])

#             visit_points(p1, [-dx, -dy])
#             visit_points(p2, [dx, dy])

#     return len(visited)


# print(get_impact(True))
# print(get_impact(False))
