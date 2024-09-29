import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useSelectedTabIds } from "src/contexts";
import { closeTabs } from "src/utils/chrome";
import TooltipButton from "./TooltipButton";

export default function CloseAction({ disabled }: { disabled: boolean }) {
  const selected = useSelectedTabIds();

  const onClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    void closeTabs(selected);
  };

  return (
    <TooltipButton tooltip="Close Tabs" disabled={disabled} onClick={onClose}>
      <DeleteIcon titleAccess={disabled ? "Close Tabs" : undefined} />
    </TooltipButton>
  );
}
