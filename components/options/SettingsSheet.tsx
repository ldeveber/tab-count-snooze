import { Settings2Icon } from "lucide-react";
import { useAppConfig } from "#imports";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OptFooter } from "./OptFooter";
import { ThemeMode } from "./ThemeMode";

export function SettingsSheet() {
  const { version } = useAppConfig();
  return (
    <Sheet>
      <SheetTrigger
        className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        aria-label="Open settings"
      >
        <Settings2Icon className="size-4" />
      </SheetTrigger>
      <SheetContent side="top" className="max-h-screen overflow-hidden">
        <SheetHeader>
          <SheetTitle className="text-2xl">Settings</SheetTitle>
          <SheetDescription>
            Tab Count Snooze version {version}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <div className="grid auto-rows-min gap-6">
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Display</FieldLegend>
                <FieldDescription>
                  Settings related to the display.
                </FieldDescription>
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
        </div>
        <SheetFooter>
          <OptFooter />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
