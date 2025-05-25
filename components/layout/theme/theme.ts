import { teal } from "@mui/material/colors";
import { CssVarsThemeOptions } from "@mui/material/styles";

export const themeOptions: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: teal[500],
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: teal[500],
        },
      },
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};
