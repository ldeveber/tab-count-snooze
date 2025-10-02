// @vitest-environment happy-dom

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import WindowsTab from "@/components/tabs/WindowsTab";
import { closeTabsAction, groupTabsAction } from "@/lib/browser/actions";
import { renderWithContext } from "@/tests/unit/react-testing-library-utils";
import {
  mockTab,
  mockTabGroup,
  mockWindow,
} from "@/tests/utils/mockDataHelper";

vi.mock("@/lib/browser/actions");

describe("Windows Tab", () => {
  test("should render initial tab content", async () => {
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

    const { getByRole } = renderWithContext(<WindowsTab />, {
      windows: { map: winMap },
      tabs: { map: tabMap, selectedTabIds: [] },
      tabGroups: { map: tabGroupMap },
    });

    expect(getByRole("searchbox", { name: "Search Tabs" })).toHaveValue("");
    // TODO FIXME: not visible in tests...?
    // expect(
    //   getByRole("paragraph", { name: "6 tabs across 3 windows" }),
    // ).toBeVisible();

    expect(
      getByRole("button", {
        name: `Show or hide 3 tabs in ${win1.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: "normal window with 3 tabs" }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: `Tab group: ${group1.title}` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab3.title}` })).toBeVisible();

    expect(
      getByRole("list", { name: "normal window with 2 tabs" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab4.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab5.title}` })).toBeVisible();

    expect(
      getByRole("list", { name: "minimized window with 1 tabs" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab6.title}` })).toBeVisible();
  });

  test("should handle search", async () => {
    const user = userEvent.setup();

    const win1 = mockWindow({ id: 1, state: "normal" });
    const group1 = mockTabGroup({ id: 111, windowId: win1.id });
    const tab1 = mockTab({
      id: 10,
      title: "meow 1",
      windowId: win1.id,
      groupId: group1.id,
    });
    const tab2 = mockTab({
      id: 11,
      title: "meow 2",
      windowId: win1.id,
      groupId: group1.id,
    });
    const tab3 = mockTab({ id: 12, title: "no", windowId: win1.id });

    const win2 = mockWindow({ id: 2, state: "normal" });
    const tab4 = mockTab({ id: 21, windowId: win2.id });
    const tab5 = mockTab({ id: 22, windowId: win2.id });

    const win3 = mockWindow({ id: 3, state: "minimized" });
    const tab6 = mockTab({ id: 31, title: "meow 3", windowId: win3.id });

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

    const { findByText, getByRole, getByText, queryByRole } = renderWithContext(
      <WindowsTab />,
      {
        windows: { map: winMap },
        tabs: { map: tabMap, selectedTabIds: [] },
        tabGroups: { map: tabGroupMap },
      },
    );

    expect(getByRole("searchbox", { name: "Search Tabs" })).toHaveValue("");
    expect(
      queryByRole("button", { name: "Group selected tabs" }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole("button", { name: "Close selected tabs" }),
    ).not.toBeInTheDocument();
    expect(getByText("6 Tabs across 3 Windows")).toBeVisible();

    expect(
      getByRole("button", {
        name: `Show or hide 3 tabs in ${win1.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: "normal window with 3 tabs" }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: `Tab group: ${group1.title}` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab3.title}` })).toBeVisible();

    expect(
      getByRole("list", { name: "normal window with 2 tabs" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab4.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab5.title}` })).toBeVisible();

    expect(
      getByRole("list", { name: "minimized window with 1 tabs" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab6.title}` })).toBeVisible();

    await user.type(getByRole("searchbox", { name: "Search Tabs" }), "meow");

    await findByText("3 tab matches");

    expect(getByRole("searchbox", { name: "Search Tabs" })).toHaveValue("meow");
    // TODO FIXME uncomment expect(getByRole("button", { name: "Group selected tabs" })).toBeEnabled();
    // TODO FIXME uncomment expect(getByRole("button", { name: "Close selected tabs" })).toBeEnabled();

    expect(
      getByRole("list", { name: "normal window with 2 tabs, filtered" }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: `Tab group: ${group1.title}` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();

    expect(
      getByRole("list", { name: "minimized window with 1 tabs, filtered" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab6.title}` })).toBeVisible();
  });

  describe("bulk actions", () => {
    test("should enable if there are tabs selected", async () => {
      const user = userEvent.setup();

      const windowId = 1;
      const win = mockWindow({ id: windowId, state: "normal" });
      const tab1 = mockTab({ title: "meow 1", windowId });
      const tab2 = mockTab({ title: "no", url: "no", windowId });
      const tab3 = mockTab({ title: "no", url: "no", windowId });
      const tab4 = mockTab({ title: "no", url: "no", windowId });

      const winMap = new Map();
      winMap.set(win.id, win);
      const tabMap = new Map();
      tabMap.set(tab1.id, tab1);
      tabMap.set(tab2.id, tab2);
      tabMap.set(tab3.id, tab3);
      tabMap.set(tab4.id, tab4);

      const { getByRole } = renderWithContext(<WindowsTab />, {
        windows: { map: winMap },
        tabs: { map: tabMap, selectedTabIds: [] },
      });

      await user.type(getByRole("searchbox", { name: "Search Tabs" }), "meow");

      expect(
        getByRole("button", { name: "Group selected tabs" }),
      ).toBeEnabled();
      expect(
        getByRole("button", { name: "Close selected tabs" }),
      ).toBeEnabled();
    });

    test("should handle Group selected tabs", async () => {
      const user = userEvent.setup();

      const windowId = 1;
      const win = mockWindow({ id: windowId, state: "normal" });
      const tab1 = mockTab({ title: "meow 1", windowId });
      const tab2 = mockTab({ title: "meow 2", windowId });
      const tab3 = mockTab({ title: "no", url: "no", windowId });
      const tab4 = mockTab({ title: "no", url: "no", windowId });

      const winMap = new Map();
      winMap.set(win.id, win);
      const tabMap = new Map();
      tabMap.set(tab1.id, tab1);
      tabMap.set(tab2.id, tab2);
      tabMap.set(tab3.id, tab3);
      tabMap.set(tab4.id, tab4);

      const { getByRole } = renderWithContext(<WindowsTab />, {
        windows: { map: winMap },
        tabs: { map: tabMap, selectedTabIds: [] },
      });

      await user.type(getByRole("searchbox", { name: "Search Tabs" }), "meow");
      await user.click(getByRole("button", { name: "Group selected tabs" }));

      expect(groupTabsAction).toHaveBeenCalledWith([tab1.id, tab2.id], "meow");
    });

    test("should handle Close selected tabs", async () => {
      const user = userEvent.setup();

      const windowId = 1;
      const win = mockWindow({ id: windowId, state: "normal" });
      const tab1 = mockTab({ title: "meow 1", windowId });
      const tab2 = mockTab({ title: "meow 2", windowId });
      const tab3 = mockTab({ title: "no", url: "no", windowId });
      const tab4 = mockTab({ title: "no", url: "no", windowId });

      const winMap = new Map();
      winMap.set(win.id, win);
      const tabMap = new Map();
      tabMap.set(tab1.id, tab1);
      tabMap.set(tab2.id, tab2);
      tabMap.set(tab3.id, tab3);
      tabMap.set(tab4.id, tab4);

      const { getByRole } = renderWithContext(<WindowsTab />, {
        windows: { map: winMap },
        tabs: { map: tabMap, selectedTabIds: [] },
      });

      await user.type(getByRole("searchbox", { name: "Search Tabs" }), "meow");
      await user.click(getByRole("button", { name: "Close selected tabs" }));

      expect(closeTabsAction).toHaveBeenCalledWith([tab1.id, tab2.id]);
    });
  });
});
