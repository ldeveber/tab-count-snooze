import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { HTMLAttributes, SyntheticEvent, useMemo, useState } from "react";
import { useFiltersDispatch } from "src/contexts/ChartsTabContext";
import { TAB_PROPERTIES } from "src/utils/chrome";
import TabPropertyIcon, { getTabPropertyLabel } from "../window/TabPropertyIcon";

type MenuOptionsType = {
  readonly label: string;
  readonly value: TAB_PROPERTIES;
};

export default function SectionBy({ tabs }: { readonly tabs: chrome.tabs.Tab[] }) {
  const dispatchFilters = useFiltersDispatch();
  const [selected, setSelected] = useState<MenuOptionsType[]>([]);

  const handleChange = (_: SyntheticEvent, values: MenuOptionsType[]) => {
    setSelected(values);
    dispatchFilters({ type: "update", filters: values.map(({ value }) => value) });
  };

  const divideOptions: MenuOptionsType[] = useMemo(
    () => [
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Active, tabs),
        value: TAB_PROPERTIES.Active,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Audible, tabs),
        value: TAB_PROPERTIES.Audible,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Muted, tabs),
        value: TAB_PROPERTIES.Muted,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Discarded, tabs),
        value: TAB_PROPERTIES.Discarded,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Highlighted, tabs),
        value: TAB_PROPERTIES.Highlighted,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Pinned, tabs),
        value: TAB_PROPERTIES.Pinned,
      },
    ],
    [],
  );

  return (
    <Autocomplete<MenuOptionsType, true>
      multiple
      autoHighlight
      disableCloseOnSelect
      limitTags={2}
      size="small"
      id="section-by"
      options={divideOptions}
      value={selected}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Section results by"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
      renderOption={(
        { key, ...props }: HTMLAttributes<HTMLLIElement> & { key: string },
        { label, value },
      ) => (
        <Box key={key} component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          <TabPropertyIcon property={value} fontSize="inherit" sx={{ marginRight: 1 }} />
          {label}
        </Box>
      )}
      sx={{ width: 300 }}
    />
  );
}
