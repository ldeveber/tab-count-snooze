import { ChartAreaIcon } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { storage } from "#imports";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getStorageKey } from "@/lib/storage";

export type Options = {
  topOpenSites: boolean;
  tabStaleness: boolean;
  tabMap: boolean;
};

export const STORAGE_KEY = getStorageKey("displayedCharts");

export const defaultCharts: Options = {
  topOpenSites: true,
  tabStaleness: true,
  tabMap: true,
};

async function getUserValues(): Promise<Options> {
  return storage.getItem<Options>(STORAGE_KEY, {
    fallback: defaultCharts,
  });
}

const LABELS: Record<keyof Options, string> = {
  topOpenSites: "Top Open Sites",
  tabStaleness: "Tab Staleness",
  tabMap: "Map of Tabs",
};

export function ChartsMenu() {
  const [isPending, startTransition] = useTransition();

  const [isLoading, setIsLoading] = useState(true);

  const [values, setValues] = useState(defaultCharts);

  const loadDefaults = useCallback(async () => {
    setIsLoading(true);
    try {
      const v = await getUserValues();
      setValues(v);
    } catch (error) {
      console.error("Failed to load tab options:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDefaults();
  }, [loadDefaults]);

  const handleCheckedChange = (
    name: keyof Options,
    value: string | boolean,
  ) => {
    startTransition(async () => {
      try {
        const payload = { ...values, [name]: value };
        setValues(payload);
        await storage.setItem(STORAGE_KEY, payload);
      } catch (err) {
        console.error("Error saving chosen charts", err);
      }
    });
  };

  const handleReset = () => {
    setValues(defaultCharts);
  };

  const isDefaults = Object.keys(values).every(
    (k) => values[k as keyof Options] === defaultCharts[k as keyof Options],
  );

  const loading = isLoading || isPending;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground data-[state=open]:bg-accent/40!"
        >
          <ChartAreaIcon /> Chart Selection
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-md">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Charts...?</FieldLegend>
            <FieldDescription>
              Choose which charts to display. These values are saved.
            </FieldDescription>
            <FieldGroup className="grid grid-cols-2">
              {Object.keys(values).map((key) => {
                const optKey = key as keyof Options;
                return (
                  <FieldLabel key={key} htmlFor={`${key}-choice`}>
                    <Field orientation="horizontal">
                      <Checkbox
                        name={key}
                        id={`${key}-choice`}
                        disabled={loading}
                        checked={values[optKey]}
                        onCheckedChange={(value) =>
                          handleCheckedChange(optKey, value)
                        }
                      />
                      <FieldContent>
                        <FieldTitle>{LABELS[optKey]}</FieldTitle>
                        <FieldDescription>Description TBD?</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                );
              })}
            </FieldGroup>
          </FieldSet>
          <Button
            disabled={isDefaults || loading}
            type="button"
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            Reset Charts
          </Button>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  );
}
