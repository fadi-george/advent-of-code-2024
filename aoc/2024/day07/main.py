import fileinput
import re


def check_target(arr: list[int], target: int, allow_concat: bool = False) -> bool:
    def dfs(value: int, i: int) -> bool:
        if i == 0:
            return value == arr[0]

        d = 1
        n = arr[i]
        while d <= n:
            d *= 10

        # Check concatenation
        if allow_concat and value % d == n:
            if dfs(value // d, i - 1):
                return True
        # Check division
        if value % n == 0 and dfs(value // n, i - 1):
            return True
        # Check subtraction
        return dfs(value - n, i - 1)

    return dfs(target, len(arr) - 1)


vals = [[int(n) for n in re.findall(r"\d+", line)] for line in fileinput.input()]
print(sum(p for p, *r in vals if check_target(r, p)))
print(sum(p for p, *r in vals if check_target(r, p, True)))
