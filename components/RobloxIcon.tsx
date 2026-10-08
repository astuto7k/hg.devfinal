import React from 'react';

// Logo oficial atual da Roblox (Simple Icons), usado no Hero e no card Network Hub do About.
// Sem size, usa w-5 h-5; com size (px), segue o tamanho dos ícones do lucide.
export const RobloxIcon = ({ size }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={size ? undefined : 'w-5 h-5'}>
    <path d="M18.926 23.998 0 18.892 5.075.002 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z" />
  </svg>
);
