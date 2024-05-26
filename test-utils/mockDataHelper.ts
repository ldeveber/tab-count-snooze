import { faker } from "@faker-js/faker";

/**
 * Makes a tab with random data.
 *
 * @param props Properties to override
 * @returns chrome.tabs.Tab
 */
export function mockTab(props?: Partial<chrome.tabs.Tab>): chrome.tabs.Tab {
  const id: number = faker.number.int();
  return {
    id,
    windowId: faker.number.int(),
    groupId: faker.number.int(),
    index: faker.number.int(),
    pinned: faker.datatype.boolean(),
    active: faker.datatype.boolean(),
    title: faker.helpers.maybe<string | undefined>(() => faker.commerce.productName(), {
      probability: 0.99,
    }),
    url: faker.helpers.maybe<string | undefined>(
      () => faker.internet.url({ appendSlash: true }) + faker.internet.domainWord(),
      {
        probability: 0.99,
      },
    ),

    // required but not used
    highlighted: faker.datatype.boolean(),
    incognito: faker.datatype.boolean(),
    discarded: faker.datatype.boolean(),
    autoDiscardable: faker.datatype.boolean(),
    // required but deprecated?
    selected: faker.datatype.boolean(),
    // override with data
    ...props,
  };
}

export function mockTabList(count: number = 10, tabProps?: Partial<chrome.tabs.Tab>) {
  const tabs: chrome.tabs.Tab[] = [];
  for (let i = 0; i < count; i++) {
    tabs.push(mockTab({ ...tabProps, index: i }));
  }
  return tabs;
}

/**
 * Makes a tabGroup with random data.
 *
 * @param props Properties to override
 * @returns chrome.tabGroups.TabGroup
 */
export function mockTabGroup(
  props?: Partial<chrome.tabGroups.TabGroup>,
): chrome.tabGroups.TabGroup {
  const id: number = faker.number.int();
  const group: chrome.tabGroups.TabGroup = {
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
    title: faker.helpers.maybe<string | undefined>(
      () => {
        return faker.internet.emoji();
      },
      {
        probability: 0.99,
      },
    ),
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
  props?: Partial<chrome.windows.Window>,
  makeTabs: boolean = true,
): chrome.windows.Window {
  const id = faker.number.int();
  const tabs: chrome.tabs.Tab[] = [];
  const win: chrome.windows.Window = {
    id,
    focused: faker.datatype.boolean(),
    state: faker.helpers.maybe<chrome.windows.windowStateEnum | undefined>(
      () =>
        faker.helpers.arrayElement<chrome.windows.windowStateEnum>([
          "normal",
          "minimized",
          // "maximized",
          // "fullscreen",
          // "locked-fullscreen",
        ]),
      { probability: 0.99 },
    ),
    tabs,
    // required but not used
    alwaysOnTop: faker.datatype.boolean(),
    incognito: false,
    ...props,
  };

  if (!makeTabs) {
    return win;
  }

  const numTabs = faker.number.int({ min: 1, max: 50 });
  let i = 0;
  let pinned = true;

  const activeIdx = faker.number.int({ min: 1, max: numTabs });
  do {
    pinned = pinned && !!faker.helpers.maybe<boolean>(() => false, { probability: 0.8 });

    const groupId = faker.number.int();
    faker.helpers.maybe(
      () => {
        const numGroupTabs = faker.number.int({ min: 0, max: numTabs - i });
        for (let j = 0; j < numGroupTabs; j++) {
          tabs.push(
            mockTab({ index: i, id, groupId, pinned, windowId: id, active: activeIdx === i }),
          );
        }
      },
      { probability: 0.1 },
    );

    tabs.push(mockTab({ index: i, id, groupId, pinned, windowId: id, active: activeIdx === i }));
    i++;
  } while (i < numTabs);

  return win;
}

export function mockChromeData({
  wins = 2,
  tabGroups = 3,
}: { wins?: number; tabGroups?: number } = {}) {
  const res = {
    wins: [],
    groups: [],
  };

  for (let i = 0; i < wins; i++) {
    const win = mockWindow({ id: i });
    for (let j = 0; j < tabGroups; j++) {
      const group = mockTabGroup({ id: j, windowId: win.id });
      res.groups.push(group);
      win.tabs.push(mockTab({ groupId: group.id, windowId: win.id }));
    }
    for (let j = 0; j < 10; j++) {
      win.tabs.push(mockTab({ windowId: win.id }));
    }
    res.wins.push(win);
  }

  return res;
}
