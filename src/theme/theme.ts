import { teal } from "@mui/material/colors";
import { ComponentsPropsList, CssVarsThemeOptions } from "@mui/material/styles";

export const defaultProps: {
  [P in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[P]>;
} = {
  MuiStack: {
    useFlexGap: true,
  },
};

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
