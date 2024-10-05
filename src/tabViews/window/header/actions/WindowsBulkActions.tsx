import Stack from "@mui/material/Stack";
import { useIsFiltered } from "src/contexts";
import CloseAction from "./CloseAction";
import GroupAction from "./GroupAction";

export default function WindowsBulkActions() {
  const isFiltered = useIsFiltered();
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
      <GroupAction disabled={!isFiltered} />
      <CloseAction disabled={!isFiltered} />
    </Stack>
  );
}
