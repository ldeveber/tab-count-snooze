import { Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import { Hue } from "@/components/layout/theme/themeHelpers";
import { ColorOptions, defaultColor } from "@/utils/options";
import ThemeMode from "./ThemeMode";

const setThemeMode = async (themeMode: ColorOptions["themeMode"]) => {
  await browser.storage.sync.set({ themeMode });
};

const setCustomTheme = async (hue: Hue) => {
  await browser.storage.sync.set({ isCustomTheme: true, hue });
};

const setDefaultTheme = async () => {
  await browser.storage.sync.set({
    isCustomTheme: false,
  });
  await browser.storage.sync.remove(["hue"]);
};

export default function ThemeOptions() {
  const [options, setOptions] = useState<ColorOptions>(defaultColor);

  useEffect(() => {
    void browser.storage.sync.get(defaultColor).then((values) => {
      setOptions(values as ColorOptions);
    });
  }, []);

  useEffect(() => {
    if (options.isCustomTheme) {
      void setCustomTheme(options.hue);
    } else {
      void setDefaultTheme();
    }
  }, [options.isCustomTheme, options.hue]);

  useEffect(() => {
    setThemeMode(options.themeMode);
  }, [options.themeMode]);

  return (
    <Card variant="outlined" className="w-full">
      <CardHeader title="Theme" subheader="Customize look and feel" />
      <CardContent>
        <div className="flex flex-col gap-4">
          <ThemeMode themeMode={options.themeMode} setOptions={setOptions} />
        </div>
      </CardContent>
    </Card>
  );
}
