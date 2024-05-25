import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RenderOptions, render } from "@testing-library/react";
import React from "react";
import WindowsTabProvider from "src/contexts/WindowsTabContext";
import "src/initializeCharts";

const AllTheProviders: RenderOptions["wrapper"] = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme();
  return (
    <WindowsTabProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </WindowsTabProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
