import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Suspense } from "react";
import ResetToDefaults from "./ResetToDefaults";
import ThemeOptions, { ColorLoading } from "./settings/ThemeOptions";

export default function Settings() {
  return (
    <Container sx={{ maxWidth: 650, py: 3 }}>
      <Stack spacing={3} alignItems="center">
        <Suspense fallback={<ColorLoading />}>
          <ThemeOptions />
        </Suspense>
        <ResetToDefaults />
      </Stack>
    </Container>
  );
}
