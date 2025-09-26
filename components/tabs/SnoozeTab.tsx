import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import StickyTabSubMenuBar, {
  Loading as StickyTabSubMenuBarLoading,
} from "./StickyTabSubMenuBar";
import TabCountTagline from "./TabCountTagline";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBarLoading>
        <div className="flex grow items-center gap-4"></div>
        <div className="flex shrink items-center gap-4">
          <Skeleton className="h-8 w-sm" />
        </div>
      </StickyTabSubMenuBarLoading>
      <div className="flex grow items-center justify-center @4xl/main:px-8">
        <Spinner />
      </div>
    </div>
  );
}

export default function SnoozeTab() {
  return (
    <div className="flex size-full grow flex-col gap-2">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4"></div>
        <div className="flex shrink items-center gap-4">
          <TabCountTagline />
        </div>
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 @4xl/main:px-8 px-4 py-2">
        Snooze Functionality Coming Soon
      </div>
    </div>
  );
}
