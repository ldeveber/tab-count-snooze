export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
});

let tabCount = 0;
let windowCount = 0;

async function updateBadge() {
  // await browser.action.setTitle({ title: `Tab Count Snooze (${tabCount}/${windowCount})` });
  console.log(`Tab Count Snooze (${tabCount}/${windowCount})`);
}

async function init() {
  const windows = await browser.windows.getAll({ populate: true });

  windowCount = windows.length;
  windows.forEach(({ tabs }) => {
    tabCount += tabs?.length || 0;
  });

  await updateBadge();
}

// tab listeners
// @see https://developer.browser.com/docs/extensions/reference/tabs/

browser.tabs.onCreated.addListener(() => {
  tabCount++;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

browser.tabs.onRemoved.addListener(() => {
  tabCount--;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

// window listeners
// @see https://developer.browser.com/docs/extensions/reference/windows/

browser.windows.onCreated.addListener(() => {
  windowCount++;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

browser.windows.onRemoved.addListener(() => {
  windowCount--;
  updateBadge().catch((e) => {
    console.error("Error updating badge", e);
  });
});

init().catch((e) => {
  console.error("Error initializing Tab Count Snooze :(", e);
});
