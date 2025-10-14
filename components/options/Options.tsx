import { useAppConfig } from "wxt/utils/app-config";
import { OptFooter } from "./OptFooter";

export default function Options() {
  const { version } = useAppConfig();
  return (
    <div className="flex h-auto min-h-screen flex-col gap-4 overflow-hidden">
      <div className="flex flex-col gap-1.5 p-4">
        <h2 className="font-semibold text-2xl text-foreground">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Tab Count Snooze version {version}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <h1 className="font-semibold text-lg">Options</h1>
        <p className="text-muted-foreground text-sm">
          Options UI is under construction.
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-2 p-4">
        <OptFooter />
      </div>
    </div>
  );
}
