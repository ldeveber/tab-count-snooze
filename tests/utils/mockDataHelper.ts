import { faker } from "@faker-js/faker";
import type { Browser } from "#imports";

/**
 * Makes a tab with random data.
 *
 * @param props Properties to override
 * @returns chrome.tabs.Tab
 */
export function mockTab(props?: Partial<Browser.tabs.Tab>): Browser.tabs.Tab {
  const id: number = faker.number.int();
  return {
    id,
    windowId: faker.number.int(),
    groupId: faker.number.int(),
    index: faker.number.int(),
    pinned: faker.datatype.boolean(),
    active: faker.datatype.boolean(),
    title: faker.commerce.productName(),
    url:
      faker.internet.url({ appendSlash: true }) + faker.internet.domainWord(),

    // required but not used
    highlighted: faker.datatype.boolean(),
    incognito: faker.datatype.boolean(),
    discarded: faker.datatype.boolean(),
    autoDiscardable: faker.datatype.boolean(),
    frozen: faker.datatype.boolean(),
    // required but deprecated?
    selected: faker.datatype.boolean(),
    // override with data
    ...props,
  };
}

/**
 * Makes a tabGroup with random data.
 *
 * @param props Properties to override
 * @returns chrome.tabGroups.TabGroup
 */
export function mockTabGroup(
  props?: Partial<Browser.tabGroups.TabGroup>,
): Browser.tabGroups.TabGroup {
  const id: number = faker.number.int();
  const group: Browser.tabGroups.TabGroup = {
    id,
    windowId: faker.number.int(),
    collapsed: faker.datatype.boolean(),
    color: faker.helpers.arrayElement([
      "grey",
      "blue",
      "red",
      "yellow",
      "green",
      "pink",
      "purple",
      "cyan",
      "orange",
    ]),
    title: faker.internet.emoji(),
    shared: false,
    ...props,
  };
  return group;
}

/**
 * Makes a window with random data.
 *
 * @param props Properties to override
 * @returns chrome.windows.Window
 */
export function mockWindow(
  props?: Partial<Browser.windows.Window>,
): Browser.windows.Window {
  const id = faker.number.int();
  const win: Browser.windows.Window = {
    id,
    focused: faker.datatype.boolean(),
    state: "normal",
    tabs: [],
    // required but not used
    alwaysOnTop: faker.datatype.boolean(),
    incognito: false,
    ...props,
  };

  return win;
}
