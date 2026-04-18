import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  Home,
  Trophy,
  TrendingUp,
  Users,
  Star,
  AlertTriangle,
  DollarSign,
  Eye
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { ParallaxBackground } from "../components/ParallaxBackground";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { fetchGameDetail, GameDetail } from "../lib/api";

export function DetailPage() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGameDetailData();
  }, [gameId]);

  const fetchGameDetailData = async () => {
    setLoading(true);
    const data = await fetchGameDetail(gameId || "1");
    setGame(data);
    setLoading(false);
  };

  if (loading || !game) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <ParallaxBackground />
        <div className="text-center">
          <div className="w-16 h-16 border-4 dark:border-purple-500 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="dark:text-slate-400 text-slate-600">Loading game details...</p>
        </div>
      </div>
    );
  }

  // Radar chart data
  const radarData = [
    { subject: "Hidden Gems", score: game.hiddenGemsScore, fullMark: 100 },
    { subject: "Value", score: game.valueScore, fullMark: 100 },
    { subject: "Toxicity", score: game.toxicityScore, fullMark: 100 },
    { subject: "Popularity", score: game.popularityScore, fullMark: 100 },
  ];

  // Bar chart comparison data
  const comparisonData = [
    { category: "Hidden Gems", score: game.hiddenGemsScore },
    { category: "Value", score: game.valueScore },
    { category: "Toxicity", score: game.toxicityScore },
    { category: "Popularity", score: game.popularityScore },
  ];

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm dark:bg-slate-900/60 bg-white/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate(-1)}
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Game Identity Panel */}
        <Card className="p-8 mb-8 dark:bg-slate-900/80 bg-white/90 backdrop-blur-sm border-2 dark:border-purple-500/50 border-green-600/50">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-start gap-6">
              {/* Game Icon Placeholder */}
              <div className="w-32 h-32 dark:bg-gradient-to-br dark:from-purple-600 dark:to-blue-600 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center text-6xl shadow-xl">
                🎮
              </div>
              
              {/* Game Info */}
              <div>
                <h1 className="text-4xl font-bold dark:text-white text-slate-900 mb-2">
                  {game.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-1 dark:border-yellow-500 border-yellow-600 dark:text-yellow-400 text-yellow-700">
                    <Trophy className="w-4 h-4 mr-2" />
                    Rank #{game.rank}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-1 dark:border-purple-500 border-purple-600 dark:text-purple-400 text-purple-700">
                    Score: {game.totalScore}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 dark:text-yellow-400 text-yellow-600">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(game.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                  <span className="ml-2 dark:text-slate-400 text-slate-600">
                    {game.rating} / 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Metrics Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 dark:bg-gradient-to-br dark:from-yellow-900/40 dark:to-yellow-800/20 bg-gradient-to-br from-yellow-100 to-yellow-50 backdrop-blur-sm border-2 dark:border-yellow-500/50 border-yellow-600/50">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 dark:text-yellow-400 text-yellow-600" />
              <span className="text-3xl font-bold dark:text-yellow-300 text-yellow-700">
                {game.hiddenGemsScore}
              </span>
            </div>
            <h3 className="font-semibold dark:text-yellow-200 text-yellow-800">Hidden Gems</h3>
            <p className="text-sm dark:text-yellow-400/70 text-yellow-700/70">Undiscovered quality</p>
          </Card>

          <Card className="p-6 dark:bg-gradient-to-br dark:from-green-900/40 dark:to-green-800/20 bg-gradient-to-br from-green-100 to-green-50 backdrop-blur-sm border-2 dark:border-green-500/50 border-green-600/50">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 dark:text-green-400 text-green-600" />
              <span className="text-3xl font-bold dark:text-green-300 text-green-700">
                {game.valueScore}
              </span>
            </div>
            <h3 className="font-semibold dark:text-green-200 text-green-800">Value Score</h3>
            <p className="text-sm dark:text-green-400/70 text-green-700/70">Price: ${game.price}</p>
          </Card>

          <Card className="p-6 dark:bg-gradient-to-br dark:from-red-900/40 dark:to-red-800/20 bg-gradient-to-br from-red-100 to-red-50 backdrop-blur-sm border-2 dark:border-red-500/50 border-red-600/50">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 dark:text-red-400 text-red-600" />
              <span className="text-3xl font-bold dark:text-red-300 text-red-700">
                {game.toxicityScore}
              </span>
            </div>
            <h3 className="font-semibold dark:text-red-200 text-red-800">Toxicity</h3>
            <p className="text-sm dark:text-red-400/70 text-red-700/70">Community health</p>
          </Card>

          <Card className="p-6 dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-blue-800/20 bg-gradient-to-br from-blue-100 to-blue-50 backdrop-blur-sm border-2 dark:border-blue-500/50 border-blue-600/50">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 dark:text-blue-400 text-blue-600" />
              <span className="text-3xl font-bold dark:text-blue-300 text-blue-700">
                {game.popularityScore}
              </span>
            </div>
            <h3 className="font-semibold dark:text-blue-200 text-blue-800">Popularity</h3>
            <p className="text-sm dark:text-blue-400/70 text-blue-700/70">{(game.players / 1000).toFixed(1)}K players</p>
          </Card>
        </div>

        {/* Analysis Charts - 50/50 Split */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar Chart - Left Panel */}
          <Card className="p-6 dark:bg-slate-900/80 bg-white/90 backdrop-blur-sm border-2 dark:border-purple-500/50 border-green-600/50">
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-6">
              Multidimensional Analysis
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#555" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: '#888' }}
                />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid #4c1d95',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart - Right Panel */}
          <Card className="p-6 dark:bg-slate-900/80 bg-white/90 backdrop-blur-sm border-2 dark:border-purple-500/50 border-green-600/50">
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-6">
              Score Comparison
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" domain={[0, 100]} stroke="#888" />
                <YAxis dataKey="category" type="category" stroke="#888" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid #4c1d95',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            size="lg"
            className="dark:bg-purple-600 dark:hover:bg-purple-700 bg-green-600 hover:bg-green-700"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Rankings
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="dark:border-purple-500/50 border-green-600/50"
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}