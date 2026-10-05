import { useSyncExternalStore } from 'react';
import { principalGames } from '../data/games.js';

// Jogadores ao vivo, compartilhados pelo site todo: uma única rodada de
// requisições a cada 60s, não importa quantos componentes usem o hook.

export type LiveGame = { universeId?: number; islandCode?: string };

const REFRESH_MS = 60_000;

export const playersKey = (game: LiveGame) =>
  game.universeId ? `roblox:${game.universeId}` : game.islandCode ? `fortnite:${game.islandCode}` : null;

export const formatPlayers = (n: number) => n.toLocaleString('en-US');

const fetchJson = async (url: string, signal: AbortSignal) => {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// Busca os jogadores de todos os jogos em paralelo. Fontes que falharem ficam de fora do resultado.
const fetchLivePlayers = async (games: LiveGame[], signal: AbortSignal): Promise<Record<string, number>> => {
  const universeIds = [...new Set(games.map((g) => g.universeId).filter((id): id is number => !!id))];
  const islandCodes = [...new Set(games.map((g) => g.islandCode).filter((code): code is string => !!code))];
  const result: Record<string, number> = {};

  const robloxTask = universeIds.length
    ? fetchJson(`https://games.roproxy.com/v1/games?universeIds=${universeIds.join(',')}`, signal).then((json) => {
        for (const game of json?.data ?? []) {
          if (typeof game?.id === 'number' && typeof game?.playing === 'number') result[`roblox:${game.id}`] = game.playing;
        }
      })
    : Promise.resolve();

  const fortniteTasks = islandCodes.map((code) =>
    fetchJson(`https://api.fortnite.com/ecosystem/v1/islands/${code}/metrics/minute/peak-ccu`, signal).then((json) => {
      const intervals: { value?: number | null }[] = Array.isArray(json?.intervals) ? json.intervals : [];
      const last = [...intervals].reverse().find((it) => typeof it?.value === 'number');
      if (last) result[`fortnite:${code}`] = last.value as number;
    })
  );

  await Promise.allSettled([robloxTask, ...fortniteTasks]);
  return result;
};

export type LivePlayersSnapshot = {
  players: Record<string, number>;
  total: number;
  hasData: boolean;
};

let snapshot: LivePlayersSnapshot = { players: {}, total: 0, hasData: false };
const listeners = new Set<() => void>();
let timer: number | undefined;
let controller: AbortController | null = null;

const load = async () => {
  controller?.abort();
  const current = (controller = new AbortController());
  const players = await fetchLivePlayers(principalGames, current.signal);
  if (current.signal.aborted) return;
  const values = Object.values(players);
  snapshot = { players, total: values.reduce((sum, n) => sum + n, 0), hasData: values.length > 0 };
  listeners.forEach((notify) => notify());
};

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  if (listeners.size === 1) {
    load();
    timer = window.setInterval(load, REFRESH_MS);
  }
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) {
      window.clearInterval(timer);
      controller?.abort();
    }
  };
};

export const useLivePlayers = () => useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
