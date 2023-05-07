import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UserState from "./store/state/UserState";
import StockState from "./store/state/StockState";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <UserState>
      <StockState>
        <App />
      </StockState>
    </UserState>
  </StrictMode>
);
