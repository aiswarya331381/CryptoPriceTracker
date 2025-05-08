import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { sortCryptos } from "@/store/cryptoSlice";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import SparklineChart from "./SparklineChart";
import { CryptoLogo } from "@/lib/CryptoLogos";

export default function CryptoTable() {
  const dispatch = useDispatch();
  const { cryptos, sortColumn, sortDirection, displayFilters } = useSelector(
    (state: RootState) => state.crypto
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate pagination
  const totalPages = Math.ceil(cryptos.length / itemsPerPage);
  const paginatedCryptos = cryptos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  const handleSort = (column: string) => {
    dispatch(sortCryptos(column));
  };
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pageNumbers.push(i);
    } else if (i === page - 2 || i === page + 2) {
      pageNumbers.push("...");
    }
  }
  
  // Filter duplicate ellipses
  const filteredPageNumbers = pageNumbers.filter(
    (number, index, array) =>
      !(number === "..." && array[index + 1] === "...")
  );
  
  return (
    <section className="px-4 pb-12">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="min-w-max">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th 
                    className="sticky left-0 z-10 bg-white dark:bg-gray-800 table-shadow-right px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    # Name
                  </th>
                  <th 
                    className="px-6 py-3 text-right cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Price
                  </th>
                  <th 
                    className="px-6 py-3 text-right cursor-pointer"
                    onClick={() => handleSort("percent_change_1h")}
                  >
                    1h %
                  </th>
                  <th 
                    className="px-6 py-3 text-right cursor-pointer"
                    onClick={() => handleSort("percent_change_24h")}
                  >
                    24h %
                  </th>
                  <th 
                    className="px-6 py-3 text-right cursor-pointer"
                    onClick={() => handleSort("percent_change_7d")}
                  >
                    7d %
                  </th>
                  {displayFilters.marketCap && (
                    <th 
                      className="px-6 py-3 text-right cursor-pointer"
                      onClick={() => handleSort("market_cap")}
                    >
                      Market Cap
                    </th>
                  )}
                  {displayFilters.volume && (
                    <th 
                      className="px-6 py-3 text-right cursor-pointer"
                      onClick={() => handleSort("volume_24h")}
                    >
                      Volume (24h)
                    </th>
                  )}
                  {displayFilters.supply && (
                    <th 
                      className="px-6 py-3 text-right cursor-pointer"
                      onClick={() => handleSort("circulating_supply")}
                    >
                      Circulating Supply
                    </th>
                  )}
                  {displayFilters.priceGraph && (
                    <th className="px-6 py-3 text-right">7d Chart</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedCryptos.map((crypto, index) => (
                  <tr key={crypto.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm">
                    <td className="sticky left-0 z-10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 table-shadow-right whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 mr-2">
                          {(page - 1) * itemsPerPage + index + 1}
                        </span>
                        <CryptoLogo symbol={crypto.symbol} className="w-6 h-6 rounded-full mr-2" />
                        <div>
                          <span className="font-medium">{crypto.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-1">{crypto.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium">
                      {formatPrice(crypto.price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={crypto.percent_change_1h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
                        {crypto.percent_change_1h >= 0 ? "+" : ""}{crypto.percent_change_1h}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={crypto.percent_change_24h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
                        {crypto.percent_change_24h >= 0 ? "+" : ""}{crypto.percent_change_24h}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={crypto.percent_change_7d >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
                        {crypto.percent_change_7d >= 0 ? "+" : ""}{crypto.percent_change_7d}%
                      </span>
                    </td>
                    {displayFilters.marketCap && (
                      <td className="px-6 py-4 text-right font-mono">
                        {formatNumber(crypto.market_cap)}
                      </td>
                    )}
                    {displayFilters.volume && (
                      <td className="px-6 py-4 text-right font-mono">
                        {formatNumber(crypto.volume_24h)}
                      </td>
                    )}
                    {displayFilters.supply && (
                      <td className="px-6 py-4 text-right whitespace-nowrap font-mono">
                        <span>{formatNumber(crypto.circulating_supply, 1)} {crypto.symbol}</span>
                      </td>
                    )}
                    {displayFilters.priceGraph && (
                      <td className="px-6 py-4">
                        <SparklineChart 
                          data={crypto.price_chart} 
                          width={120} 
                          height={40} 
                          isPositive={crypto.percent_change_7d >= 0} 
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, cryptos.length)} out of {cryptos.length} cryptocurrencies
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md",
                page > 1 
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed"
              )}
              onClick={() => page > 1 && handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            
            {filteredPageNumbers.map((pageNum, index) => (
              <button 
                key={index}
                onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md",
                  pageNum === page 
                    ? "bg-primary text-white" 
                    : pageNum === "..." 
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                )}
              >
                {pageNum}
              </button>
            ))}
            
            <button 
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md",
                page < totalPages 
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed"
              )}
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
