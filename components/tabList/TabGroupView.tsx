import { cva } from "class-variance-authority";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import TabView from "./TabView";

const listVariants = cva("border-l-4", {
  variants: {
    color: {
      grey: "border-l-gray-500",
      blue: "border-l-blue-500",
      red: "border-l-red-500",
      yellow: "border-l-yellow-500",
      green: "border-l-green-500",
      pink: "border-l-pink-500",
      purple: "border-l-purple-500",
      cyan: "border-l-cyan-500",
      orange: "border-l-orange-500",
    },
  },
  defaultVariants: {
    color: "grey",
  },
});

const pillVariants = cva("rounded-full px-3 py-1 font-medium text-xs", {
  variants: {
    color: {
      grey: "bg-gray-500 text-white",
      blue: "bg-blue-500 text-white",
      red: "bg-red-500 text-white",
      yellow: "bg-yellow-500 text-white",
      green: "bg-green-500 text-white",
      pink: "bg-pink-500 text-white",
      purple: "bg-purple-500 text-white",
      cyan: "bg-cyan-500 text-white",
      orange: "bg-orange-500 text-white",
    },
  },
  defaultVariants: {
    color: "grey",
  },
});

export default function TabGroupView({
  group,
  tabs,
}: {
  readonly group: Browser.tabGroups.TabGroup;
  readonly tabs: Browser.tabs.Tab[];
}) {
  const [open, setOpen] = useState(true);

  const handleClick = (o: boolean) => {
    setOpen(o);
  };

  const title = group.title ?? `Tab Group (${tabs.length})`;
  const panelId = `group-panel-${group.id}`;

  if (tabs.length === 0) {
    return null;
  }

  return (
    <li
      id={`group-${group.id}`}
      data-group={group.id}
      className={cn(listVariants({ color: group.color }))}
    >
      <Collapsible
        open={open}
        onOpenChange={handleClick}
        className="flex flex-col justify-center"
      >
        <CollapsibleTrigger
          className="group/trigger m-1 flex items-center justify-between gap-2 rounded-sm px-3 py-1 font-medium text-sm hover:bg-accent/40 focus-visible:outline focus-visible:outline-primary-800 active:bg-primary-200"
          aria-controls={panelId}
          aria-label={`Show or hide tabs in group: ${title}`}
        >
          <span className="flex items-center gap-2">
            <span className={cn(pillVariants({ color: group.color }))}>
              {title}
            </span>
            <span className="text-muted-foreground text-xs">
              {tabs.length} tabs
            </span>
          </span>
          <ChevronUpIcon className="size-3 stroke-2 transition-all duration-450 ease-in-out group-aria-[expanded=false]/trigger:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul
            className="flex flex-col divide-y divide-border/60 pb-1"
            aria-label={`Tab group: ${title}`}
          >
            {tabs.map((tab) => (
              <TabView key={tab.id} indented tab={tab} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
