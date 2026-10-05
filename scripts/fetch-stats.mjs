// Atualiza public/stats.json com a soma das visitas de todos os jogos Roblox de data/games.js.
// Roda no GitHub Actions antes do build (push na main e toda segunda-feira).
// Se a API falhar, mantém o stats.json anterior e sai com código 0 para não quebrar o build.
import { writeFile } from 'node:fs/promises';
import { robloxUniverseIds } from '../data/games.js';

const OUTPUT = new URL('../public/stats.json', import.meta.url);

try {
  const url = `https://games.roblox.com/v1/games?universeIds=${robloxUniverseIds.join(',')}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const games = Array.isArray(json?.data) ? json.data : [];
  const visits = games.map((game) => game?.visits).filter((v) => typeof v === 'number');
  if (visits.length !== robloxUniverseIds.length) {
    throw new Error(`esperava ${robloxUniverseIds.length} jogos com visitas, recebeu ${visits.length}`);
  }
  const totalVisits = visits.reduce((sum, v) => sum + v, 0);
  await writeFile(OUTPUT, JSON.stringify({ totalVisits, updatedAt: new Date().toISOString() }, null, 2) + '\n');
  console.log(`stats.json atualizado: ${totalVisits.toLocaleString('en-US')} visitas em ${visits.length} jogos`);
} catch (error) {
  console.warn(`Não foi possível atualizar stats.json (${error.message}); mantendo o arquivo anterior.`);
}
