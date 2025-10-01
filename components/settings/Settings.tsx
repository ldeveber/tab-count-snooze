import { SiGithub } from "@icons-pack/react-simple-icons";
import { Settings2Icon } from "lucide-react";
import { ModeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import pkg from "@/package.json";

export function Settings() {
  return (
    <Sheet>
      <SheetTrigger className="absolute top-3 right-3 inline-flex size-7 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-input/50 font-medium text-sm shadow-xs outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-accent/50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
        <Settings2Icon className="size-4" />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle className="text-2xl">Settings</SheetTitle>
          <SheetDescription>
            Tab Count Snooze version {pkg?.version ?? "unknown"}
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Theme Mode</Label>
            <ModeToggle />
          </div>
          <p>More settings coming soon.</p>
          <div className="flex items-center justify-center gap-4">
            <Button disabled type="submit">
              Save
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </div>
        </div>
        <SheetFooter>
          <p className="text-center text-muted-foreground text-xs">
            Tab Count Snooze was inspired by{" "}
            <Link
              href="https://chromewebstore.google.com/detail/tab-manager-plus-for-chro/cnkdjjdmfiffagllbiiilooaoofcoeff"
              target="_blank"
              rel="noopener"
            >
              Tab Manager Plus
            </Link>{" "}
            <Link
              variant="muted"
              href="https://github.com/stefanXO/Tab-Manager-Plus"
              target="_blank"
              rel="noopener"
            >
              <SiGithub className="inline" />
            </Link>{" "}
            and{" "}
            <Link
              href="https://chromewebstore.google.com/detail/cnkdjjdmfiffagllbiiilooaoofcoeff"
              target="_blank"
              rel="noopener"
            >
              Tab Snooze
            </Link>{" "}
            <Link
              variant="muted"
              href="https://github.com/csandapp/tab-snooze-extension-continued"
              target="_blank"
              rel="noopener"
            >
              <SiGithub className="inline-block" />
            </Link>
            .
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
