import { type Theme, useTheme } from "@/components/ThemeProvider";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ThemeMode() {
  const { theme, setTheme } = useTheme();

  const onValueChange = (value: Theme) => {
    setTheme(value);
  };

  return (
    <FieldSet>
      <FieldLabel>Theme Mode</FieldLabel>
      <FieldDescription>Select your preferred theme mode.</FieldDescription>
      <RadioGroup value={theme} onValueChange={onValueChange}>
        <Field orientation="horizontal">
          <RadioGroupItem value="light" id="theme-light" />
          <FieldLabel htmlFor="theme-light" className="font-normal">
            Light
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="dark" id="theme-dark" />
          <FieldLabel htmlFor="theme-dark" className="font-normal">
            Dark
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="system" id="theme-system" />
          <FieldLabel htmlFor="theme-system" className="font-normal">
            System
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}
