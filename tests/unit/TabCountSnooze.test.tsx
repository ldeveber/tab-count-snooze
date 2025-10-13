// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import TabCountSnooze from "@/components/TabCountSnooze";
import { renderWithContext } from "@/tests/unit/react-testing-library-utils";
import { mockTab, mockWindow } from "../utils/mockDataHelper";

describe("Tab Count Snooze", () => {
  test("should render Tab tab", async () => {
    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const tab = mockTab({ windowId });

    const winMap = new Map();
    winMap.set(windowId, win);
    const tabMap = new Map();
    tabMap.set(tab.id, tab);

    const { findByRole, getByRole, getByText } = renderWithContext(
      <TabCountSnooze />,
      {
        windows: { map: winMap },
        tabs: { map: tabMap, selectedTabIds: [] },
      },
    );

    expect(await findByRole("tablist")).toBeVisible();

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Tab");
    expect(getByRole("tabpanel", { name: "Tab" })).toBeVisible();

    expect(await findByRole("searchbox")).toBeVisible();
    expect(getByText("1 Tab")).toBeVisible();

    expect(
      getByRole("button", {
        name: `Show or hide 1 tabs in ${win.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: "normal window with 1 tabs" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab.title}` })).toBeVisible();
  });

  test("should render Count tab", async () => {
    const user = userEvent.setup();

    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const tab = mockTab({ windowId });

    const winMap = new Map();
    winMap.set(windowId, win);
    const tabMap = new Map();
    tabMap.set(tab.id, tab);

    const { findByText, getByRole } = renderWithContext(<TabCountSnooze />, {
      windows: { map: winMap },
      tabs: { map: tabMap, selectedTabIds: [] },
    });

    expect(await findByText("1 Tab")).toBeVisible();

    await user.click(getByRole("tab", { name: "Count" }));

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true, name: "Count" })).toBeVisible();
    expect(getByRole("tabpanel", { name: "Count" })).toBeVisible();
  });

  test("should render Snooze tab", async () => {
    const user = userEvent.setup();

    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const tab = mockTab({ windowId });

    const winMap = new Map();
    winMap.set(windowId, win);
    const tabMap = new Map();
    tabMap.set(tab.id, tab);

    const { getByRole } = renderWithContext(<TabCountSnooze />, {
      windows: { map: winMap },
      tabs: { map: tabMap, selectedTabIds: [] },
    });

    expect(getByRole("tablist")).toBeVisible();

    await user.click(getByRole("tab", { name: "Snooze" }));

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Snooze");
    expect(getByRole("tabpanel", { name: "Snooze" })).toBeVisible();
  });
});
