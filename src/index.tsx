import { createRoot } from "react-dom/client";
import "src/initializeCharts";
import AppWrap from "./AppWrap";
import Body from "./components/layout/Body";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(
    <AppWrap>
      <Body />
    </AppWrap>,
  );
}

init();
