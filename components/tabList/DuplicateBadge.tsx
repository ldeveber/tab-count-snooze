import { CircleQuestionMarkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTabHasDupe } from "@/utils/dataStore";

export function DuplicateBadge({ tab }: { readonly tab: Browser.tabs.Tab }) {
  const { hasDupe, hasFuzzyDupe } = useTabHasDupe(tab);

  if (hasDupe) {
    return (
      <span className="rounded-sm bg-warning px-2 py-0.5 text-warning-foreground text-xs uppercase tracking-wide">
        Duplicate
      </span>
    );
  }
  if (hasFuzzyDupe) {
    return (
      <span className="flex items-center gap-2 rounded-sm bg-warning/10 px-2 py-0.5 text-warning text-xs uppercase tracking-wide">
        Fuzzy Dupe{" "}
        <Tooltip>
          <TooltipTrigger>
            <CircleQuestionMarkIcon className="size-3 text-warning" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <strong>Fuzzy Duplicates</strong> are tabs that match the base of
              the URL, but not the query parameters.
            </p>
          </TooltipContent>
        </Tooltip>
      </span>
    );
  }
  return null;
}
