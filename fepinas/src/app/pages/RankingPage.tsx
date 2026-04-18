import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { 
  ArrowLeft, 
  Home, 
  Search, 
  Trophy, 
  Medal, 
  Award,
  ChevronUp,
  ChevronDown,
  Info
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { ParallaxBackground } from "../components/ParallaxBackground";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchGamesByCategory, GameData } from "../lib/api";

export function RankingPage() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(false);

  useEffect(() => {
    fetchGames();
  }, [category]);

  const fetchGames = async () => {
    setLoading(true);
    const data = await fetchGamesByCategory(category || "popular-games");
    setGames(data);
    setLoading(false);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      "hidden-gems": "Hidden Gems",
      "best-value": "Best Value",
      "toxic-games": "Toxic Games",
      "popular-games": "Popular Games"
    };
    return titles[cat] || cat;
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      "hidden-gems": "yellow",
      "best-value": "green",
      "toxic-games": "red",
      "popular-games": "blue"
    };
    return colors[cat] || "purple";
  };

  // Generate chart data from top 10 games
  const chartData = useMemo(() => {
    return games.slice(0, 10).map(game => ({
      name: game.name.length > 15 ? game.name.substring(0, 15) + "..." : game.name,
      score: game.score
    }));
  }, [games]);

  const filteredGames = games
    .filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortAscending ? a.score - b.score : b.score - a.score);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-sm font-bold dark:text-slate-400 text-slate-600">#{rank}</span>;
  };

  const color = getCategoryColor(category || "");

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm dark:bg-slate-900/60 bg-white/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/")}
                className="dark:border-purple-500/50 border-green-600/50"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/")}
                className="dark:border-purple-500/50 border-green-600/50"
              >
                <Home className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-slate-400 text-slate-500" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 dark:bg-slate-800/80 bg-white/90 backdrop-blur-sm border-2 dark:border-purple-500/50 border-green-600/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="dark:border-purple-500/50 border-green-600/50"
                onClick={() => setSortAscending(!sortAscending)}
              >
                SORT BY SCORE
                {sortAscending ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className={`text-5xl font-bold dark:text-${color}-400 text-${color}-600 mb-2`}>
            {getCategoryTitle(category || "")}
          </h1>
          <p className="dark:text-slate-400 text-slate-600">Top ranked games in this category</p>
        </div>

        {/* Chart Panel - Top 10 Games Comparison */}
        <Card className="p-6 mb-8 dark:bg-slate-900/80 bg-white/90 backdrop-blur-sm border-2 dark:border-purple-500/50 border-green-600/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold dark:text-white text-slate-900">
              Top 10 {getCategoryTitle(category || "")}
            </h2>
          </div>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="animate-pulse text-slate-400">Loading chart data...</div>
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="name" 
                  stroke="#888" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid #4c1d95',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="score" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-slate-400">No data available</div>
            </div>
          )}
        </Card>

        {/* Games Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="p-6 h-48 dark:bg-slate-900/60 bg-white/80 backdrop-blur-sm animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <Card
                key={game.id}
                className={`p-6 relative dark:bg-slate-900/80 bg-white/90 backdrop-blur-sm border-2 dark:border-${color}-500/30 border-${color}-600/30 hover:dark:border-${color}-500 hover:border-${color}-600 transition-all hover:scale-105 cursor-pointer group`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s backwards`
                }}
                onClick={() => navigate(`/detail/${game.id}`)}
              >
                {/* Rank Icon */}
                <div className="absolute top-4 left-4">
                  {getRankIcon(game.rank)}
                </div>

                {/* Score Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full dark:bg-${color}-500/20 bg-${color}-500/30 border dark:border-${color}-500/50 border-${color}-600/50`}>
                  <span className={`font-bold dark:text-${color}-300 text-${color}-700`}>
                    {game.score}
                  </span>
                </div>

                {/* Game Name */}
                <div className="mt-12 mb-16">
                  <h3 className="font-bold text-lg dark:text-white text-slate-900 line-clamp-2 group-hover:dark:text-${color}-400 group-hover:text-${color}-600 transition-colors">
                    {game.name}
                  </h3>
                </div>

                {/* Detail Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className={`absolute bottom-4 right-4 dark:border-${color}-500/50 border-${color}-600/50 dark:hover:bg-${color}-500/20 hover:bg-${color}-500/20`}
                >
                  <Info className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
