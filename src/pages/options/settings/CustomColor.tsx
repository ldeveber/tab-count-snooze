import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grow from "@mui/material/Grow";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Hue } from "src/themes";
import { ColorOptions } from "src/utils/options";
import ColorSwatches from "./ColorSwatches";

export default function CustomColor({
  options,
  setOptions,
}: {
  options: ColorOptions;
  setOptions: Dispatch<SetStateAction<ColorOptions>>;
}) {
  const handleCheckboxChange = (_e: ChangeEvent<HTMLInputElement>, value: boolean) => {
    setOptions((prev) => ({ ...prev, isCustomTheme: value }));
  };

  const handleColorSwatchChange = (hue: Hue) => {
    setOptions((prev) => ({ ...prev, hue }));
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={options.isCustomTheme} onChange={handleCheckboxChange} />}
          label="Enable custom primary color"
        />

        <Grow in={options.isCustomTheme}>
          <Box>
            <ColorSwatches
              disabled={!options.isCustomTheme}
              hue={options.hue}
              setHue={handleColorSwatchChange}
            />
          </Box>
        </Grow>
      </FormGroup>
    </Box>
  );
}
