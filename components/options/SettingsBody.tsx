import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { DisplayTheme } from "./display/DisplayTheme";
import { TabOptions } from "./TabOptions";

export function SettingsBody() {
  return (
    <FieldGroup>
      <DisplayTheme />
      <FieldSeparator />
      <TabOptions />
      <FieldSeparator />
      <p>More settings coming soon.</p>
    </FieldGroup>
  );
}
