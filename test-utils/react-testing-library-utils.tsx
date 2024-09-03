import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { type RenderOptions, render } from "@testing-library/react";
import React, { type PropsWithChildren } from "react";
import DataProviderProvider from "src/contexts/DataProvider";
import FilterProvider from "src/contexts/FilterProvider";
import DataHandler from "src/DataHandler";
import "src/initializeCharts";

function ThemeWrapper({ children }: PropsWithChildren) {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function DataProvider({ children }: PropsWithChildren) {
  return (
    <DataProviderProvider>
      <DataHandler />
      {children}
    </DataProviderProvider>
  );
}

function AllTheProviders({ children }: PropsWithChildren) {
  return (
    <ThemeWrapper>
      <DataProvider>
        <FilterProvider>{children}</FilterProvider>
      </DataProvider>
    </ThemeWrapper>
  );
}

const renderWithContext = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const renderWithTheme = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: ThemeWrapper, ...options });

export * from "@testing-library/react";
export { render as origRender, renderWithTheme as render, renderWithContext };
