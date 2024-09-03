import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import { MouseEvent, ReactNode, SyntheticEvent, useMemo, useRef, useState } from "react";
import { useAllTabs } from "src/contexts/DataProvider";
import { useFilterDispatch } from "src/contexts/FilterProvider";
import { TAB_PROPERTIES } from "src/utils/chrome";
import { FILTER_TAB_PROPERTIES } from "src/utils/filterTabs";
import TabPropertyIcon, { getTabPropertyLabel } from "../TabPropertyIcon";

type MenuOptionsType = {
  readonly label: string;
  readonly value: FILTER_TAB_PROPERTIES;
  readonly icon: ReactNode;
};

export default function WindowsFilter() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FILTER_TAB_PROPERTIES[]>(() => []);
  const dispatchFilters = useFilterDispatch();
  const allTabs = useAllTabs();

  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleMenuItemClick = (_e: MouseEvent<HTMLElement>, value: MenuOptionsType["value"]) => {
    let values: FILTER_TAB_PROPERTIES[];
    if (filters.includes(value)) {
      values = filters.filter((f) => f !== value);
    } else {
      values = [...filters, value];
    }
    setFilters(values);
    dispatchFilters({ type: "update", filters: values });
  };

  const filterOptions: MenuOptionsType[] = useMemo(
    () => [
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Active, allTabs),
        value: FILTER_TAB_PROPERTIES.Active,
        icon: <TabPropertyIcon property={TAB_PROPERTIES.Active} sx={{ fontSize: 18 }} />,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Audible, allTabs),
        value: FILTER_TAB_PROPERTIES.Audible,
        icon: <TabPropertyIcon property={TAB_PROPERTIES.Audible} sx={{ fontSize: 18 }} />,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Muted, allTabs),
        value: FILTER_TAB_PROPERTIES.Muted,
        icon: <TabPropertyIcon property={TAB_PROPERTIES.Muted} sx={{ fontSize: 18 }} />,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Discarded, allTabs),
        value: FILTER_TAB_PROPERTIES.Discarded,
        icon: <TabPropertyIcon property={TAB_PROPERTIES.Discarded} sx={{ fontSize: 18 }} />,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Highlighted, allTabs),
        value: FILTER_TAB_PROPERTIES.Highlighted,
        icon: <TabPropertyIcon property={TAB_PROPERTIES.Highlighted} sx={{ fontSize: 18 }} />,
      },
      {
        label: getTabPropertyLabel(TAB_PROPERTIES.Pinned, allTabs),
        value: FILTER_TAB_PROPERTIES.Pinned,
        icon: <TabPropertyIcon property={TAB_PROPERTIES.Pinned} sx={{ fontSize: 18 }} />,
      },
    ],
    [],
  );

  return (
    <>
      <Tooltip title="Filter by">
        <IconButton
          ref={anchorRef}
          id="filter-button"
          size="small"
          aria-controls={open ? "filter-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {filters.length ? (
            <FilterAltIcon fontSize="small" />
          ) : (
            <FilterAltOffIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  dense
                  autoFocusItem={open}
                  id="filter-menu"
                  aria-labelledby="filter-button"
                >
                  {filterOptions.map(({ icon, label, value }) => (
                    <MenuItem
                      key={value}
                      selected={filters.includes(value)}
                      onClick={(event) => handleMenuItemClick(event, value)}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{label}</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
