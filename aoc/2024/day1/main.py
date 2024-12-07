import fileinput

left, right = zip(*[map(int, line.split()) for line in fileinput.input()])
print(sum(abs(r - l) for l, r in zip(sorted(left), sorted(right))))
print(sum(l * right.count(l) for l in left))
