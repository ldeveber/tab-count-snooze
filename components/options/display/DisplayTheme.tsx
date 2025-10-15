import { type Theme, useTheme } from "@/components/ThemeProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function DisplayTheme() {
  const { theme, setTheme } = useTheme();

  const onValueChange = (value: Theme) => {
    setTheme(value);
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Display</CardTitle>
        <CardDescription>Settings related to the display.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldLabel>Theme Mode</FieldLabel>
          <FieldDescription>Select your preferred theme mode.</FieldDescription>
          <RadioGroup
            className="max-w-sm grid-cols-3"
            value={theme}
            onValueChange={onValueChange}
          >
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
      </CardContent>
    </Card>
  );
}
