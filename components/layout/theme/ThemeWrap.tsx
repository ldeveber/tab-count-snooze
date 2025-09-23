import GlobalStyles from "@mui/material/GlobalStyles";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import { themeOptions } from "./theme";

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
