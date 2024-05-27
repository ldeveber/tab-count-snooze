import MuiListItem, { type ListItemProps } from "@mui/material/ListItem";
import MuiListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";

export const StyledListItem = styled(MuiListItem)(({ theme }) => ({
  "&.MuiListItem-root": {
    borderTop: `1px solid ${theme.palette.divider}`,
    gap: theme.spacing(2),
  },
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadius * 2,
    gap: theme.spacing(2),
  },
}));

export default forwardRef<
  HTMLLIElement,
  {
    children: ListItemButtonProps["children"];
    primaryActionTitle?: ListItemButtonProps["title"];
    onPrimaryAction?: ListItemButtonProps["onClick"];
    secondaryAction?: ListItemProps["secondaryAction"];
    selected?: ListItemButtonProps["selected"];
  }
>(function ListItem(
  { children, primaryActionTitle, onPrimaryAction, secondaryAction, selected },
  ref,
) {
  return (
    <StyledListItem ref={ref} secondaryAction={secondaryAction} sx={{ px: 0 }}>
      <ListItemButton selected={selected} onClick={onPrimaryAction} title={primaryActionTitle}>
        {children}
      </ListItemButton>
    </StyledListItem>
  );
});
