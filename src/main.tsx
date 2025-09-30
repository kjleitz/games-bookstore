import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import "./index.css";
import { AppProviders } from "./providers/AppProviders";

const rootElement = document.getElementById("root");

if (rootElement == null) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
