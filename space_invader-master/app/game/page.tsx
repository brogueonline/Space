"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";

import { GameContext } from "@/context/GameContext";

const Game = () => {
  const { setStart } = useContext(GameContext);
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [lifes, setLifes] = useState(3);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const spaceshipRef = useRef({ x: 0, y: 0 });
  const alienRef = useRef<HTMLImageElement | null>(null);
  const missileRef = useRef<HTMLImageElement | null>(null);
  const spaceshipSpeed = 5;
  const alienScale = 0.05;
  const missileScale = 0.1;

  useEffect(() => {
    setStart(true);

    const displayCanvas = displayCanvasRef.current;
    const drawCanvas = drawCanvasRef.current;
    const displayCtx = displayCanvas?.getContext("2d");
    const drawCtx = drawCanvas?.getContext("2d");

    if (displayCanvas && drawCanvas && displayCtx && drawCtx) {
      const spaceshipImage = new Image();
      spaceshipImage.src = "/space_ship.png";
      spaceshipRef.current.x = drawCanvas.width / 2 - 150;
      spaceshipRef.current.y = drawCanvas.height - 180;

      const alienImage = new Image();
      alienImage.src = "/alien.png";
      alienRef.current = alienImage;

      const missileImage = new Image();
      missileImage.src = "/missile.png";
      missileRef.current = missileImage;

      const explosionImage = new Image();
      explosionImage.src = "/explosion.png";

      let aliens: {
        x: number;
        y: number;
        w: number;
        h: number;
        d: number;
      }[] = [
        {
          x: drawCanvas.width / 2 - 25,
          y: 200,
          w: 50,
          h: 50,
          d: 1,
        },
      ];
      const missiles: { x: number; y: number; w: number; h: number }[] = [];
      const explosions: { x: number; y: number; w: number; h: number }[] = [];

      const renderGame = () => {
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);

        aliens.forEach((alien, i) => {
          drawCtx.drawImage(alienImage, alien.x, alien.y, alien.w, alien.h);

          if (alien.x + alien.w >= drawCanvas.width) alien.d = 0;
          if (alien.x <= 0) alien.d = 1;

          if (alien.d === 1) {
            alien.x += 1;
          } else {
            alien.x -= 1;
          }
          alien.y += 0.05;
          alien.w += alienScale;
          alien.h += alienScale;

          if (
            spaceshipRef.current.x + spaceshipImage.width >= alien.x &&
            alien.x + alien.w >= spaceshipRef.current.x &&
            spaceshipRef.current.y + spaceshipImage.height >= alien.y &&
            alien.y + alien.h >= spaceshipRef.current.y
          ) {
            explosions.push(
              {
                x: alien.x,
                y: alien.y,
                w: alien.w,
                h: alien.h,
              },
              {
                x: spaceshipRef.current.x,
                y: spaceshipRef.current.y,
                w: spaceshipImage.width,
                h: spaceshipImage.height,
              }
            );
            setTimeout(() => {
              const alienFound = aliens.find((alien2) => alien2 === alien);
              if (alienFound) {
                aliens.splice(i, 1);
                setLifes((prev) => prev - 1);
              }
              explosions.pop();
              explosions.pop();
            }, 150);
          }
        });

        missiles.forEach((missile) => {
          if (missile.y > 100) {
            drawCtx.drawImage(
              missileImage,
              missile.x,
              missile.y,
              missile.w,
              missile.h
            );

            missile.y -= 5;
            missile.w -= missileScale;
            missile.h -= missileScale;
          }
        });

        missiles.forEach((missile, i) => {
          aliens.forEach((alien, j) => {
            if (
              missile.x + missile.w >= alien.x &&
              alien.x + alien.w >= missile.x &&
              missile.y + missile.h >= alien.y &&
              alien.y + alien.h >= missile.y
            ) {
              explosions.push({
                x: alien.x,
                y: alien.y,
                w: alien.w,
                h: alien.h,
              });

              setTimeout(() => {
                const alienFound = aliens.find((alien2) => alien2 === alien);
                const missileFound = missiles.find(
                  (missile2) => missile2 === missile
                );
                if (alienFound && missileFound) {
                  missiles.splice(i, 1);
                  aliens.splice(j, 1);
                  setScore((prev) => prev + 10);
                }
                explosions.pop();
              }, 150);
            }
          });
        });

        drawCtx.drawImage(
          spaceshipImage,
          spaceshipRef.current.x,
          spaceshipRef.current.y
        );

        explosions.forEach((explosion) => {
          drawCtx.drawImage(
            explosionImage,
            explosion.x,
            explosion.y,
            explosion.w,
            explosion.h
          );
        });

        displayCtx.drawImage(drawCanvas, 0, 0);

        requestAnimationFrame(renderGame);
      };

      renderGame();

      const handleKeyDown = (event: any) => {
        if (event.key === "ArrowRight") {
          if (
            spaceshipRef.current.x + spaceshipImage.width <
            drawCanvas.width
          ) {
            spaceshipRef.current.x += spaceshipSpeed;
          }
        } else if (event.key === "ArrowLeft") {
          if (spaceshipRef.current.x > 0) {
            spaceshipRef.current.x -= spaceshipSpeed;
          }
        } else if (event.key === " ") {
          missiles.push({
            x: spaceshipRef.current.x + spaceshipImage.width / 2,
            y: spaceshipRef.current.y,
            w: missileImage.width,
            h: missileImage.height,
          });
        }
      };

      const interval = setInterval(() => {
        aliens.push({
          x: drawCanvas.width / 2 - 25,
          y: 200,
          w: 50,
          h: 50,
          d: 1,
        });
      }, 5000);

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        clearInterval(interval);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    if (lifes === 0) {
      router.push("/");
    }
  }, [lifes]);

  return (
    <>
      <div className="absolute top-[10px] right-[10px] z-0">
        <div className="w-full h-full absolute top-0 left-0 bg-white opacity-40 rounded-md z-[-1]"></div>
        <h1 className="text-white text-[2rem] uppercase m-0 p-5 pb-0">
          Score:{score}
        </h1>
        <div className="flex items-center justify-center p-5">
          {[...Array(lifes)].map((life, index) => (
            <img
              src="/heart.png"
              alt="img"
              className="w-[4rem] ml-1"
              key={index}
            />
          ))}
        </div>
      </div>
      <canvas
        ref={displayCanvasRef}
        width={window.innerWidth / 2}
        height={window.innerHeight}
        className="absolute w-[50%] left-[25%] top-0 h-[100%]"
      ></canvas>
      <canvas
        ref={drawCanvasRef}
        width={window.innerWidth / 2}
        height={window.innerHeight}
        className="absolute w-[50%] left-[25%] top-0 h-[100%]"
      ></canvas>
    </>
  );
};

export default Game;
