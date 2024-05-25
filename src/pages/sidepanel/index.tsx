import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "pages/sidepanel/App";
import { createRoot } from "react-dom/client";
import "src/initializeCharts";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/sidepanel");

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);
  root.render(<App />);
}

init();
