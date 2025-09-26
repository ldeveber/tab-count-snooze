import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExpandMoreIcon({
  expanded,
}: {
  readonly expanded: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex transition-transform duration-200",
        expanded && "rotate-180",
      )}
    >
      <ChevronDown className="size-4" />
    </span>
  );
}
