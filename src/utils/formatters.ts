export const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  if (absNum >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  if (absNum >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  }
  if (absNum < 0.01) {
    return num.toFixed(8);
  }
  return num.toFixed(2);
};