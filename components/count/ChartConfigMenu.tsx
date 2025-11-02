import { SlidersHorizontalIcon } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ChartConfigMenu({ children }: React.PropsWithChildren) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="data-[state=open]:bg-accent/40!"
        >
          <SlidersHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-md">
        {children}
      </PopoverContent>
    </Popover>
  );
}
