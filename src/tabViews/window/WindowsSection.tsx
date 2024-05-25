import Grid from "@mui/material/Unstable_Grid2";
import WindowView, { Loading as WindowLoading } from "./WindowView";

export function Loading() {
  return <WindowLoading />;
}

export default function WindowsSection({
  tabGroups,
  windows,
}: {
  readonly tabGroups: chrome.tabGroups.TabGroup[];
  readonly windows: chrome.windows.Window[];
}) {
  if (windows.length === 0) {
    return null;
  }

  return (
    <>
      {windows.map((w) => (
        <Grid xs={1} key={w.id}>
          <WindowView window={w} tabGroups={tabGroups} />
        </Grid>
      ))}
    </>
  );
}
