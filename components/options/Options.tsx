import { AppBar, Box, Container, Stack, Toolbar, Typography } from "@mui/material";
import ResetToDefaults from "./ResetToDefaults";
import ThemeOptions from "./settings/ThemeOptions";

export default function Options() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tab Count Snooze Options
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ maxWidth: 650, py: 3 }}>
        <Stack spacing={3} alignItems="center">
          <ThemeOptions />
          <ResetToDefaults />
        </Stack>
      </Container>
    </Box>
  );
}
