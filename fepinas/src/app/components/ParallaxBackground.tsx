import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ParallaxBackground() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);
  const [butterflies, setButterflies] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate stars for dark mode
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }));
    setStars(newStars);

    // Generate butterflies for light mode
    const newButterflies = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setButterflies(newButterflies);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (theme === "dark") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/50 to-slate-950" />
        
        {/* Nebula Effect */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
            animationDelay: '1s'
          }}
        />

        {/* Stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
            }}
          />
        ))}

        {/* Shooting Stars */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white shooting-star" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 shooting-star animation-delay-2" />
        
        {/* Floating Astronaut */}
        <div 
          className="absolute top-1/4 right-1/4 text-6xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)`
          }}
        >
          🚀
        </div>

        {/* Satellite */}
        <div 
          className="absolute bottom-1/3 left-1/3 text-4xl animate-float animation-delay-3"
          style={{
            transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`
          }}
        >
          🛸
        </div>

        {/* Asteroid Belt */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent transform -rotate-12" />
      </div>
    );
  }

  // Light Mode - Nature Theme
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-emerald-50 to-green-100" />
      
      {/* Sun */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-200 rounded-full" />

      {/* Distant Mountains */}
      <div 
        className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-300/40 to-transparent"
        style={{
          clipPath: 'polygon(0 100%, 0 40%, 20% 60%, 40% 35%, 60% 55%, 80% 45%, 100% 65%, 100% 100%)',
          transform: `translateX(${mousePosition.x * -0.2}px)`
        }}
      />

      {/* Trees - Back Layer */}
      <div 
        className="absolute bottom-0 left-0 w-full h-96 opacity-30"
        style={{ transform: `translateX(${mousePosition.x * -0.4}px)` }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-16 h-48 bg-green-700"
            style={{
              left: `${i * 12}%`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        ))}
      </div>

      {/* Trees - Front Layer */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[450px] opacity-50"
        style={{ transform: `translateX(${mousePosition.x * -0.6}px)` }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-20 h-64 bg-green-800"
            style={{
              left: `${i * 15 + 5}%`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        ))}
      </div>

      {/* Butterflies */}
      {butterflies.map((butterfly, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-butterfly"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            animationDelay: `${butterfly.delay}s`,
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        >
          🦋
        </div>
      ))}

      {/* Floating Pollen/Bokeh */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200/60 rounded-full animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Falling Leaves */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-falling-leaves"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-50px',
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        >
          🍃
        </div>
      ))}

      {/* Waterfall in Distance */}
      <div 
        className="absolute bottom-32 right-1/4 w-1 h-32 bg-gradient-to-b from-blue-200 to-transparent opacity-40 animate-waterfall"
        style={{ transform: `translateX(${mousePosition.x * -0.3}px)` }}
      />
    </div>
  );
}
