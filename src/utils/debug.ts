export function printData({
  windows,
  tabGroups,
  origins,
}: {
  readonly windows: chrome.windows.Window[];
  readonly tabGroups: chrome.tabGroups.TabGroup[];
  readonly origins?: string[];
}): void {
  console.groupCollapsed("Data Summary");

  if (origins) {
    console.groupCollapsed(`Origins (${origins.length})`);
    origins.forEach((o) => {
      console.log(o);
    });
    console.groupEnd();
  }

  console.groupCollapsed(`Windows (${windows.length})`);
  windows.forEach((w) => {
    console.log(w);
  });
  console.groupEnd();

  console.groupCollapsed(`Tab Groups (${tabGroups.length})`);
  tabGroups.forEach((t) => {
    console.log(t);
  });
  console.groupEnd();

  console.groupEnd();
}
