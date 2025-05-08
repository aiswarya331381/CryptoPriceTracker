import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  // For prices less than 1, show more decimal places
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  
  // For prices less than 1000, show two decimal places
  if (price < 1000) {
    return `$${price.toFixed(2)}`;
  }
  
  // For prices >= 1000, use the formatNumber function with dollar sign
  return `$${formatNumber(price)}`;
}

export function formatNumber(num: number, decimals = 1): string {
  if (num === null || num === undefined) return '';
  
  // Convert to absolute value for formatting
  const absNum = Math.abs(num);
  
  // For numbers less than 1, show 4 decimal places
  if (absNum < 1) {
    return num.toFixed(4);
  }
  
  // For numbers less than 1000, show 2 decimal places
  if (absNum < 1000) {
    return num.toFixed(2);
  }
  
  // For billions
  if (absNum >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B';
  }
  
  // For millions
  if (absNum >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  
  // For thousands
  if (absNum >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  
  // Default
  return num.toFixed(decimals);
}

export function generateSparklineData(
  length: number = 50,
  volatility: number = 0.1,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): number[] {
  const data: number[] = [];
  let value = 100;
  
  // Trend bias
  const trendBias = trend === 'up' ? 0.05 : trend === 'down' ? -0.05 : 0;
  
  for (let i = 0; i < length; i++) {
    // Random change with trend bias
    const change = (Math.random() - 0.5) * volatility + trendBias;
    value = Math.max(1, value * (1 + change));
    data.push(value);
  }
  
  return data;
}
