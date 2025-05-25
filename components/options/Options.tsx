import { AppBar, CircularProgress, Container, Toolbar, Typography } from "@mui/material";
import ResetToDefaults from "./ResetToDefaults";
import ThemeOptions from "./settings/ThemeOptions";

export function Loading() {
  return (
    <div className="flex min-h-300 flex-col">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tab Count Snooze Options
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-2">
        <CircularProgress />
      </div>
    </div>
  );
}

export default function Options() {
  return (
    <div className="flex min-h-300 flex-col">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tab Count Snooze Options
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="flex flex-col items-center gap-4 px-4 py-2">
        <ThemeOptions />
        <ResetToDefaults />
      </Container>
    </div>
  );
}
