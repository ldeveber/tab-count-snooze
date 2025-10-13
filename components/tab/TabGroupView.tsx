import { cva } from "class-variance-authority";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import type { Browser } from "#imports";
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
      grey: "border-l-gray-300",
      blue: "border-l-blue-300",
      red: "border-l-red-300",
      yellow: "border-l-yellow-300",
      green: "border-l-green-300",
      pink: "border-l-pink-300",
      purple: "border-l-purple-300",
      cyan: "border-l-cyan-300",
      orange: "border-l-orange-300",
    },
  },
  defaultVariants: {
    color: "grey",
  },
});

const pillVariants = cva(
  "flex-shrink overflow-hidden text-ellipsis text-nowrap rounded-full px-3 py-1 font-medium text-neutral-900 text-sm",
  {
    variants: {
      color: {
        grey: "bg-gray-300",
        blue: "bg-blue-300",
        red: "bg-red-300",
        yellow: "bg-yellow-300",
        green: "bg-green-300",
        pink: "bg-pink-300",
        purple: "bg-purple-300",
        cyan: "bg-cyan-300",
        orange: "bg-orange-300",
      },
    },
    defaultVariants: {
      color: "grey",
    },
  },
);

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
          className="group/trigger m-1 flex items-center justify-between gap-2 rounded-sm px-3 py-1 font-medium text-sm hover:bg-primary/10 focus-visible:outline focus-visible:outline-primary/80 active:bg-primary/20"
          aria-label={`Show or hide tabs in group: ${title}`}
        >
          <span className="flex w-full items-center gap-2">
            <span className={cn(pillVariants({ color: group.color }))}>
              {title}
            </span>
            <span className="flex-none text-muted-foreground text-xs">
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
