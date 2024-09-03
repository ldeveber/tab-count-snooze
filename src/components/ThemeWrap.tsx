import CssBaseline from "@mui/material/CssBaseline";
import * as colors from "@mui/material/colors";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  extendTheme,
  useColorScheme,
  type CssVarsThemeOptions,
} from "@mui/material/styles";
import { PropsWithChildren, useEffect, useState } from "react";
import { DEFAULT_SHADE } from "src/themes";
import { defaultColor, type ColorOptions, type Mode } from "src/utils/options";

function ModeSwitcher({ themeMode }: { themeMode: Mode }) {
  const { setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMode(themeMode);
  }, [themeMode, setMode]);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }
  return null;
}

const components: CssVarsThemeOptions["components"] = {
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 3,
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 3,
        "&.Mui-expanded": {
          minHeight: "auto",
        },
        ".MuiAccordionSummary-content.Mui-expanded": {
          margin: theme.spacing(1.5, 0),
        },
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        // borderRadius: theme.shape.borderRadius * 3,
        padding: theme.spacing(1),
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: () => ({
        borderRadius: 100,
        textTransform: "none",
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 2,
      }),
    },
  },
  MuiStack: {
    defaultProps: {
      useFlexGap: true,
    },
  },
};

export function ThemeWrap({
  colorOpts,
  children,
}: PropsWithChildren<{
  colorOpts: ColorOptions;
}>) {
  const { hue, themeMode } = colorOpts;

  const theme = extendTheme({
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: colors[hue][DEFAULT_SHADE],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: colors[hue][DEFAULT_SHADE],
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
    components,
  });

  return (
    <CssVarsProvider theme={theme} defaultMode={themeMode}>
      <ModeSwitcher themeMode={themeMode} />
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

export default function ThemeWrapLoader({ children }: PropsWithChildren) {
  const [colorOpts, setColorOpts] = useState<ColorOptions>(defaultColor);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    chrome.storage.sync.onChanged.addListener(
      (changes: { [key: string]: chrome.storage.StorageChange }) => {
        const updates: Partial<ColorOptions> = {};
        Object.keys(changes).forEach((key) => {
          if (changes[key].newValue !== undefined) {
            updates[key] = changes[key].newValue;
          } else if (changes[key].newValue !== changes[key].oldValue) {
            updates[key] = defaultColor[key];
          }
        });

        if (Object.keys(updates).length > 0) {
          setColorOpts((prev) => ({ ...prev, ...updates }));
        }
      },
    );
    void chrome.storage.sync.get(defaultColor).then((values) => {
      const items = values as ColorOptions;
      setLoading(false);
      setColorOpts(items);
    });
    return () => {
      chrome.storage.sync.onChanged.removeListener(() => {});
    };
  }, []);

  if (loading) {
    return null;
  }

  return <ThemeWrap colorOpts={colorOpts}>{children}</ThemeWrap>;
}
