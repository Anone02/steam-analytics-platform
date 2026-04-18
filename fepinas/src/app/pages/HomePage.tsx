import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { ChevronDown, Gamepad2, TrendingUp, AlertTriangle, Star } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { ParallaxBackground } from "../components/ParallaxBackground";

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hidden-gems");

  const categories = [
    {
      id: "hidden-gems",
      title: "Hidden Gems",
      icon: Star,
      description: "Temukan permainan tersembunyi yang belum banyak dikenal tetapi memiliki kualitas luar biasa. Kami menganalisis ribuan game untuk menemukan berlian terpendam yang layak dimainkan. Sistem penilaian kami mempertimbangkan rasio review positif, engagement pemain, dan nilai hiburan untuk menemukan game-game berkualitas tinggi yang mungkin terlewatkan dari radar Anda.",
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/50"
    },
    {
      id: "best-value",
      title: "Best Value",
      icon: TrendingUp,
      description: "Analisis mendalam tentang game dengan nilai terbaik untuk uang Anda. Kami menghitung rasio harga terhadap jam bermain, kualitas konten, dan kepuasan pemain untuk menentukan game mana yang memberikan pengalaman terbaik dengan investasi yang wajar. Temukan penawaran terbaik dan maksimalkan budget gaming Anda dengan rekomendasi cerdas kami.",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/50"
    },
    {
      id: "toxic-games",
      title: "Toxic Games",
      icon: AlertTriangle,
      description: "Peringatan tentang game dengan komunitas atau mekanik yang berpotensi toxic. Sistem kami menganalisis sentimen review, laporan pemain, dan pola perilaku untuk mengidentifikasi game dengan lingkungan yang mungkin tidak menyenangkan. Informasi ini membantu Anda membuat keputusan berdasarkan preferensi pengalaman bermain yang Anda inginkan.",
      color: "from-red-500/20 to-rose-500/20 border-red-500/50"
    },
    {
      id: "popular-games",
      title: "Popular Games",
      icon: Gamepad2,
      description: "Pelacakan real-time dari game paling populer di Steam. Lihat tren terkini, lonjakan pemain, dan game yang sedang viral di komunitas. Analisis kami mencakup data concurrent players, pertumbuhan komunitas, dan momentum untuk membantu Anda tetap update dengan apa yang sedang dimainkan semua orang saat ini.",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/50"
    }
  ];

  const currentCategory = categories.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 dark:text-purple-400 text-green-600" />
            <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">
              steam analytics
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="border-4 dark:border-purple-500/50 border-green-600/50 p-12 rounded-lg dark:bg-slate-900/40 bg-white/60 backdrop-blur-md shadow-2xl dark:shadow-purple-900/20 shadow-green-900/20">
            <h2 className="text-6xl font-bold mb-6 dark:text-white text-slate-900 tracking-tight">
              STEAM ANALYTICS DASHBOARD
            </h2>
            <p className="text-xl dark:text-purple-300 text-green-700 mb-8 flex items-center justify-center gap-3 flex-wrap">
              <span>Discover Hidden Gems</span>
              <span className="dark:text-purple-400 text-green-600">•</span>
              <span>Analyze Value</span>
              <span className="dark:text-purple-400 text-green-600">•</span>
              <span>Track Toxicity</span>
              <span className="dark:text-purple-400 text-green-600">•</span>
              <span>Follow Trends</span>
            </p>
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 h-auto dark:bg-purple-600 dark:hover:bg-purple-700 bg-green-600 hover:bg-green-700 dark:text-white text-white shadow-lg dark:shadow-purple-500/50 shadow-green-500/50 transition-all hover:scale-105"
              onClick={() => {
                document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              EXPLORE DASHBOARD
            </Button>
            <div className="mt-6 animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto dark:text-purple-400 text-green-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="explore" className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Tabs with Descriptions */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full h-auto gap-2 dark:bg-slate-900/60 bg-white/80 backdrop-blur-sm p-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:dark:bg-purple-600/80 data-[state=active]:bg-green-600/80 data-[state=active]:text-white px-4 py-3 text-sm font-medium whitespace-nowrap"
                    >
                      <Icon className="w-4 h-4 mr-2 inline-block" />
                      {category.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsContent key={category.id} value={category.id} className="mt-6">
                    <Card className={`p-8 dark:bg-slate-900/60 bg-white/90 backdrop-blur-sm border-2 bg-gradient-to-br ${category.color}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg dark:bg-purple-500/20 bg-green-500/20">
                          <Icon className="w-8 h-8 dark:text-purple-400 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
                            {category.title}
                          </h3>
                          <div className="h-1 w-20 dark:bg-purple-500 bg-green-600 rounded-full" />
                        </div>
                      </div>
                      <p className="text-base leading-relaxed dark:text-slate-300 text-slate-700">
                        {category.description}
                      </p>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>

          {/* Right Column - Navigation Buttons */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-center dark:text-white text-slate-900 mb-8">
              Click one below:
            </h3>
            <div className="space-y-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: index % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)',
                      animation: `slideInStagger 0.6s ease-out ${index * 0.1}s forwards`
                    }}
                  >
                    <Button
                      size="lg"
                      className={`w-full h-auto py-6 px-8 text-lg font-semibold justify-start gap-4 dark:bg-gradient-to-r dark:hover:scale-105 transition-all shadow-lg backdrop-blur-sm ${
                        category.id === 'hidden-gems' 
                          ? 'dark:from-yellow-600 dark:to-amber-600 from-yellow-500 to-amber-500 dark:hover:from-yellow-500 dark:hover:to-amber-500' 
                          : category.id === 'best-value'
                          ? 'dark:from-green-600 dark:to-emerald-600 from-green-500 to-emerald-500 dark:hover:from-green-500 dark:hover:to-emerald-500'
                          : category.id === 'toxic-games'
                          ? 'dark:from-red-600 dark:to-rose-600 from-red-500 to-rose-500 dark:hover:from-red-500 dark:hover:to-rose-500'
                          : 'dark:from-blue-600 dark:to-cyan-600 from-blue-500 to-cyan-500 dark:hover:from-blue-500 dark:hover:to-cyan-500'
                      }`}
                      onClick={() => navigate(`/ranking/${category.id}`)}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{category.title}</span>
                      <span className="ml-auto text-2xl">→</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm dark:bg-slate-900/30 bg-white/30 mt-20">
        <div className="container mx-auto px-6 py-8 text-center dark:text-slate-400 text-slate-600">
          <p>Steam Analytics Dashboard © 2026 - Powered by Real-time API Data</p>
        </div>
      </footer>
    </div>
  );
}
