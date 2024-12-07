import fileinput
import re


def check_target(arr: list[int], target: int, allow_concat: bool = False) -> bool:
    def dfs(value: int, length: int) -> bool:
        if length == len(arr):
            return value == target
        i = 1
        while i < arr[length]:
            i *= 10
        return (
            dfs(value + arr[length], length + 1)
            or dfs(value * arr[length], length + 1)
            or (allow_concat and dfs(value * i + arr[length], length + 1))
        )

    return dfs(arr[0], 1)


vals = [[int(n) for n in re.findall(r"\d+", line)] for line in fileinput.input()]
print(sum(p for p, *r in vals if check_target(r, p)))
print(sum(p for p, *r in vals if check_target(r, p, True)))
