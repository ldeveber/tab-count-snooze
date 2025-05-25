import { Checkbox, FormControlLabel, FormGroup, Grow } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Hue } from "@/components/layout/theme/themeHelpers";
import { ColorOptions } from "@/utils/options";
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
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={options.isCustomTheme} onChange={handleCheckboxChange} />}
        label="Enable custom primary color"
      />

      <Grow in={options.isCustomTheme}>
        <ColorSwatches
          disabled={!options.isCustomTheme}
          hue={options.hue}
          setHue={handleColorSwatchChange}
        />
      </Grow>
    </FormGroup>
  );
}
