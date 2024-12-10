import fileinput


def is_safe_report(report):
    is_increasing = report[1] > report[0]
    return all(
        1 <= abs(d := report[i] - report[i - 1]) <= 3 and (is_increasing == (d > 0))
        for i in range(1, len(report))
    )


reports = [list(map(int, line.split())) for line in fileinput.input()]
print(sum(is_safe_report(report) for report in reports))
print(
    sum(
        any(is_safe_report(report[:i] + report[i + 1 :]) for i in range(len(report)))
        for report in reports
    )
)
