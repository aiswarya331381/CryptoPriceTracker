import { useState } from "react";
import { LineChart } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

export default function Header() {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LineChart className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">CryptoTracker</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="flex items-center space-x-1 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filters</span>
          </button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
