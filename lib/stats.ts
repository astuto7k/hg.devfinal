import { useEffect, useState } from 'react';

// Visitas totais dos jogos Roblox, geradas 1x por semana por scripts/fetch-stats.mjs em public/stats.json.
const FALLBACK_TOTAL_VISITS = 74_555_976_695;

// Estimativa fixa das visitas dos jogos de Fortnite, que a API não permite contar.
// É somada ao total do Roblox só na exibição (inclusive no fallback); o stats.json guarda apenas o Roblox.
export const FORTNITE_VISITS_ESTIMATE = 5_000_000_000;

let cached: Promise<number> | null = null;

const loadTotalVisits = () =>
  (cached ??= fetch('./stats.json', { cache: 'no-cache' })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
    .then((json) => (typeof json?.totalVisits === 'number' && json.totalVisits > 0 ? json.totalVisits : FALLBACK_TOTAL_VISITS))
    .catch(() => FALLBACK_TOTAL_VISITS));

// Formato compacto sem arredondar para cima: 74,555,976,695 -> "74.5B".
export const formatCompact = (n: number) => {
  const units: [number, string][] = [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']];
  for (const [size, suffix] of units) {
    if (n >= size) return `${(Math.floor((n / size) * 10) / 10).toString()}${suffix}`;
  }
  return n.toString();
};

export const useTotalVisits = () => {
  const [total, setTotal] = useState(FALLBACK_TOTAL_VISITS);
  useEffect(() => {
    let active = true;
    loadTotalVisits().then((value) => active && setTotal(value));
    return () => {
      active = false;
    };
  }, []);
  return total + FORTNITE_VISITS_ESTIMATE;
};
