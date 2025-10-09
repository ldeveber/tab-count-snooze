import { useEffect, useRef } from "react";
import { browser } from "#imports";
import { useDataDispatch } from ".";
import type { DataOutboundMessage } from "./messages";

const RECONNECT_DELAY_MS = 500;
type BrowserPort = ReturnType<typeof browser.runtime.connect>;

export default function DataHandler() {
  const dispatch = useDataDispatch();
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let isActive = true;
    let port: BrowserPort | null = null;

    const clearReconnectTimer = () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };

    const handleMessage = (message: DataOutboundMessage) => {
      if (message.type === "init") {
        dispatch({ type: "setWindows", wins: message.payload.windows });
        dispatch({
          type: "setTabGroups",
          tabGroups: message.payload.tabGroups,
        });
        dispatch({ type: "setTabs", tabs: message.payload.tabs });
        return;
      }

      if (message.type === "action") {
        dispatch(message.action);
      }
    };

    const connect = () => {
      if (!isActive) {
        return;
      }

      try {
        port = browser.runtime.connect({ name: "data" });
      } catch (err) {
        console.error("Error connecting to background store", err);
        timerRef.current = window.setTimeout(connect, RECONNECT_DELAY_MS);
        return;
      }

      port.onMessage.addListener(handleMessage);
      port.onDisconnect.addListener(() => {
        const runtimeError = browser.runtime.lastError;
        if (runtimeError) {
          const expectedDisconnect =
            runtimeError.message ===
            "Could not establish connection. Receiving end does not exist.";
          if (!expectedDisconnect) {
            console.warn("Data port disconnected", runtimeError);
          }
        }

        port?.onMessage.removeListener(handleMessage);
        port = null;

        if (isActive) {
          timerRef.current = window.setTimeout(connect, RECONNECT_DELAY_MS);
        }
      });

      try {
        port.postMessage({ type: "requestInit" });
      } catch (err) {
        console.error("Error requesting initial data from store", err);
      }
    };

    connect();

    return () => {
      isActive = false;
      clearReconnectTimer();

      if (port) {
        port.onMessage.removeListener(handleMessage);
        try {
          port.disconnect();
        } catch (err) {
          console.error("Error disconnecting from background store", err);
        }
      }
    };
  }, [dispatch]);

  return null;
}
