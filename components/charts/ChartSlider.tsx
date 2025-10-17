import { CircleQuestionMarkIcon, Undo2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SliderProps = React.ComponentProps<typeof Slider>;
interface ChartSliderProps
  extends Omit<
    SliderProps,
    "defaultValue" | "onValueChange" | "onValueCommit" | "value"
  > {
  defaultValue: number;
  id: Required<SliderProps>["id"];
  label: string;
  tooltip?: string;
  onValueCommit: (value: number) => void;
}

export function ChartSlider({
  id,
  defaultValue,
  disabled,
  label,
  tooltip,
  onValueCommit,
  ...props
}: ChartSliderProps) {
  const [value, setValue] = useState<number[]>([defaultValue]);
  const [commitValue, setCommitValue] = useState<number>(defaultValue);

  const handleCommit = (value: number[]) => {
    setCommitValue(value[0]);
    onValueCommit(value[0]);
  };
  const handleChange = (value: number[]) => {
    setValue(value);
  };
  const handleReset = () => {
    setValue([defaultValue]);
    setCommitValue(defaultValue);
    onValueCommit(defaultValue);
  };

  return (
    <Field>
      <div className="flex flex-row gap-2">
        <FieldLabel>{label}</FieldLabel>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger aria-label={`Help for ${label}`}>
              <CircleQuestionMarkIcon className="size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {commitValue !== defaultValue && (
          <Button
            disabled={disabled}
            variant="ghost"
            size="icon-xs"
            onClick={handleReset}
            aria-label={`Undo ${label} change`}
          >
            <Undo2Icon className="size-4" />
          </Button>
        )}
      </div>
      <Slider
        {...props}
        id={id}
        disabled={disabled}
        value={value}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
      />
    </Field>
  );
}
