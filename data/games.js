// Lista única dos jogos da seção Principal Games.
// Usada pelo site (components/Portfolio.tsx) e pelo script scripts/fetch-stats.mjs.
// universeId = jogos Roblox (jogadores ao vivo e visitas); islandCode = ilhas Fortnite (jogadores ao vivo).
export const principalGames = [
  { title: "Dead Sky", universeId: 7346053486, type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/661pd10/Deadsky.png", url: "https://www.roblox.com/games/132651897588092/Dead-Sky" },
  { title: "Anime Royale", universeId: 5638211721, type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/d0Pxf2gP/animeroyale.png", url: "https://www.roblox.com/games/16347800591/Anime-Royale" },
  { title: "Steal a Brainrot", universeId: 7709344486, type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/Cp3M7tc3/robabrainrot.png", url: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot" },
  { title: "Break a Lucky Block!", universeId: 9344307274, type: "Animation", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co/5gm6zZ2r/no-Filter.jpg", url: "https://www.roblox.com/games/124311897657957/Break-a-Lucky-Block" },
  { title: "FRUITS VS BRAINROTS", islandCode: "4554-4413-1515", type: "Animation", platform: "Fortinite", btn: "Open Fortnite", img: "https://i.ibb.co/vxqMtW2P/landscape-comp.jpg", url: "https://fortnite.gg/island?code=4554-4413-1515" },
  { title: "UNBOX A BRAINROT", islandCode: "9359-3780-0816", type: "Animation", platform: "Fortinite", btn: "Open Fortnite", img: "https://cdn-0001.qstv.on.epicgames.com/tzCfifjBmmvkcHogNW/image/landscape_comp.jpeg", url: "https://fortnite.gg/island/9359-3780-0816" },
  { title: "CRAFT A BRAINROT", islandCode: "4838-2014-5851", type: "Animation", platform: "Fortinite", btn: "Open Fortnite", img: "https://cdn-0001.qstv.on.epicgames.com/JVjPptWVmbnoxMcLMn/image/landscape_comp.jpeg", url: "https://fortnite.gg/island/4838-2014-5851" },
  { title: "FISH FOR BRAINROTS", islandCode: "4177-0661-0836", type: "Animation", platform: "Fortinite", btn: "Open Fortnite", img: "https://cdn-0001.qstv.on.epicgames.com/siJDuFzWkSFtAiCLen/image/landscape_comp.jpeg", url: "https://fortnite.gg/island/4177-0661-0836" },
  { title: "Dead Sails", universeId: 7329738958, type: "Systems", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/7JD05kKg/deadails.png", url: "https://www.roblox.com/games/85832836496852/Dead-Sails" },
  { title: "Labubu Horror", universeId: 7739021285, type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/svvhcD85/labubu.png", url: "https://www.roblox.com/games/123755963456017/Labubu-Horror" },
  { title: "100 Players vs 1 Gorilla", universeId: 7614141751, type: "Animation", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co/LT1ytQJ/100vs1gorila.png", url: "https://www.roblox.com/games/114312759142223/100-Players-vs-1-Gorilla" },
  { title: "My Brainrot Island", universeId: 8163007296, type: "VFX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co/99cj5QKB/brainrotisland.png", url: "https://www.roblox.com/games/122345408677744/My-Brainrot-Island" },
  { title: "Brainrot Garden", type: "Systems", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/YFVyf0BW/Brainrotgarden.png", url: "https://www.roblox.com/games/132651897588092/Dead-Sky" }
];

export const robloxUniverseIds = principalGames.map((game) => game.universeId).filter(Boolean);
