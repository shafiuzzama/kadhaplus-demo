// Money is stored in paise (₹1 = 100). Helpers format to Indian rupees.
export function rupees(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

export function rupeesDecimal(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
