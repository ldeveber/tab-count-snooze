import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MuiChip, { type ChipProps } from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import React, { PropsWithChildren, useState } from "react";
import ListItem from "./ListItem";

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
    borderRadius: theme.shape.borderRadius,
    height: 24,
    minWidth: 24,
  };
});

export default function ListItemGroup({
  children,
  indented = false,
  initOpen = false,
  title,
  groupColor,
}: PropsWithChildren<{
  readonly indented?: boolean;
  readonly initOpen?: boolean;
  readonly title: ListItemTextProps["primary"];
  readonly groupColor?: string;
}>) {
  const [open, setOpen] = useState(initOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem onPrimaryAction={handleClick}>
        <ListItemText primary={<Chip label={title} backgroundColor={groupColor} />} sx={{ m: 0 }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component={indented ? "div" : "ul"}
          disablePadding
          dense
          sx={{
            ml: indented ? 1 : undefined,
            borderLeft: indented && groupColor ? `2px solid ${groupColor}` : undefined,
          }}
        >
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
