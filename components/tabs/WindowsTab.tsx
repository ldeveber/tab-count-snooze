import { Divider, Skeleton } from "@mui/material";
import { useMemo } from "react";
import {
  useDataDispatch,
  useIsFiltered,
  useTabCount,
  useWindowCount,
  useWindows,
} from "@/utils/dataStore";
import StickyTabSubMenuBar, { Loading as StickyTabSubMenuBarLoading } from "./StickyTabSubMenuBar";
import WindowsBulkActions from "./WindowsBulkActions";
import TabCountTagline from "./TabCountTagline";
import Search from "../layout/Search";
import WindowList, { Loading as WindowListLoading } from "../tabList/WindowList";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBarLoading>
        <Skeleton sx={{ height: 32, width: { xs: 50, sm: 210 } }} />
      </StickyTabSubMenuBarLoading>
      <div className="flex grow flex-col gap-4 px-4 py-2 @4xl/main:px-8">
        <WindowListLoading />
      </div>
    </div>
  );
}

export default function WindowsTab() {
  const windows = useWindows();
  const windowCount = useWindowCount();
  const tabCount = useTabCount();
  const [search, setSearch] = useState("");
  const dispatch = useDataDispatch();

  const isFiltered = useIsFiltered();

  const onSearchChange = (value: string) => {
    setSearch(value);
    dispatch({ type: "search", search: value });
    if (value === "") {
      dispatch({ type: "clearSelection" });
    }
  };

  const {
    minimized,
    open,
  }: { minimized: Browser.windows.Window[]; open: Browser.windows.Window[] } = useMemo(
    () => ({
      minimized: windows.filter(({ state }) => state === "minimized"),
      open: windows.filter(({ state }) => state === "normal"),
    }),
    [windows],
  );

  if (windowCount === 0 || tabCount === 0) {
    return <Loading />;
  }

  return (
    <div className="flex size-full grow flex-col">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4">
          <Search autoFocus label="Search Tabs" value={search} onChange={onSearchChange} />
        </div>
        <div className="flex shrink items-center gap-4">
          {isFiltered ? <WindowsBulkActions /> : <TabCountTagline />}
        </div>
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 px-4 py-2 @4xl/main:px-8">
        <WindowList windows={open} state="normal" />
        {minimized.length > 0 && <Divider aria-label="Minimized Windows">Minimized</Divider>}
        {minimized.length > 0 && <WindowList windows={minimized} state="minimized" />}
      </div>
    </div>
  );
}
