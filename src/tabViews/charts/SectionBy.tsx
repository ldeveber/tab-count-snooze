import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { HTMLAttributes, SyntheticEvent, useMemo, useState } from "react";
import { useAllTabs, useFilterDispatch } from "src/contexts/dataSelectors";
import { TAB_PROPERTIES } from "src/utils/chrome";
import { FILTER_TAB_PROPERTIES } from "src/utils/filterTabs";
import TabPropertyIcon, { getTabPropertyLabel } from "../window/TabPropertyIcon";

type MenuOptionsType = {
  readonly label: string;
  readonly value: FILTER_TAB_PROPERTIES;
  readonly property: TAB_PROPERTIES;
};

export default function SectionBy() {
  const allTabs = useAllTabs();
  const dispatchFilters = useFilterDispatch();
  const [selected, setSelected] = useState<MenuOptionsType[]>([]);

  const handleChange = (_: SyntheticEvent, values: MenuOptionsType[]) => {
    setSelected(values);
    dispatchFilters({ type: "filter", properties: values.map(({ value }) => value) });
  };

  const divideOptions: MenuOptionsType[] = useMemo(
    () => [
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Active, allTabs),
        property: TAB_PROPERTIES.Active,
        value: FILTER_TAB_PROPERTIES.Active,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Audible, allTabs),
        property: TAB_PROPERTIES.Audible,
        value: FILTER_TAB_PROPERTIES.Audible,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Muted, allTabs),
        property: TAB_PROPERTIES.Muted,
        value: FILTER_TAB_PROPERTIES.Muted,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Discarded, allTabs),
        property: TAB_PROPERTIES.Discarded,
        value: FILTER_TAB_PROPERTIES.Discarded,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Highlighted, allTabs),
        property: TAB_PROPERTIES.Highlighted,
        value: FILTER_TAB_PROPERTIES.Highlighted,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Pinned, allTabs),
        property: TAB_PROPERTIES.Pinned,
        value: FILTER_TAB_PROPERTIES.Pinned,
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
        { label, property },
      ) => (
        <Box key={key} component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          <TabPropertyIcon property={property} fontSize="inherit" sx={{ marginRight: 1 }} />
          {label}
        </Box>
      )}
      sx={{ width: 300 }}
    />
  );
}
