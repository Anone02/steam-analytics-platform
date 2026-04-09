"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, ChevronDown } from "lucide-react";


export default function Home() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

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

      {/* 🖼️ HERO SECTION */}
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

        {/* ⬇️ SCROLL INDICATOR */}
        <div className="absolute bottom-10 w-full flex justify-center">
          <a href="#insights">
            <ChevronDown className="animate-bounce w-8 h-8 text-gray-700 dark:text-gray-400 cursor-pointer" />
          </a>
        </div>

      </section>

      {/* 📊 CONTENT SECTION */}
      <section id="insights" className="p-8 bg-white dark:bg-gray-950">

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Hidden Gems ✨</CardTitle>
              </CardHeader>
              <CardContent>
                Game underrated dengan review bagus tapi kurang populer.
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Toxic Games 💀</CardTitle>
              </CardHeader>
              <CardContent>
                Game dengan komunitas toxic atau review negatif tinggi.
              </CardContent>
            </Card>

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