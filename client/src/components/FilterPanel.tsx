import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilter } from "@/store/cryptoSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const { showFilters } = useSelector((state: RootState) => state.crypto);
  const [showMarketCap, setShowMarketCap] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showSupply, setShowSupply] = useState(true);
  const [showPriceGraph, setShowPriceGraph] = useState(true);

  const handleCryptoCountChange = (value: string) => {
    dispatch(setFilter({ cryptoCount: value }));
  };

  const handleCurrencyChange = (value: string) => {
    dispatch(setFilter({ currency: value }));
  };

  const handleFieldToggle = (field: string, checked: boolean) => {
    switch (field) {
      case "marketCap":
        setShowMarketCap(checked);
        break;
      case "volume":
        setShowVolume(checked);
        break;
      case "supply":
        setShowSupply(checked);
        break;
      case "priceGraph":
        setShowPriceGraph(checked);
        break;
    }
    dispatch(setFilter({ [field]: checked }));
  };

  if (!showFilters) return null;

  return (
    <div 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 py-3 animate-in fade-in slide-in-from-top duration-300"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Show Cryptocurrencies
          </Label>
          <Select onValueChange={handleCryptoCountChange} defaultValue="all">
            <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2">
              <SelectValue placeholder="All Cryptocurrencies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cryptocurrencies</SelectItem>
              <SelectItem value="top50">Top 50 by Market Cap</SelectItem>
              <SelectItem value="top100">Top 100 by Market Cap</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Currency
          </Label>
          <Select onValueChange={handleCurrencyChange} defaultValue="USD">
            <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2">
              <SelectValue placeholder="USD ($)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="JPY">JPY (¥)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Show Fields
          </Label>
          <div className="flex flex-wrap -mx-2">
            <div className="px-2 mb-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketCap" 
                  checked={showMarketCap}
                  onCheckedChange={(checked) => 
                    handleFieldToggle("marketCap", checked as boolean)
                  }
                />
                <Label htmlFor="marketCap" className="text-sm">Market Cap</Label>
              </div>
            </div>
            <div className="px-2 mb-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="volume" 
                  checked={showVolume}
                  onCheckedChange={(checked) => 
                    handleFieldToggle("volume", checked as boolean)
                  }
                />
                <Label htmlFor="volume" className="text-sm">Volume</Label>
              </div>
            </div>
            <div className="px-2 mb-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="supply" 
                  checked={showSupply}
                  onCheckedChange={(checked) => 
                    handleFieldToggle("supply", checked as boolean)
                  }
                />
                <Label htmlFor="supply" className="text-sm">Supply</Label>
              </div>
            </div>
            <div className="px-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="priceGraph" 
                  checked={showPriceGraph}
                  onCheckedChange={(checked) => 
                    handleFieldToggle("priceGraph", checked as boolean)
                  }
                />
                <Label htmlFor="priceGraph" className="text-sm">Price Graph</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
