// @vitest-environment happy-dom

import { describe, expect, test } from "vitest";
import CountTab from "@/components/count/CountTab";
import { renderWithContext } from "@/tests/unit/react-testing-library-utils";
import {
  mockTab,
  mockTabGroup,
  mockWindow,
} from "@/tests/utils/mockDataHelper";

describe("Count Tab", () => {
  test("should render initial count content", async () => {
    const win1 = mockWindow({ id: 1, state: "normal" });
    const group1 = mockTabGroup({ id: 111, windowId: win1.id });
    const tab1 = mockTab({ id: 10, windowId: win1.id, groupId: group1.id });
    const tab2 = mockTab({ id: 11, windowId: win1.id, groupId: group1.id });
    const tab3 = mockTab({ id: 12, windowId: win1.id });

    const win2 = mockWindow({ id: 2, state: "normal" });
    const tab4 = mockTab({ id: 20, windowId: win2.id });
    const tab5 = mockTab({ id: 21, windowId: win2.id });

    const win3 = mockWindow({ id: 3, state: "minimized" });
    const tab6 = mockTab({ id: 30, windowId: win3.id });

    const winMap = new Map();
    winMap.set(win1.id, win1);
    winMap.set(win2.id, win2);
    winMap.set(win3.id, win3);
    const tabMap = new Map();
    tabMap.set(tab1.id, tab1);
    tabMap.set(tab2.id, tab2);
    tabMap.set(tab3.id, tab3);
    tabMap.set(tab4.id, tab4);
    tabMap.set(tab5.id, tab5);
    tabMap.set(tab6.id, tab6);
    const tabGroupMap = new Map();
    tabGroupMap.set(group1.id, group1);

    const { findByText, getByRole, getByText } = renderWithContext(
      <CountTab />,
      {
        windows: { map: winMap },
        tabs: { map: tabMap },
        tabGroups: { map: tabGroupMap },
      },
    );
    expect(await findByText("6 Tabs across 3 Windows")).toBeVisible();

    expect(getByRole("button", { name: "Chart Selection" })).toBeEnabled();

    expect(getByText("Top Open Sites")).toBeVisible();
    expect(getByText("The places frequented most.")).toBeVisible();
    expect(getByText("Showing top 5 sites in open tabs.")).toBeVisible();

    expect(getByText("Tab Staleness")).toBeVisible();
    expect(
      getByText("Showing tabs grouped by last accessed time."),
    ).toBeVisible();
    expect(getByText("Average age of tab")).toBeVisible();
    expect(getByText(/The average tab was opened/)).toBeVisible();

    expect(getByText("Map of Tabs")).toBeVisible();
    expect(getByText("Showing top 5 open sites in map.")).toBeVisible();
  });
});
