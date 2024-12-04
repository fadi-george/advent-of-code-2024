import os

# Get the root directory of the project
root_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the file
file_path = os.path.join(root_dir, "input.txt")

left = []
right = []
with open(file_path, "r") as file:
    lines = [x.strip() for x in file.readlines()]
    for line in lines:
        a, b = map(int, line.split())
        left.append(a)
        right.append(b)

# Part 1
# Calculate difference between left and right arrays
left.sort()
right.sort()
dist = sum(abs(r - l) for l, r in zip(left, right))

print("Part 1: ", dist)


# Part 2
# Calculate score based on frequency of each number
freq = {}
for r in right:
    freq[r] = freq.get(r, 0) + 1

score = sum(l * freq.get(l, 0) for l in left)
print("Part 2: ", score)
