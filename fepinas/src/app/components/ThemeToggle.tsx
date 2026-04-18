import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" className="w-12 h-12" />;
  }

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Create celestial gate effect
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 500);

    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(overlay);
        setIsTransitioning(false);
      }, 500);
    }, 1000);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="w-12 h-12 border-2 transition-all hover:scale-110 relative overflow-hidden group"
    >
      {theme === "dark" ? (
        <>
          <Moon className="h-6 w-6 text-purple-400 group-hover:rotate-12 transition-transform" />
          <div className="absolute inset-0 bg-purple-500/20 blur-xl group-hover:bg-purple-500/30 transition-all" />
        </>
      ) : (
        <>
          <Sun className="h-6 w-6 text-amber-500 group-hover:rotate-90 transition-transform" />
          <div className="absolute inset-0 bg-amber-400/20 blur-xl group-hover:bg-amber-400/30 transition-all" />
        </>
      )}
    </Button>
  );
}
