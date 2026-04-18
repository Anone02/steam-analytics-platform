"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GameDetail() {
  const { appid } = useParams();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/games/${appid}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((err) => console.error(err));
  }, [appid]);

  if (!game) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        {game.game?.name}
      </h1>

      <div className="space-y-2">
        <p>Hidden Gem: {game.score?.hidden_gem_score}</p>
        <p>Value Score: {game.score?.value_score}</p>
        <p>Toxic Score: {game.score?.toxic_score}</p>
        <p>Popularity: {game.score?.popularity_score}</p>
      </div>
    </main>
  );
}