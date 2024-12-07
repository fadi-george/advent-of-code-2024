import fileinput


def is_safe_report(report):
    is_increasing = report[1] > report[0]
    for i in range(1, len(report)):
        diff = report[i] - report[i - 1]
        abs_diff = abs(diff)

        if abs_diff > 3 or abs_diff < 1:
            return False
        if is_increasing and diff <= 0:
            return False
        if not is_increasing and diff >= 0:
            return False
    return True


reports = [list(map(int, line.split())) for line in fileinput.input()]

# part 1
print(sum(is_safe_report(report) for report in reports))

# part 2
safe_reports = []
for report in reports:
    is_safe = False
    for i in range(len(report)):
        adjusted_report = report[:i] + report[i + 1 :]
        if is_safe_report(adjusted_report):
            is_safe = True
            break
    safe_reports.append(is_safe)
print(sum(safe_reports))
