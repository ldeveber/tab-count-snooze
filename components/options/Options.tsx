import { useAppConfig } from "wxt/utils/app-config";
import { OptFooter } from "./OptFooter";
import { SettingsBody } from "./SettingsBody";

export default function Options() {
  const { version } = useAppConfig();
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div className="fixed top-0 z-50 flex w-full flex-shrink flex-col gap-1.5 bg-background p-4">
        <h2 className="font-semibold text-2xl text-foreground">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Tab Count Snooze version {version}
        </p>
      </div>
      <div className="mt-22 mb-16 flex-grow overflow-y-auto p-4">
        <SettingsBody />
      </div>
      <div className="fixed bottom-0 z-50 flex w-full flex-shrink flex-col gap-2 bg-background p-4">
        <OptFooter />
      </div>
    </div>
  );
}
