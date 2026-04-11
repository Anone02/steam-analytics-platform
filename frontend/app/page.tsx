"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Sun, Moon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "system";

  const [mounted, setMounted] = useState(false);
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hidden-gems")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch(() =>
        setGames([
          { name: "Stardew Valley", rating: 95 },
          { name: "Hades", rating: 97 },
        ])
      );
  }, []);

  const chartData = games.map((game) => ({
    name: game.name,
    rating: game.rating,
  }));

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen text-black dark:text-white">

      {/* 🌙 Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="absolute top-4 right-4 z-50"
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>

      {/* 🖼️ HERO */}
      <section className="h-screen flex items-center justify-center text-center bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-900 dark:to-black relative">

        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
              Steam Analytics Dashboard
            </span>{" "}
            🎮
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-400 max-w-xl mx-auto">
            Discover hidden gems, toxic communities, and review trends
          </p>
        </div>

        <div className="absolute bottom-10 w-full flex justify-center">
          <a href="#insights">
            <ChevronDown className="animate-bounce w-8 h-8 text-gray-700 dark:text-gray-400 cursor-pointer" />
          </a>
        </div>

      </section>

      {/* 📊 INSIGHTS */}
      <section id="insights" className="p-8 bg-gray-100 dark:bg-gray-950">

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Insights
          </h2>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TABLE */}
            <Card className="bg-white dark:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Hidden Gems ✨</CardTitle>
              </CardHeader>

              <CardContent>
                {games.length === 0 ? (
                  <p className="animate-pulse text-gray-500">
                    Loading data...
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead className="text-right">Rating</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {games.map((game: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {game.name}
                          </TableCell>

                          <TableCell className="text-right text-yellow-500 font-semibold">
                            ⭐ {game.rating}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* CHART */}
            <Card className="bg-white dark:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Rating Chart 📊</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="h-[300px] w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rating" fill="#facc15" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* TOXIC */}
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Toxic Games 💀</CardTitle>
              </CardHeader>
              <CardContent>
                Game dengan komunitas toxic atau review negatif tinggi.
              </CardContent>
            </Card>

            {/* REVIEW BOMB */}
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Review Bomb 🚨</CardTitle>
              </CardHeader>
              <CardContent>
                Game yang kena lonjakan review negatif tiba-tiba.
              </CardContent>
            </Card>

          </div>
        </div>

      </section>

    </main>
  );
}