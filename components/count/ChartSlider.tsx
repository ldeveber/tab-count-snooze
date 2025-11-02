import { Undo2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;
interface ChartSliderProps
  extends Omit<
    SliderProps,
    "defaultValue" | "onValueChange" | "onValueCommit" | "value"
  > {
  defaultValue: number;
  id: Required<SliderProps>["id"];
  label: string;
  description?: string;
  onValueCommit: (value: number) => void;
}

export function ChartSlider({
  id,
  defaultValue,
  disabled,
  label,
  description,
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
        <FieldTitle>{label}</FieldTitle>
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
      {description && <FieldDescription>{description}</FieldDescription>}
      <Slider
        {...props}
        id={id}
        disabled={disabled}
        value={value}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
        aria-label={`${label} range`}
      />
    </Field>
  );
}
