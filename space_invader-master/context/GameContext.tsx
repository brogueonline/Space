"use client";

import React, { useState } from "react";

interface IGameContext {
  start: boolean;
  setStart: (e: any) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const GameContext = React.createContext<IGameContext>({
  start: false,
  setStart: (e: any) => {},
});

export const GameProvider: React.FC<Props> = ({ children }) => {
  const [start, setStart] = useState(false);

  return (
    <GameContext.Provider value={{ start, setStart }}>
      {children}
    </GameContext.Provider>
  );
};
