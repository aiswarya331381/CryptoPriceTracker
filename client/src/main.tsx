import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./lib/theme-provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="crypto-theme">
      <App />
    </ThemeProvider>
  </Provider>
);
