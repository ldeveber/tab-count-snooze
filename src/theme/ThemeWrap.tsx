import CssBaseline from "@mui/material/CssBaseline";
import DefaultPropsProvider from "@mui/material/DefaultPropsProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { defaultProps, themeOptions } from "./theme";

const theme = createTheme(themeOptions);

export default function ThemeWrapLoader({ children }: PropsWithChildren) {
  return (
    <DefaultPropsProvider value={defaultProps}>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DefaultPropsProvider>
  );
}
