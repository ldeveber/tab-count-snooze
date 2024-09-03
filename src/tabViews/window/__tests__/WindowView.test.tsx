import { faker } from "@faker-js/faker";
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

    const title = faker.commerce.productName();
    const url = faker.internet.url();
    const tab = mockTab({
      windowId: win.id,
      title,
      url,
    });

    chromeMock.windows.getAll.mockResolvedValue([win]);
    chromeMock.tabs.query.mockResolvedValue([tab]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByRole } = renderWithContext(<WindowView windowId={win.id} />);
    await waitFor(() => {
      expect(getByRole("list")).toBeVisible();
    });
    expect(getByRole("button", { name: `${title} ${url}` })).toBeVisible();
  });

  test("should render window with multiple tabs", async () => {
    const win: chrome.windows.Window = mockWindow({});

    const title1 = faker.commerce.productName();
    const url1 = faker.internet.url();
    const tab1 = mockTab({
      windowId: win.id,
      title: title1,
      url: url1,
    });

    const title2 = faker.commerce.productName();
    const url2 = faker.internet.url();
    const tab2 = mockTab({
      windowId: win.id,
      title: title2,
      url: url2,
    });

    chromeMock.windows.getAll.mockResolvedValue([win]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByRole, getAllByRole } = renderWithContext(<WindowView windowId={win.id} />);

    await waitFor(() => {
      expect(getByRole("button", { name: "2 Tabs" })).toBeVisible();
    });
    expect(getByRole("button", { name: `${title1} ${url1}` })).toBeVisible();
    expect(getByRole("button", { name: `${title2} ${url2}` })).toBeVisible();
    expect(getAllByRole("button")).toHaveLength(3);
  });

  test("should render window with tab group with multiple tabs", async () => {
    const win: chrome.windows.Window = mockWindow({});

    const groupTitle = faker.commerce.productName();
    const group = mockTabGroup({ title: groupTitle, windowId: win.id });

    const title1 = faker.commerce.productName();
    const url1 = faker.internet.url();
    const tab1 = mockTab({
      title: title1,
      url: url1,
      windowId: win.id,
      groupId: -2,
    });

    const title2 = faker.commerce.productName();
    const url2 = faker.internet.url();
    const tab2 = mockTab({
      title: title2,
      url: url2,
      windowId: win.id,
      groupId: group.id,
    });

    const title3 = faker.commerce.productName();
    const url3 = faker.internet.url();
    const tab3 = mockTab({
      title: title3,
      url: url3,
      windowId: win.id,
      groupId: group.id,
    });

    chromeMock.windows.getAll.mockResolvedValue([win]);
    chromeMock.tabGroups.query.mockResolvedValue([group]);
    chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3]);
    vi.stubGlobal("chrome", chromeMock);

    const { getAllByRole, getByRole } = renderWithContext(<WindowView windowId={win.id} />);

    await waitFor(() => {
      expect(getByRole("button", { name: "3 Tabs" })).toBeVisible();
    });

    expect(getByRole("button", { name: `${title1} ${url1}` })).toBeVisible();
    expect(getByRole("button", { name: `${groupTitle}` })).toBeVisible();

    expect(getByRole("button", { name: `${title2} ${url2}` })).toBeVisible();
    expect(getByRole("button", { name: `${title3} ${url3}` })).toBeVisible();

    expect(getAllByRole("button")).toHaveLength(5);
  });
});
