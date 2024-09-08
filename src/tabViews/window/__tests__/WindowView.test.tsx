import "@testing-library/jest-dom/vitest";
import chromeMock from "test-utils/chromeMock";
import { mockTab, mockTabGroup, mockWindow } from "test-utils/mockDataHelper";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import WindowView from "../WindowView";

describe("Window View", () => {
  test("should not render if winodw does not exist", async () => {
    const { container } = renderWithContext(<WindowView windowId={1} />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  test("should not render if window has no tabs", async () => {
    const win: chrome.windows.Window = mockWindow({});
    chromeMock.windows.getAll.mockResolvedValue([win]);
    vi.stubGlobal("chrome", chromeMock);

    const { container } = renderWithContext(<WindowView windowId={win.id} />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  test("should render window with one tab", async () => {
    const win: chrome.windows.Window = mockWindow({});
    const tab = mockTab({ windowId: win.id });

    chromeMock.windows.getAll.mockResolvedValue([win]);
    chromeMock.tabs.query.mockResolvedValue([tab]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByRole } = renderWithContext(<WindowView windowId={win.id} />);
    await waitFor(() => {
      expect(getByRole("list")).toBeVisible();
    });
    // FIXME: plurals??
    expect(getByRole("list", { name: `${win.state} window with 1 tabs` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab.title}` })).toBeVisible();
  });

  test("should render window with multiple tabs", async () => {
    const win = mockWindow({});
    const tab1 = mockTab({ windowId: win.id });
    const tab2 = mockTab({ windowId: win.id });

    chromeMock.windows.getAll.mockResolvedValue([win]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByRole, getAllByRole } = renderWithContext(<WindowView windowId={win.id} />);

    await waitFor(() => {
      expect(getByRole("button", { name: "2 Tabs" })).toBeVisible();
    });
    expect(getByRole("list", { name: `${win.state} window with 2 tabs` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getAllByRole("button")).toHaveLength(3);
  });

  test("should render window with tab group with multiple tabs", async () => {
    const win = mockWindow();
    const group = mockTabGroup({ windowId: win.id });
    const tab1 = mockTab({ windowId: win.id, groupId: -2 });
    const tab2 = mockTab({ windowId: win.id, groupId: group.id });
    const tab3 = mockTab({ windowId: win.id, groupId: group.id });

    chromeMock.windows.getAll.mockResolvedValue([win]);
    chromeMock.tabGroups.query.mockResolvedValue([group]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3]);
    vi.stubGlobal("chrome", chromeMock);

    const { getAllByRole, getByRole } = renderWithContext(<WindowView windowId={win.id} />);

    await waitFor(() => {
      expect(getByRole("button", { name: "3 Tabs" })).toBeVisible();
    });

    expect(getByRole("list", { name: `${win.state} window with 3 tabs` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("list", { name: `Tab group: ${group.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab3.title}` })).toBeVisible();

    expect(getAllByRole("button")).toHaveLength(5);
  });
});
