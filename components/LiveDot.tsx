import React from 'react';

export const LiveDot = () => (
  <span className="relative flex h-2 w-2 flex-shrink-0">
    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"></span>
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
  </span>
);
