export type Mode = "light" | "dark" | "system";
import { Hue } from "src/themes";

export interface ColorOptions {
  themeMode: Mode;
  isCustomTheme: boolean;
  hue: Hue;
}
export const defaultColor: ColorOptions = {
  themeMode: "system",
  isCustomTheme: false,
  hue: Hue.pink,
};

export interface SnoozedTabOptions {}
export const defaultSnoozedOptions: SnoozedTabOptions = {};

export enum SORT_OPTION {
  Default = "default",
  LastAccessed = "lastAccessed",
}
