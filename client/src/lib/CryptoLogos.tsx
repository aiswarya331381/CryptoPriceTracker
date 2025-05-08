import { SiBitcoin, SiEthereum, SiBinance, SiCardano, SiSolana } from "react-icons/si";

type CryptoLogoProps = {
  symbol: string;
  className?: string;
};

export function CryptoLogo({ symbol, className = "w-6 h-6" }: CryptoLogoProps) {
  // Map of crypto symbols to their corresponding logo components
  switch (symbol.toUpperCase()) {
    case "BTC":
      return <SiBitcoin className={`${className} text-orange-500`} />;
    case "ETH":
      return <SiEthereum className={`${className} text-blue-500`} />;
    case "BNB":
      return <SiBinance className={`${className} text-yellow-500`} />;
    case "ADA":
      return <SiCardano className={`${className} text-blue-700`} />;
    case "SOL":
      return <SiSolana className={`${className} text-purple-500`} />;
    default:
      // Fallback for coins without specific icons
      return (
        <div className={`${className} rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700`}>
          <span className="text-xs font-bold">{symbol.substring(0, 3)}</span>
        </div>
      );
  }
}
