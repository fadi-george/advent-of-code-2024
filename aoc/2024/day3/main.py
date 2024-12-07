import fileinput
import re

p1 = p2 = 0
ignored = False

for line in fileinput.input():
    matches = re.finditer(r"mul\((\d+),(\d+)\)|do\(\)|don't\(\)", line)
    for match in matches:
        command = match.group(0)
        if command == "do()":
            ignored = False
        elif command == "don't()":
            ignored = True
        else:
            x, y = map(int, match.groups())
            product = x * y
            p1 += product
            p2 += product * (not ignored)

print(p1)
print(p2)
