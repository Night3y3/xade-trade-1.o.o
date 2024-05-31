export function parseString(input: string): string | null {
  const regex = /^PERP_(\w+)_USDC$/;
  const match = input.match(regex);
  return match ? match[1] : null;
}

export function change24hour(open: number, close: number): number {
  return parseFloat(((close - open) / open).toFixed(5));
}

export function change24hourPercent(open: number, close: number): number {
  return parseFloat((((close - open) / open) * 100).toFixed(5));
}
