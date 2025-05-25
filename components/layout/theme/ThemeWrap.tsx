import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { themeOptions } from "./theme";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const theme = createTheme(themeOptions);

export default function ThemeWrapLoader({ children }: PropsWithChildren) {
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={theme} defaultMode="system">
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
