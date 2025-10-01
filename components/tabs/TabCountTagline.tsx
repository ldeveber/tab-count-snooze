import { useTabCount, useWindowCount } from "@/utils/dataStore";

export default function TabCountTagline() {
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  let title = `${tabCount} Tab${tabCount === 1 ? "" : "s"}`;
  const shortTitle = `${tabCount}/${windowCount}`;
  if (windowCount > 1) {
    title += ` across ${windowCount} Windows`;
  }

  return (
    <div className="@container/tagline flex flex-grow items-center justify-end gap-4">
      <p className="block @3xs/tagline:hidden" aria-hidden="true">
        {shortTitle}
      </p>
      <p className="@3xs/tagline:block hidden">{title}</p>
    </div>
  );
}
