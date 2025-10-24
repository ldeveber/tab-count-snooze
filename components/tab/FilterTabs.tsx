import { CircleXIcon, FilterIcon, FilterXIcon } from "lucide-react";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useDataDispatch } from "@/lib/dataStore";
import { ButtonGroup } from "../ui/button-group";

export function FilterTabs() {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDataDispatch();

  const filterAction = (value: string | undefined) => {
    if (!value) {
      dispatch({ type: "resetFilter" });
      dispatch({ type: "clearSelection" });
    } else {
      dispatch({
        type: "filter",
        dupesOnly: value === "dupesOnly",
        stale: value === "stale",
      });
    }
  };
  const [value, setValue] = React.useState<string | undefined>(undefined);

  const handleChange = (v: string | undefined) => {
    const val = v === value ? undefined : v;
    setValue(val);
    startTransition(() => {
      filterAction(val);
    });
  };

  const handleClear = () => {
    handleChange(value);
  };

  return (
    <ButtonGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            {value ? <FilterXIcon /> : <FilterIcon />}
            {value && (
              <span className="absolute top-1.5 left-5 flex size-2 rounded-full bg-primary" />
            )}
            {value ? "Filtered" : "Filter"} {isPending && <Spinner />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
            <DropdownMenuRadioItem value="dupesOnly">
              Duplicates
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="stale">
              Old & Stale Tabs
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {value && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleClear}
          aria-label="Clear filter"
        >
          <CircleXIcon />
        </Button>
      )}
    </ButtonGroup>
  );
}
