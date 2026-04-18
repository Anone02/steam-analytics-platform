import { useTheme } from "next-themes";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer ring */}
        <div className={`absolute inset-0 rounded-full border-4 ${
          theme === "dark" 
            ? "border-purple-500/30" 
            : "border-green-500/30"
        }`} />
        
        {/* Spinning ring */}
        <div className={`absolute inset-0 rounded-full border-4 border-transparent ${
          theme === "dark"
            ? "border-t-purple-500 border-r-purple-500"
            : "border-t-green-600 border-r-green-600"
        } animate-spin`} />
        
        {/* Inner glow */}
        <div className={`absolute inset-2 rounded-full ${
          theme === "dark"
            ? "bg-purple-500/20"
            : "bg-green-500/20"
        } blur-sm animate-pulse`} />
      </div>
      
      <p className="dark:text-slate-400 text-slate-600 text-sm animate-pulse">
        {message}
      </p>
    </div>
  );
}
