// Botão/menu "Contact": rola até a linha do Discord no card Network Hub (About) e a destaca por alguns segundos.
export const DISCORD_CONTACT_ID = 'discord-contact';
const HIGHLIGHT_CLASS = 'contact-highlight';
const HIGHLIGHT_MS = 2500;

let timer: number | undefined;

export const focusDiscordContact = (event?: { preventDefault: () => void }) => {
  const el = document.getElementById(DISCORD_CONTACT_ID);
  if (!el) return; // sem a linha, deixa o link seguir o href normalmente
  event?.preventDefault();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  // Reinicia o destaque a cada clique.
  el.classList.remove(HIGHLIGHT_CLASS);
  void el.offsetWidth;
  el.classList.add(HIGHLIGHT_CLASS);
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el.classList.remove(HIGHLIGHT_CLASS), HIGHLIGHT_MS);
};
