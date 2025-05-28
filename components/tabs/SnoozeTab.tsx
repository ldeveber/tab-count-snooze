import { CircularProgress, Skeleton } from "@mui/material";
import StickyTabSubMenuBar, { Loading as StickyTabSubMenuBarLoading } from "./StickyTabSubMenuBar";
import TabCountTagline from "./TabCountTagline";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBarLoading>
        <div className="flex grow items-center gap-4"></div>
        <div className="flex shrink items-center gap-4">
          <Skeleton sx={{ height: 32, width: { xs: 50, sm: 210 } }} />
        </div>
      </StickyTabSubMenuBarLoading>
      <div className="flex grow items-center justify-center">
        <CircularProgress />
      </div>
    </div>
  );
}

export default function SnoozeTab() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4"></div>
        <div className="flex shrink items-center gap-4">
          <TabCountTagline />
        </div>
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 px-4 py-2">Snooze Functionality Coming Soon</div>
    </div>
  );
}
