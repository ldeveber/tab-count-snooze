import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  type ChipProps,
  Collapse,
  List,
  ListItemText,
  Chip as MuiChip,
  type ListProps as MuiListProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { type PropsWithChildren, useState } from "react";
import ListItem, { type ListItemProps } from "./ListItem";

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
interface ListItemGroupProps extends MuiListProps {
  readonly indented?: boolean;
  readonly initOpen?: boolean;
  readonly groupColor?: string;
  "button-aria-label"?: ListItemProps["button-aria-label"];
}
export default function ListItemGroup({
  children,
  indented = false,
  initOpen = false,
  title,
  groupColor,
  "button-aria-label": buttonAriaLabel,
  ...props
}: PropsWithChildren<ListItemGroupProps>) {
  const [open, setOpen] = useState(initOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem
        onPrimaryAction={handleClick}
        button-aria-label={buttonAriaLabel}
      >
        <ListItemText
          primary={<Chip label={title} backgroundColor={groupColor} />}
          sx={{ m: 0 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          disablePadding
          dense
          sx={{
            ml: indented ? 1 : undefined,
            borderLeft:
              indented && groupColor ? `2px solid ${groupColor}` : undefined,
          }}
          {...props}
        >
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
