import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { ThemeMode } from "./ThemeMode";

export function SettingsBody() {
  return (
    <div className="grid auto-rows-min gap-6">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Display</FieldLegend>
          <FieldDescription>Settings related to the display.</FieldDescription>
          <FieldGroup>
            <ThemeMode />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <p>More settings coming soon.</p>
      {/* <div className="flex items-center justify-center gap-4">
        <Button disabled type="submit">
          Save
        </Button>
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
      </div> */}
    </div>
  );
}
