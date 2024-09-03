import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  styles?: string;
  handleChange?: () => void;
}

const Button = ({ name, styles, handleChange }: Props) => {
  return (
    <button
      className={`min-w-[2rem] min-h-[2rem] outline-none border-none relative flex items-center justify-center text-lg font-bold text-white uppercase transi ease-in hover:scale-[1.1] ${styles}`}
      onClick={handleChange}
    >
      <Image
        src="/button.png"
        className="absolute top-0 left-0 z-0"
        fill
        alt={name}
      />
      <p className="z-0">{name}</p>
    </button>
  );
};

export default Button;
