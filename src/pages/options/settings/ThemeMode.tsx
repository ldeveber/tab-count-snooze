import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ColorOptions, Mode } from "src/utils/options";

export default function ThemeMode({
  themeMode,
  setOptions,
}: {
  themeMode: Mode;
  setOptions: Dispatch<SetStateAction<ColorOptions>>;
}) {
  const handleChange = (_e: ChangeEvent<HTMLInputElement>, value: string) => {
    setOptions((prev) => ({ ...prev, themeMode: value as ColorOptions["themeMode"] }));
  };

  return (
    <Box>
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
    </Box>
  );
}
