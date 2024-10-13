import "webextension-polyfill";

let tabCount = 0;
let windowCount = 0;

async function updateBadge() {
  await chrome.action.setTitle({ title: `Tab Count Snooze (${tabCount}/${windowCount})` });
}

async function init() {
  const windows = await chrome.windows.getAll({ populate: true });

  windowCount = windows.length;
  windows.forEach(({ tabs }) => {
    tabCount += tabs?.length || 0;
  });

  await updateBadge();
}

// tab listeners
// @see https://developer.chrome.com/docs/extensions/reference/tabs/

chrome.tabs.onCreated.addListener(() => {
  tabCount++;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

chrome.tabs.onRemoved.addListener(() => {
  tabCount--;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

// window listeners
// @see https://developer.chrome.com/docs/extensions/reference/windows/

chrome.windows.onCreated.addListener(() => {
  windowCount++;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

chrome.windows.onRemoved.addListener(() => {
  windowCount--;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

init().catch((e) => {
  console.error("Error initializing Tab Count Snooze :(", e);
});
