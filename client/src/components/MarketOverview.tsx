import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeInterval } from "@/store/cryptoSlice";
import { RootState } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  title: string;
  value: string;
  badge: {
    text: string;
    color: "green" | "red" | "blue" | "yellow" | "purple"
  };
  subtitle: string;
  subtitleValue: string;
}

function OverviewCard({ title, value, badge, subtitle, subtitleValue }: OverviewCardProps) {
  const getBadgeClasses = () => {
    const baseClasses = "text-xs px-2 py-1 rounded-full";
    
    switch (badge.color) {
      case "green":
        return cn(baseClasses, "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100");
      case "red":
        return cn(baseClasses, "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100");
      case "blue":
        return cn(baseClasses, "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100");
      case "yellow":
        return cn(baseClasses, "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100");
      case "purple":
        return cn(baseClasses, "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100");
      default:
        return cn(baseClasses, "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100");
    }
  };
  
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <span className={getBadgeClasses()}>{badge.text}</span>
        </div>
        <p className="text-2xl font-semibold font-mono">{value}</p>
        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{subtitle}: </span>
          <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">{subtitleValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MarketOverview() {
  const dispatch = useDispatch();
  const { selectedInterval } = useSelector((state: RootState) => state.crypto);
  
  const handleIntervalChange = (interval: string) => {
    dispatch(setTimeInterval(interval));
  };
  
  return (
    <section className="py-4 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <OverviewCard
            title="Market Cap"
            value="$1.23T"
            badge={{ text: "+2.4%", color: "green" }}
            subtitle="24h Vol"
            subtitleValue="$89.4B"
          />
          
          <OverviewCard
            title="Dominance"
            value="42.3%"
            badge={{ text: "BTC", color: "blue" }}
            subtitle="ETH"
            subtitleValue="18.1%"
          />
          
          <OverviewCard
            title="Fear & Greed"
            value="52/100"
            badge={{ text: "Neutral", color: "yellow" }}
            subtitle="Yesterday"
            subtitleValue="48/100"
          />
          
          <OverviewCard
            title="Gas Fee"
            value="23 Gwei"
            badge={{ text: "ETH", color: "purple" }}
            subtitle="Avg Tx Fee"
            subtitleValue="$1.87"
          />
        </div>
        
        {/* Time interval selector */}
        <div className="mb-4 flex space-x-2">
          {["1h", "24h", "7d", "30d"].map((interval) => (
            <button
              key={interval}
              onClick={() => handleIntervalChange(interval)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition",
                selectedInterval === interval 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
