import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import StickyTabSubMenuBar from "../StickyTabSubMenuBar";
import TabCountTagline from "../TabCountTagline";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4"></div>
        <Skeleton className="h-5 w-32 rounded-full" />
      </StickyTabSubMenuBar>
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
        <div className="flex items-center gap-4"></div>
        <TabCountTagline />
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 @4xl/main:px-8 px-4 py-2">
        Snooze Functionality Coming Soon
      </div>
    </div>
  );
}
