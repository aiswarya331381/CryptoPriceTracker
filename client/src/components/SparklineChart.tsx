import { cn } from "@/lib/utils";

interface SparklineChartProps {
  data: number[];
  width: number;
  height: number;
  isPositive: boolean;
}

export default function SparklineChart({ data, width, height, isPositive }: SparklineChartProps) {
  // Calculate min and max values
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Function to scale the y-value to fit within the SVG
  const scaleY = (value: number) => {
    // Leave some padding (10%) at top and bottom
    const padding = height * 0.1;
    const availableHeight = height - 2 * padding;
    
    // Return position from bottom of chart
    return height - padding - ((value - min) / range) * availableHeight;
  };
  
  // Calculate path
  const pathData = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = scaleY(value);
    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');
  
  return (
    <svg className={cn(
      "sparkline",
      isPositive ? "sparkline-positive" : "sparkline-negative"
    )} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={pathData}></path>
    </svg>
  );
}
