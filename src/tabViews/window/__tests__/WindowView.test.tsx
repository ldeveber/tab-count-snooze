import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/vitest";
import { mockTab, mockTabGroup, mockWindow } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import WindowView from "../WindowView";

describe("Window View", () => {
  test("should not render if winodw has no id", () => {
    const win = mockWindow();
    win.tabs = [mockTab()];
    win.id = undefined;
    const tabGroups: chrome.tabGroups.TabGroup[] = [];
    const { container } = render(<WindowView window={win} tabGroups={tabGroups} />);

    expect(container).toBeEmptyDOMElement();
  });

  test("should not render if window has no tabs", () => {
    const win: chrome.windows.Window = mockWindow({}, false);
    const tabGroups: chrome.tabGroups.TabGroup[] = [];
    const { container } = render(<WindowView window={win} tabGroups={tabGroups} />);

    expect(container).toBeEmptyDOMElement();
  });

  test("should render regular window", () => {
    const win: chrome.windows.Window = mockWindow({}, false);

    const title = faker.commerce.productName();
    const url = faker.internet.url();
    const tab = mockTab({
      windowId: win.id,
      title,
      url,
    });

    win.tabs = win.tabs || [];
    win.tabs.push(tab);
    const tabGroups: chrome.tabGroups.TabGroup[] = [];

    const { getByRole } = render(<WindowView window={win} tabGroups={tabGroups} />);

    expect(getByRole("list")).toBeVisible();
    expect(getByRole("button", { name: `${title} ${url}` })).toBeVisible();
  });

  test("should render window with multiple tabs", () => {
    const win: chrome.windows.Window = mockWindow({}, false);

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

    win.tabs = win.tabs || [];
    win.tabs.push(tab1);
    win.tabs.push(tab2);
    const tabGroups: chrome.tabGroups.TabGroup[] = [];

    const { getByRole, getAllByRole } = render(<WindowView window={win} tabGroups={tabGroups} />);

    expect(getByRole("button", { name: "2 Tabs" })).toBeVisible();
    expect(getByRole("button", { name: `${title1} ${url1}` })).toBeVisible();
    expect(getByRole("button", { name: `${title2} ${url2}` })).toBeVisible();
    expect(getAllByRole("button")).toHaveLength(3);
  });

  test("should render window with tab group with multiple tabs", () => {
    const win: chrome.windows.Window = mockWindow({}, false);

    const groupTitle = faker.commerce.productName();
    const group = mockTabGroup({ title: groupTitle, windowId: win.id });
    const tabGroups: chrome.tabGroups.TabGroup[] = [group];

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

    win.tabs = win.tabs || [];
    win.tabs.push(tab1);
    win.tabs.push(tab2);
    win.tabs.push(tab3);

    const { getAllByRole, getByRole } = render(<WindowView window={win} tabGroups={tabGroups} />);

    expect(getByRole("button", { name: "3 Tabs" })).toBeVisible();

    expect(getByRole("button", { name: `${title1} ${url1}` })).toBeVisible();
    expect(getByRole("button", { name: `${groupTitle}` })).toBeVisible();

    expect(getByRole("button", { name: `${title2} ${url2}` })).toBeVisible();
    expect(getByRole("button", { name: `${title3} ${url3}` })).toBeVisible();

    expect(getAllByRole("button")).toHaveLength(5);
  });
});
