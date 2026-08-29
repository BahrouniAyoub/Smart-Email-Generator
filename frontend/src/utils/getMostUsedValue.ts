export function getMostUsedValue(
  values: (string | null | undefined)[]
): string | null {
  const counts: Record<string, number> = {};

  for (const value of values) {
    if (!value) {
      continue;
    }

    counts[value] =
      (counts[value] || 0) + 1;
  }

  let mostUsed: string | null = null;
  let highestCount = 0;

  for (
    const [value, count]
    of Object.entries(counts)
  ) {
    if (count > highestCount) {
      highestCount = count;
      mostUsed = value;
    }
  }

  return mostUsed;
}