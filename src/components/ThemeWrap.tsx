import CssBaseline from "@mui/material/CssBaseline";
import * as colors from "@mui/material/colors";
import {
  Experimental_CssVarsProvider,
  experimental_extendTheme,
  useColorScheme,
  type CssVarsThemeOptions,
} from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { DEFAULT_SHADE } from "src/themes";
import { ColorOptions, defaultColor } from "src/utils/options";

type Theme = Parameters<typeof Experimental_CssVarsProvider>[0]["theme"];

function ModeSwitcher({ colorOpts }: { colorOpts: ColorOptions }) {
  const { setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMode(colorOpts.themeMode);
  }, [colorOpts.themeMode, setMode]);

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

export default function ThemeWrap({ children }: { children: React.ReactNode }): React.ReactNode {
  const [colorOpts, setColorOpts] = useState<ColorOptions>(defaultColor);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

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

  useEffect(() => {
    if (loading) {
      return;
    }
    const { hue } = colorOpts;

    const t = experimental_extendTheme({
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
    setTheme(t);
  }, [colorOpts, loading]);

  if (!theme) {
    return null;
  }

  return (
    <>
      <Experimental_CssVarsProvider theme={theme} defaultMode={colorOpts.themeMode}>
        <ModeSwitcher colorOpts={colorOpts} />
        <CssBaseline />
        {children}
      </Experimental_CssVarsProvider>
    </>
  );
}