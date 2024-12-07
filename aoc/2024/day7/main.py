import fileinput
import re
from math import log10, floor


def number_concat(a: int, b: int) -> int:
    return a * 10 ** (floor(log10(b)) + 1) + b


def check_target(arr: list[int], target: int, allow_concat: bool = False) -> bool:
    def dfs(value: int, length: int) -> bool:
        if length == len(arr):
            return value == target
        return (
            dfs(value + arr[length], length + 1)
            or dfs(value * arr[length], length + 1)
            or (allow_concat and dfs(number_concat(value, arr[length]), length + 1))
        )

    return (
        dfs(arr[0] + arr[1], 2)
        or dfs(arr[0] * arr[1], 2)
        or (allow_concat and dfs(number_concat(arr[0], arr[1]), 2))
    )


vals = [[int(n) for n in re.findall(r"\d+", line)] for line in fileinput.input()]
print(sum(p for p, *r in vals if check_target(r, p)))
print(sum(p for p, *r in vals if check_target(r, p, True)))
