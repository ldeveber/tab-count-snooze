import type { Browser } from "#imports";
import { useTabHasDupes } from "@/lib/dataStore";

export function DuplicateBadge({ tab }: { readonly tab: Browser.tabs.Tab }) {
  const { hasDupe } = useTabHasDupes(tab);

  if (hasDupe) {
    return (
      <span className="rounded-sm bg-warning px-2 py-0.5 font-semibold text-warning-foreground text-xs uppercase tracking-wide">
        Duplicate
      </span>
    );
  }
  return null;
}
