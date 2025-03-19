import React from "react";
import ReactDOM from "react-dom/client";
import { addLocale, PrimeReactProvider } from "primereact/api";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ locale: "es" }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
