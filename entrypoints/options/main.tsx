import React from "react";
import ReactDOM from "react-dom/client";
import AppOptions from "@/components/AppOptions";

// biome-ignore lint/style/noNonNullAssertion: it exists
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppOptions />
  </React.StrictMode>,
);
