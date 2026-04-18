import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { ParallaxBackground } from "../components/ParallaxBackground";
import { ThemeToggle } from "../components/ThemeToggle";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParallaxBackground />
      
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <div className="text-9xl font-bold dark:text-purple-500 text-green-600 mb-4">
          404
        </div>
        <h1 className="text-4xl font-bold dark:text-white text-slate-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl dark:text-slate-400 text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved to another dimension.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="dark:bg-purple-600 dark:hover:bg-purple-700 bg-green-600 hover:bg-green-700"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(-1)}
            className="dark:border-purple-500/50 border-green-600/50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
