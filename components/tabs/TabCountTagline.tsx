import { useTabCount, useWindowCount } from "@/utils/dataStore";

export default function TabCountTagline() {
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  let title = `${tabCount} Tab${tabCount === 1 ? "" : "s"}`;
  if (windowCount > 1) {
    title += ` across ${windowCount} Windows`;
  }

  return <p>{title}</p>;
}
