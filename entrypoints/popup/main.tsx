import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import AppWrap from "@/components/AppWrap";
import TabCountSnooze, { Loading } from "@/components/TabCountSnooze";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrap>
      <Suspense fallback={<Loading />}>
        <TabCountSnooze />
      </Suspense>
    </AppWrap>
  </React.StrictMode>,
);
