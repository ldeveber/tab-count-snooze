import { faker } from "@faker-js/faker";
import {
  initialState as initialDataState,
  type State as DataTestState,
} from "src/contexts/DataProvider";

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
export function mockWindow(props?: Partial<chrome.windows.Window>): chrome.windows.Window {
  const id = faker.number.int();
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
    tabs: [],
    // required but not used
    alwaysOnTop: faker.datatype.boolean(),
    incognito: false,
    ...props,
  };

  return win;
}

// const numTabs = faker.number.int({ min: 1, max: 50 });
// let i = 0;
// let pinned = true;

// const activeIdx = faker.number.int({ min: 1, max: numTabs });
// do {
//   pinned = pinned && !!faker.helpers.maybe<boolean>(() => false, { probability: 0.8 });

//   const groupId = faker.number.int();
//   faker.helpers.maybe(
//     () => {
//       const numGroupTabs = faker.number.int({ min: 0, max: numTabs - i });
//       for (let j = 0; j < numGroupTabs; j++) {
//         tabs.push(
//           mockTab({ index: i, id, groupId, pinned, windowId: id, active: activeIdx === i }),
//         );
//       }
//     },
//     { probability: 0.1 },
//   );

//   tabs.push(mockTab({ index: i, id, groupId, pinned, windowId: id, active: activeIdx === i }));
//   i++;
// } while (i < numTabs);

export function mockWindowList(count: number = 3, windowProps?: Partial<chrome.windows.Window>) {
  const wins: chrome.windows.Window[] = [];
  for (let i = 0; i < count; i++) {
    wins.push(mockWindow({ ...windowProps }));
  }
  return wins;
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

export function initMockDataProvider(
  windows: chrome.windows.Window[],
  tabGroups: chrome.tabGroups.TabGroup[],
  tabs: chrome.tabs.Tab[],
  addMockData: boolean = false,
): DataTestState {
  const contextState = {
    ...initialDataState,
    windows: {
      map: new Map<number, chrome.windows.Window>(windows.map((w) => [w.id, w])),
      count: 0,
    },
    tabGroups: {
      map: new Map<number, chrome.tabGroups.TabGroup>(tabGroups.map((w) => [w.id, w])),
      count: 0,
    },
    tabs: { map: new Map<number, chrome.tabs.Tab>(tabs.map((w) => [w.id, w])), count: 0 },
  };

  if (addMockData) {
    const win1 = mockWindow({ id: 1, state: "normal" });
    const group1 = mockTabGroup({ id: 11, windowId: win1.id });
    const group2 = mockTabGroup({ id: 12, windowId: win1.id });
    const tab1 = mockTab({ id: 2, windowId: win1.id, groupId: group1.id });
    const tab2 = mockTab({ id: 3, windowId: win1.id, groupId: group2.id });

    const win2 = mockWindow({ id: 4, state: "normal" });
    const tab3 = mockTab({ id: 5, windowId: win2.id });
    const tab4 = mockTab({ id: 6, windowId: win2.id });

    const win3 = mockWindow({ id: 7, state: "minimized" });
    const tab5 = mockTab({ id: 8, windowId: win3.id });
    const tab6 = mockTab({ id: 9, windowId: win3.id });

    contextState.windows.map.set(win1.id, win1);
    contextState.windows.map.set(win2.id, win2);
    contextState.windows.map.set(win3.id, win3);

    contextState.tabGroups.map.set(group1.id, group1);
    contextState.tabGroups.map.set(group2.id, group2);

    contextState.tabs.map.set(tab1.id, tab1);
    contextState.tabs.map.set(tab2.id, tab2);
    contextState.tabs.map.set(tab3.id, tab3);
    contextState.tabs.map.set(tab4.id, tab4);
    contextState.tabs.map.set(tab5.id, tab5);
    contextState.tabs.map.set(tab6.id, tab6);
  }

  return contextState;
}
