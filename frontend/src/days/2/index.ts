const checkReportSafety = (report: number[]): boolean => {
  const isIncreasing = report[1] > report[0];

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    const absDiff = Math.abs(diff);

    if (absDiff > 3 || absDiff < 1) return false;
    if (isIncreasing && diff <= 0) return false;
    if (!isIncreasing && diff >= 0) return false;
  }

  return true;
};

const countSafeReports = (reports: boolean[]): number =>
  reports.filter(Boolean).length;

export default (input: string) => {
  const reports = input
    .split("\n")
    .map((line) => line.split(/\s+/).map(Number));

  const part1 = () => {
    const safeReports = reports.map(checkReportSafety);
    return countSafeReports(safeReports);
  };

  const part2 = () => {
    const safeReports = reports.map((report) => {
      for (let i = 0; i < report.length; i++) {
        const adjustedReport = report.filter((_, j) => j !== i);
        if (checkReportSafety(adjustedReport)) return true;
      }
      return false;
    });

    return countSafeReports(safeReports);
  };

  return {
    part1: part1(),
    part2: part2(),
  };
};
