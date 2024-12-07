from functools import *
import fileinput

mid = lambda x: x[len(x) // 2]

p1 = p2 = 0
rules = {}
updates = []
for line in fileinput.input():
    line = line.strip()
    if "|" in line:
        p1, p2 = map(int, line.split("|"))
        rules[p1] = rules.get(p1, set()) | {p2}
    elif "," in line:
        updates.append(tuple(map(int, line.split(","))))

sort = lambda x: tuple(
    sorted(
        x,
        key=cmp_to_key(lambda a, b: -1 if b in rules.get(a, set()) else 0),
    )
)

u_sort = [(u, sort(u)) for u in updates]
print(sum(mid(u) for u, su in u_sort if su == u))
print(sum(mid(su) for u, su in u_sort if su != u))
