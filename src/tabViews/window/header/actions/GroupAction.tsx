import MergeTypeIcon from "@mui/icons-material/MergeType";
import React from "react";
import { useSearch, useSelectedTabIds } from "src/contexts";
import { groupTabs } from "src/utils/chrome";
import TooltipButton from "./TooltipButton";

export default function GroupAction({ disabled }: { disabled: boolean }) {
  const selected = useSelectedTabIds();
  const search = useSearch();

  const onGroup: React.MouseEventHandler<HTMLButtonElement> = () => {
    void groupTabs(selected as [number, ...number[]], search);
  };

  return (
    <TooltipButton tooltip="Group Tabs" disabled={disabled} onClick={onGroup}>
      <MergeTypeIcon titleAccess={disabled ? "Group Tabs" : undefined} />
    </TooltipButton>
  );
}
