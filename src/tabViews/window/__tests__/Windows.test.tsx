import "@testing-library/jest-dom/vitest";
import chromeMock from "test-utils/chromeMock";
import { mockTab, mockTabGroup, mockWindow } from "test-utils/mockDataHelper";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import Windows from "../Windows";

describe("Windows", () => {
  test("should render windows", async () => {
    const win1 = mockWindow({ id: 1, state: "normal" });
    const group1 = mockTabGroup({ id: 111, windowId: win1.id });
    const group2 = mockTabGroup({ id: 112, windowId: win1.id });
    const tab1 = mockTab({ id: 10, windowId: win1.id, groupId: group1.id });
    const tab2 = mockTab({ id: 11, windowId: win1.id, groupId: group2.id });

    const win2 = mockWindow({ id: 2, state: "normal" });
    const tab3 = mockTab({ id: 20, windowId: win2.id });
    const tab4 = mockTab({ id: 21, windowId: win2.id });

    chromeMock.windows.getAll.mockResolvedValue([win1, win2]);
    chromeMock.tabGroups.query.mockResolvedValue([group1, group2]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByLabelText, getByRole, queryByText } = renderWithContext(<Windows />);

    await waitFor(() => {
      expect(getByLabelText("Search")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(queryByText("Minimized")).not.toBeInTheDocument();
  });

  test("should render windows divided by state", async () => {
    const win1 = mockWindow({ id: 1, state: "normal" });
    const group1 = mockTabGroup({ id: 111, windowId: win1.id });
    const group2 = mockTabGroup({ id: 112, windowId: win1.id });
    const tab1 = mockTab({ id: 10, windowId: win1.id, groupId: group1.id });
    const tab2 = mockTab({ id: 11, windowId: win1.id, groupId: group2.id });

    const win2 = mockWindow({ id: 2, state: "normal" });
    const tab3 = mockTab({ id: 20, windowId: win2.id });
    const tab4 = mockTab({ id: 21, windowId: win2.id });

    const win3 = mockWindow({ id: 3, state: "minimized" });
    const tab5 = mockTab({ id: 30, windowId: win3.id });
    const tab6 = mockTab({ id: 31, windowId: win3.id });

    chromeMock.windows.getAll.mockResolvedValue([win1, win2, win3]);
    chromeMock.tabGroups.query.mockResolvedValue([group1, group2]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4, tab5, tab6]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByLabelText, getByRole, getByText } = renderWithContext(<Windows />);

    await waitFor(() => {
      expect(getByLabelText("Search")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByText("Minimized")).toBeVisible();
  });
});
