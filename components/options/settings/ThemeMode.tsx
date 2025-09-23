import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ColorOptions, Mode } from "@/utils/options";

export default function ThemeMode({
  themeMode,
  setOptions,
}: {
  themeMode: Mode;
  setOptions: Dispatch<SetStateAction<ColorOptions>>;
}) {
  const handleChange = (_e: ChangeEvent<HTMLInputElement>, value: string) => {
    setOptions((prev) => ({
      ...prev,
      themeMode: value as ColorOptions["themeMode"],
    }));
  };

  return (
    <FormControl>
      <FormLabel id="preferred-theme-group-label">Preferred Theme</FormLabel>
      <RadioGroup
        row
        aria-labelledby="preferred-theme-group-label"
        name="themeMode"
        value={themeMode}
        onChange={handleChange}
      >
        <FormControlLabel value="system" control={<Radio />} label="System" />
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
      </RadioGroup>
    </FormControl>
  );
}
