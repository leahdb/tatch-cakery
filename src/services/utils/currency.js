export const formatNumber = (amount) => {
  const n = Math.round(Number(amount) || 0);
  return n.toLocaleString("en-US");
};

export const formatLBP = (amount) => `LBP ${formatNumber(amount)}`;
