"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { GameContext } from "@/context/GameContext";

interface Props {
  children?: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }) => {
  const [imgLeft, setImgLeft] = useState(1);
  const [imgRight, setImgRight] = useState(8);

  const { start } = useContext(GameContext);

  useEffect(() => {
    let currentLeftImg = 1;
    let currentRightImg = 8;

    const interval = setInterval(() => {
      if (currentLeftImg < 8) {
        setImgLeft(currentLeftImg + 1);
        setImgRight(currentRightImg - 1);
        currentLeftImg++;
        currentRightImg--;
      } else {
        currentLeftImg = 1;
        currentRightImg = 8;
        setImgLeft(1);
        setImgRight(8);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <Image src="/space.jpg" fill alt="space" />
      {start && (
        <Image
          src="/speed_lines.png"
          fill
          alt="speed_lines"
          className="speed_lines"
        />
      )}
      {start &&
        [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <img
            key={num}
            src={`/planet_${num}.png`}
            alt="planet"
            className={`absolute left-[25%] top-[35%] w-[0rem] planets_left ${
              num === imgLeft ? "block" : "hidden"
            }`}
          />
        ))}
      {start &&
        [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <img
            key={num}
            src={`/planet_${num}.png`}
            alt="planet"
            className={`absolute right-[25%] top-[35%] w-[0rem] planets_right ${
              num === imgRight ? "block" : "hidden"
            }`}
          />
        ))}
      {children}
    </main>
  );
};

export default Background;
