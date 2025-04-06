import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
