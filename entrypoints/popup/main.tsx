import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App";

// biome-ignore lint/style/noNonNullAssertion: it exists
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
