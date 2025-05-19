import { CssBaseline } from "@mui/material";
import DefaultPropsProvider from "@mui/material/DefaultPropsProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { defaultProps, themeOptions } from "./theme";

const theme = createTheme(themeOptions);

export function ThemePropsProvider({ children }: PropsWithChildren) {
  return <DefaultPropsProvider value={defaultProps}>{children}</DefaultPropsProvider>;
}

export default function ThemeWrapLoader({ children }: PropsWithChildren) {
  return (
    <ThemePropsProvider>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemePropsProvider>
  );
}
