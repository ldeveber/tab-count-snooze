import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import AppWrap from "@/components/AppWrap";
import Options, { Loading } from "@/components/options/Options";

// biome-ignore lint/style/noNonNullAssertion: it exists
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrap>
      <Suspense fallback={<Loading />}>
        <Options />
      </Suspense>
    </AppWrap>
  </React.StrictMode>,
);
