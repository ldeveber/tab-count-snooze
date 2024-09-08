import MuiListItem, { type ListItemProps as MuiListItemProps } from "@mui/material/ListItem";
import MuiListItemButton, {
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";

export const StyledListItem = styled(MuiListItem)(({ theme }) => ({
  "&.MuiListItem-root": {
    borderTop: `1px solid ${theme.palette.divider}`,
    gap: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadius * 2,
    gap: theme.spacing(2),
    // padding: theme.spacing(0.5, 1.5),
  },
}));

export interface ListItemProps extends MuiListItemProps {
  primaryActionTitle?: MuiListItemButtonProps["title"];
  onPrimaryAction?: MuiListItemButtonProps["onClick"];
  selected?: MuiListItemButtonProps["selected"];
  "button-aria-label"?: MuiListItemButtonProps["aria-label"];
}
export default forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  {
    children,
    primaryActionTitle,
    onPrimaryAction,
    selected,
    "button-aria-label": buttonAriaLabel,
    ...props
  },
  ref,
) {
  return (
    <StyledListItem ref={ref} {...props}>
      <ListItemButton
        selected={selected}
        onClick={onPrimaryAction}
        title={primaryActionTitle}
        aria-label={buttonAriaLabel}
      >
        {children}
      </ListItemButton>
    </StyledListItem>
  );
});
