import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCryptoData } from "@/data/cryptoData";

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
  max_supply: number | null;
  price_chart: number[];
  last_updated: string;
}

interface CryptoState {
  cryptos: Crypto[];
  sortColumn: string;
  sortDirection: "asc" | "desc";
  selectedInterval: string;
  showFilters: boolean;
  displayFilters: {
    marketCap: boolean;
    volume: boolean;
    supply: boolean;
    priceGraph: boolean;
  };
  filter: {
    cryptoCount: string;
    currency: string;
  };
}

const initialState: CryptoState = {
  cryptos: [],
  sortColumn: "market_cap",
  sortDirection: "desc",
  selectedInterval: "24h",
  showFilters: false,
  displayFilters: {
    marketCap: true,
    volume: true,
    supply: true,
    priceGraph: true,
  },
  filter: {
    cryptoCount: "all",
    currency: "USD",
  },
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    initCryptoData: (state) => {
      state.cryptos = initialCryptoData;
      // Sort initially by market cap
      state.cryptos.sort((a, b) => b.market_cap - a.market_cap);
    },
    
    updatePricesRandomly: (state) => {
      state.cryptos = state.cryptos.map(crypto => {
        // Generate a random percentage change between -0.5% and 0.5%
        const priceChange = (Math.random() - 0.5) * 0.01;
        const newPrice = crypto.price * (1 + priceChange);
        
        // Update the 1h percent change (small random adjustment)
        const hour1Change = crypto.percent_change_1h + (Math.random() - 0.5) * 0.2;
        
        // Only sometimes update the 24h and 7d changes (less frequently)
        const shouldUpdate24h = Math.random() > 0.8;
        const shouldUpdate7d = Math.random() > 0.9;
        
        const hour24Change = shouldUpdate24h 
          ? crypto.percent_change_24h + (Math.random() - 0.5) * 0.3
          : crypto.percent_change_24h;
          
        const day7Change = shouldUpdate7d 
          ? crypto.percent_change_7d + (Math.random() - 0.5) * 0.5
          : crypto.percent_change_7d;
        
        return {
          ...crypto,
          price: newPrice,
          percent_change_1h: parseFloat(hour1Change.toFixed(1)),
          percent_change_24h: parseFloat(hour24Change.toFixed(1)),
          percent_change_7d: parseFloat(day7Change.toFixed(1)),
          last_updated: new Date().toISOString(),
        };
      });
      
      // Re-sort if needed based on current sort settings
      if (state.sortColumn) {
        cryptoSlice.caseReducers.sortCryptos(state, { 
          payload: state.sortColumn, 
          type: 'crypto/sortCryptos' 
        });
      }
    },
    
    sortCryptos: (state, action: PayloadAction<string>) => {
      const column = action.payload;
      
      // If clicking the same column, toggle direction
      if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        // New column, set it and default to descending for most, ascending for name
        state.sortColumn = column;
        state.sortDirection = column === "name" ? "asc" : "desc";
      }
      
      // Sort the cryptos array
      state.cryptos.sort((a, b) => {
        // For numeric columns
        if (column !== "name" && column !== "symbol") {
          const valueA = a[column as keyof Crypto] as number;
          const valueB = b[column as keyof Crypto] as number;
          
          return state.sortDirection === "asc" 
            ? valueA - valueB 
            : valueB - valueA;
        } 
        // For string columns
        else {
          const valueA = a[column as keyof Crypto] as string;
          const valueB = b[column as keyof Crypto] as string;
          
          return state.sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
      });
    },
    
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    
    setFilter: (state, action: PayloadAction<Partial<CryptoState["filter"] & CryptoState["displayFilters"]>>) => {
      // Update filter settings
      if (action.payload.cryptoCount !== undefined) {
        state.filter.cryptoCount = action.payload.cryptoCount;
      }
      
      if (action.payload.currency !== undefined) {
        state.filter.currency = action.payload.currency;
      }
      
      // Update display filters
      if (action.payload.marketCap !== undefined) {
        state.displayFilters.marketCap = action.payload.marketCap;
      }
      
      if (action.payload.volume !== undefined) {
        state.displayFilters.volume = action.payload.volume;
      }
      
      if (action.payload.supply !== undefined) {
        state.displayFilters.supply = action.payload.supply;
      }
      
      if (action.payload.priceGraph !== undefined) {
        state.displayFilters.priceGraph = action.payload.priceGraph;
      }
    },
    
    setTimeInterval: (state, action: PayloadAction<string>) => {
      state.selectedInterval = action.payload;
    },
  },
});

export const { 
  initCryptoData, 
  updatePricesRandomly, 
  sortCryptos, 
  toggleFilters, 
  setFilter,
  setTimeInterval
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
