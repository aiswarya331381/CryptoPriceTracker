import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import MarketOverview from "@/components/MarketOverview";
import CryptoTable from "@/components/CryptoTable";
import { initCryptoData, updatePricesRandomly } from "@/store/cryptoSlice";

export default function Home() {
  const dispatch = useDispatch();

  // Initialize crypto data when component mounts
  useEffect(() => {
    dispatch(initCryptoData());

    // Set up interval for simulated real-time updates
    const interval = setInterval(() => {
      dispatch(updatePricesRandomly());
    }, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <FilterPanel />
      <MarketOverview />
      <CryptoTable />
    </div>
  );
}
