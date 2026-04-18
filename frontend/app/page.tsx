"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [games, setGames] = useState<any[]>([]);
  const [type, setType] = useState("hidden");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/scores?type=${type}&limit=20`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <main
      className={`min-h-screen p-8 transition ${
        isDark
          ? "bg-[#404258] text-white"
          : "bg-[#A1E3F9] text-black"
      }`}
    >
      {/* TOGGLE */}
      <Button onClick={() => setTheme(isDark ? "light" : "dark")}>
        Toggle Theme
      </Button>

      <h1 className="text-4xl font-bold my-6">
        Steam Analytics Dashboard 🎮
      </h1>

      {/* FILTER */}
      <div className="flex gap-2 mb-6">
        <Button onClick={() => setType("hidden")}>Hidden</Button>
        <Button onClick={() => setType("value")}>Value</Button>
        <Button onClick={() => setType("toxic")}>Toxic</Button>
        <Button onClick={() => setType("popular")}>Popular</Button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {games.map((g) => (
            <Card
              key={g.appid}
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => router.push(`/game/${g.appid}`)}
            >
              <CardHeader>
                <CardTitle>{g.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <p>
                  Score:{" "}
                  {(
                    g.hidden_gem_score ||
                    g.value_score ||
                    g.toxic_score ||
                    g.popularity_score
                  )?.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}