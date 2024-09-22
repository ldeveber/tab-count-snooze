import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import chromeMock from "test-utils/chromeMock";
import { mockTab, mockTabGroup, mockWindow } from "test-utils/mockDataHelper";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import WindowsTab from "../WindowsTab";

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

    chromeMock.windows.getAll.mockResolvedValue([win1, win2, win3]);
    chromeMock.tabGroups.query.mockResolvedValue([group1]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4, tab5, tab6]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByLabelText, getByRole, getByText } = renderWithContext(<WindowsTab />);

    await waitFor(() => {
      expect(getByLabelText("Search")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");

    expect(getByRole("list", { name: "normal window with 3 tabs" })).toBeVisible();
    expect(getByRole("list", { name: `Tab group: ${group1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab3.title}` })).toBeVisible();

    expect(getByRole("list", { name: "normal window with 2 tabs" })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab4.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab5.title}` })).toBeVisible();

    expect(getByText("Minimized")).toBeVisible();
    expect(getByRole("separator", { name: "Minimized Windows" })).toBeVisible();

    expect(getByRole("list", { name: "minimized window with 1 tabs" })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab6.title}` })).toBeVisible();
  });

  test("should search and select tabs for actions", async () => {
    const user = userEvent.setup();

    const win1 = mockWindow({ id: 1, state: "normal" });
    const group1 = mockTabGroup({ id: 111, windowId: win1.id });
    const tab1 = mockTab({ id: 10, title: "meow 1", windowId: win1.id, groupId: group1.id });
    const tab2 = mockTab({ id: 11, title: "meow 2", windowId: win1.id, groupId: group1.id });
    const tab3 = mockTab({ id: 12, title: "no", windowId: win1.id });

    const win2 = mockWindow({ id: 2, state: "normal" });
    const tab4 = mockTab({ id: 21, windowId: win2.id });
    const tab5 = mockTab({ id: 22, windowId: win2.id });

    const win3 = mockWindow({ id: 3, state: "minimized" });
    const tab6 = mockTab({ id: 31, title: "meow 3", windowId: win3.id });

    chromeMock.windows.getAll.mockResolvedValue([win1, win2, win3]);
    chromeMock.tabGroups.query.mockResolvedValue([group1]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4, tab5, tab6]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByLabelText, getByRole, getByText } = renderWithContext(<WindowsTab />);

    await waitFor(() => {
      expect(getByLabelText("Search")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByText("6 Tabs across 3 Windows")).toBeVisible();

    expect(getByRole("list", { name: "normal window with 3 tabs" })).toBeVisible();
    expect(getByRole("list", { name: `Tab group: ${group1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab3.title}` })).toBeVisible();

    expect(getByRole("list", { name: "normal window with 2 tabs" })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab4.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab5.title}` })).toBeVisible();

    expect(getByText("Minimized")).toBeVisible();
    expect(getByRole("separator", { name: "Minimized Windows" })).toBeVisible();

    expect(getByRole("list", { name: "minimized window with 1 tabs" })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab6.title}` })).toBeVisible();

    await user.type(getByRole("textbox", { name: "Search" }), "meow");

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("meow");
    expect(getByRole("button", { name: "Group Tabs" })).toBeEnabled();
    expect(getByRole("button", { name: "Close Tabs" })).toBeEnabled();

    expect(getByRole("list", { name: "normal window with 2 tabs, filtered" })).toBeVisible();
    expect(getByRole("list", { name: `Tab group: ${group1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();

    expect(getByText("Minimized")).toBeVisible();
    expect(getByRole("separator", { name: "Minimized Windows" })).toBeVisible();

    expect(getByRole("list", { name: "minimized window with 1 tabs, filtered" })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab6.title}` })).toBeVisible();
  });
});
