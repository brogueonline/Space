"use client";

import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import { GameContext } from "@/context/GameContext";

const Home = () => {
  const { setStart } = useContext(GameContext);

  useEffect(() => {
    setStart(false);
  }, []);

  return (
    <div className="w-[80%] h-[80%] absolute left-[10%] top-[10%] rounded-md flex items-center justify-center flex-col">
      <div className="w-full h-full top-0 left-0 bg-white opacity-10 absolute rounded-md"></div>
      <Image
        src="/planet_7.png"
        width={200}
        height={200}
        alt="spaceship"
        className="absolute top-10 left-12"
      />
      <Image
        src="/planet_3.png"
        width={200}
        height={200}
        alt="spaceship"
        className="absolute bottom-10 right-12"
      />
      <Image
        src="/alien.png"
        width={250}
        height={250}
        alt="spaceship"
        className="absolute rotate-12 home_alien"
      />
      <Image
        src="/space_invaders_logo.png"
        alt="logo"
        width={600}
        height={600}
        className="z-10"
      />
      <Link href="/game">
        <Button
          name="Start"
          styles="w-[20rem] h-[8rem] text-[2rem] mt-[3rem]"
        />
      </Link>
    </div>
  );
};

export default Home;
