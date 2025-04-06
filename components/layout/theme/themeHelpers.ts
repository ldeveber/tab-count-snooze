import type { Color } from "@mui/material";

/**
 * @deprecated
 */
export enum Hue {
  pink = "pink",
  purple = "purple",
  deepPurple = "deepPurple",
  indigo = "indigo",
  blue = "blue",
  lightBlue = "lightBlue",
  cyan = "cyan",
  teal = "teal",
  green = "green",
  lightGreen = "lightGreen",
  lime = "lime",
  yellow = "yellow",
  amber = "amber",
  orange = "orange",
  deepOrange = "deepOrange",
  red = "red",
}

/**
 * @deprecated
 */
type Shade = keyof Color;
/**
 * @deprecated
 */
export const DEFAULT_SHADE: Shade = 500;
