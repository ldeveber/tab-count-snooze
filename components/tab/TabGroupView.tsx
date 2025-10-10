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
      grey: "border-l-gray-300 dark:border-l-gray-800",
      blue: "border-l-blue-300 dark:border-l-blue-800",
      red: "border-l-red-300 dark:border-l-red-800",
      yellow: "border-l-yellow-300 dark:border-l-yellow-800",
      green: "border-l-green-300 dark:border-l-green-800",
      pink: "border-l-pink-300 dark:border-l-pink-800",
      purple: "border-l-purple-300 dark:border-l-purple-800",
      cyan: "border-l-cyan-300 dark:border-l-cyan-800",
      orange: "border-l-orange-300 dark:border-l-orange-800",
    },
  },
  defaultVariants: {
    color: "grey",
  },
});

const pillVariants = cva(
  "flex-shrink overflow-hidden text-ellipsis text-nowrap rounded-full px-3 py-1 font-medium text-sm",
  {
    variants: {
      color: {
        grey: "bg-gray-300 dark:bg-gray-800",
        blue: "bg-blue-300 dark:bg-blue-800",
        red: "bg-red-300 dark:bg-red-800",
        yellow: "bg-yellow-300 dark:bg-yellow-800",
        green: "bg-green-300 dark:bg-green-800",
        pink: "bg-pink-300 dark:bg-pink-800",
        purple: "bg-purple-300 dark:bg-purple-800",
        cyan: "bg-cyan-300 dark:bg-cyan-800",
        orange: "bg-orange-300 dark:bg-orange-800",
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
