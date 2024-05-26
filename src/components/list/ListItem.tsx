import MuiListItem, { type ListItemProps } from "@mui/material/ListItem";
import MuiListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { ReactNode, forwardRef } from "react";

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
  "&.MuiListItem-root": {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadius * 2,
    gap: theme.spacing(2),
  },
}));

export function Loading({ children }: { children: ReactNode }) {
  return <StyledListItem sx={{ px: 0, gap: 2 }}>{children}</StyledListItem>;
}

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
