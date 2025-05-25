import React from "react";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import AppWrap from "@/components/AppWrap";
import Options, { Loading } from "@/components/options/Options.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrap>
      <Suspense fallback={<Loading />}>
        <Options />
      </Suspense>
    </AppWrap>
  </React.StrictMode>,
);
