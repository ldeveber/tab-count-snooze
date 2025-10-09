// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { browser } from "#imports";
import WindowView from "@/components/tabList/WindowView";
import {
  renderWithContext,
  waitFor,
} from "@/tests/unit/react-testing-library-utils";
import {
  mockTab,
  mockTabGroup,
  mockWindow,
} from "@/tests/utils/mockDataHelper";

describe("Window View", () => {
  test("should not render if winodw does not exist", async () => {
    const win = mockWindow({ id: undefined });
    const { container } = renderWithContext(
      <WindowView id={browser.windows.WINDOW_ID_NONE} win={win} />,
    );
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  test("should not render if window has no tabs", async () => {
    const id = faker.number.int();
    const win = mockWindow({ id });
    const { container } = renderWithContext(<WindowView id={id} win={win} />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  test("should render window with one tab", async () => {
    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const tab = mockTab({ windowId: win.id });

    const winMap = new Map();
    winMap.set(windowId, win);
    const tabMap = new Map();
    tabMap.set(tab.id, tab);

    const { getByRole } = renderWithContext(
      <WindowView id={windowId} win={win} />,
      { windows: { map: winMap }, tabs: { map: tabMap, selectedTabIds: [] } },
    );

    // FIXME: plurals??
    expect(
      getByRole("button", {
        name: `Show or hide 1 tabs in ${win.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: `${win.state} window with 1 tabs` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab.title}` })).toBeVisible();
  });

  test("should render window with multiple tabs", async () => {
    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const tab1 = mockTab({ windowId });
    const tab2 = mockTab({ windowId });

    const winMap = new Map();
    winMap.set(windowId, win);
    const tabMap = new Map();
    tabMap.set(tab1.id, tab1);
    tabMap.set(tab2.id, tab2);

    const { getAllByRole, getByRole } = renderWithContext(
      <WindowView id={windowId} win={win} />,
      { windows: { map: winMap }, tabs: { map: tabMap, selectedTabIds: [] } },
    );

    expect(
      getByRole("button", {
        name: `Show or hide 2 tabs in ${win.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: `${win.state} window with 2 tabs` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getAllByRole("button")).toHaveLength(3);
  });

  test("should render window with tab group with multiple tabs", async () => {
    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const group = mockTabGroup({ windowId: win.id });
    const tab1 = mockTab({ windowId, groupId: -2 });
    const tab2 = mockTab({ windowId, groupId: group.id });
    const tab3 = mockTab({ windowId, groupId: group.id });

    const winMap = new Map();
    winMap.set(windowId, win);
    const tabMap = new Map();
    tabMap.set(tab1.id, tab1);
    tabMap.set(tab2.id, tab2);
    tabMap.set(tab3.id, tab3);
    const tabGroupMap = new Map();
    tabGroupMap.set(group.id, group);

    const { getAllByRole, getByRole } = renderWithContext(
      <WindowView id={windowId} win={win} />,
      {
        windows: { map: winMap },
        tabs: { map: tabMap, selectedTabIds: [] },
        tabGroups: { map: tabGroupMap },
      },
    );

    expect(
      getByRole("button", {
        name: `Show or hide 3 tabs in ${win.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: `${win.state} window with 3 tabs` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(
      getByRole("list", { name: `Tab group: ${group.title}` }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab3.title}` })).toBeVisible();

    expect(getAllByRole("button")).toHaveLength(5);
  });
});
