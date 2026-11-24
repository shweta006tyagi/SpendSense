const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Example: 92000 becomes "₹92,000". */
export function formatRupees(amount: number): string {
  return rupees.format(amount);
}

/** Example: 92000 becomes "₹92k". Used on the chart axis so labels stay short. */
export function formatRupeesCompact(amount: number): string {
  const thousands = Math.round(amount / 1000);
  return `₹${thousands}k`;
}

/**
 * Expenses are stored as negative numbers.
 * Example: -4500 becomes "−₹4,500" and 92000 becomes "+₹92,000".
 */
export function formatSignedRupees(amount: number): string {
  const formatted = formatRupees(Math.abs(amount));
  if (amount < 0) {
    return `−${formatted}`;
  }
  return `+${formatted}`;
}
