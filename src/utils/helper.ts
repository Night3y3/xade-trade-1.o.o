export function parseString(input: string): string | null {
  const regex = /^PERP_(\w+)_USDC$/;
  const match = input.match(regex);
  return match ? match[1] : null;
}
