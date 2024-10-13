import { createRoot } from "react-dom/client";
import AppWrap from "./AppWrap";
import Options from "./components/options/Options";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(
    <AppWrap>
      <Options />
    </AppWrap>,
  );
}

init();
