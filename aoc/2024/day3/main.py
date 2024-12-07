import fileinput
import re

p1_vals = []
p2_vals = []

ignored = False

for line in fileinput.input():
    matches = re.finditer(r"mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)", line)

    for match in matches:
        command = match.group(0)
        x, y = match.group(1, 2) if match.group(1) else (None, None)

        if command == "do()":
            ignored = False
        elif command == "don't()":
            ignored = True
        else:
            p1_vals.append([int(x), int(y)])
            if not ignored:
                p2_vals.append([int(x), int(y)])


def part1():
    return sum(x * y for x, y in p1_vals)


def part2():
    return sum(x * y for x, y in p2_vals)


print(part1())
print(part2())
