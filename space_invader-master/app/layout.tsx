import "./globals.css";
import { Press_Start_2P } from "next/font/google";

import { GameProvider } from "@/context/GameContext";
import Background from "@/components/Background";

const anton = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Space Invaders Game",
  description: "Built by CyberWolves",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={anton.className}>
        <GameProvider>
          <Background>{children}</Background>
        </GameProvider>
      </body>
    </html>
  );
}
