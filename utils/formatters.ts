export function formatPopulation(population: number): string {
  if (population >= 1_000_000_000) {
    return `${(population / 1_000_000_000).toFixed(1)}B`;
  }
  if (population >= 1_000_000) {
    return `${(population / 1_000_000).toFixed(1)}M`;
  }
  if (population >= 1_000) {
    return `${(population / 1_000).toFixed(1)}K`;
  }
  return population.toLocaleString();
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} km²`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatLanguages(languages?: { [key: string]: string }): string {
  if (!languages) return 'N/A';
  return Object.values(languages).join(', ');
}

export function formatCurrencies(currencies?: { [key: string]: { name: string; symbol: string } }): string {
  if (!currencies) return 'N/A';
  return Object.values(currencies)
    .map((c) => `${c.name} (${c.symbol})`)
    .join(', ');
}
