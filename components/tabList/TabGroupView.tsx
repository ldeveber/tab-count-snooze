import * as colors from "@mui/material/colors";
import TabView from "./TabView";
import {
  Chip as MuiChip,
  type ChipProps,
  Collapse,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import ExpandMoreIcon from "../ExpandMoreIcon";

export const ListItem = styled(MuiListItem)(({ theme }) => ({
  "&.MuiListItem-root": {
    borderTop: `1px solid ${theme.palette.divider}`,
    flexDirection: "column",
    gap: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    paddingLeft: 0,
  },
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    borderRadius: 8,
    gap: theme.spacing(2),
    marginLeft: theme.spacing(0.5),
  },
}));

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  "&.MuiListItemText-root": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
  },
}));

interface StyledChipProps extends ChipProps {
  backgroundColor?: string;
}
const Chip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<StyledChipProps>(({ theme, backgroundColor }) => {
  const bg = backgroundColor || theme.palette.primary.main;
  return {
    color: theme.palette.getContrastText(bg),
    backgroundColor: bg,
    height: 24,
    minWidth: 24,
  };
});

export default function TabGroupView({
  group,
  tabs,
}: {
  readonly group: Browser.tabGroups.TabGroup;
  readonly tabs: Browser.tabs.Tab[];
}) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  if (tabs.length === 0) {
    return null;
  }

  const title = group.title ?? `Tab Group (${tabs.length})`;
  const groupColor = colors[group.color][500];

  const buttonAriaLabel = `Show/hide tabs in group: ${title}`;

  return (
    <React.Fragment>
      <ListItem
        id={`group-${group.id}`}
        onClick={handleClick}
        button-aria-label={buttonAriaLabel}
        data-group={group.id}
      >
        <ListItemButton
          className="w-full"
          onClick={handleClick}
          aria-label={buttonAriaLabel}
        >
          <ListItemText
            primary={<Chip label={title} backgroundColor={groupColor} />}
            secondary={`${tabs.length} tabs`}
            sx={{ m: 0 }}
          />
          {<ExpandMoreIcon expanded={open} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit className="w-full">
          <List
            disablePadding
            dense
            className="w-full"
            sx={{
              borderLeft: groupColor ? `4px solid ${groupColor}` : undefined,
              marginBottom: -0.5,
            }}
            aria-label={`Tab group: ${title}`}
          >
            {tabs.map((tab) => (
              <TabView key={tab.id} indented tab={tab} />
            ))}
          </List>
        </Collapse>
      </ListItem>
    </React.Fragment>
  );
}
