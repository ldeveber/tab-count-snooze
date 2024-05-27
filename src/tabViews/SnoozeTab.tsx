import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const BaseBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

export default function SnoozeTab() {
  return (
    <BaseBox>
      <Stack spacing={2} alignItems="stretch">
        Snooze Functionality Coming Soon
      </Stack>
    </BaseBox>
  );
}
