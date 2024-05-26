import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { TAB_PROPERTIES } from "src/utils/chrome";
import { mockTab } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import TabView from "../TabView";

const tabMock = (props?: Partial<chrome.tabs.Tab>) => {
  const initProps: Partial<chrome.tabs.Tab> = {
    status: "complete",
    title: "Tab Title",
    url: "https://http.cat/status/418",
  };
  const keys = Object.keys(TAB_PROPERTIES);
  // ensure we start with a clean slate
  keys.forEach((property) => {
    initProps[property as TAB_PROPERTIES] = false;
  });
  return mockTab({ ...initProps, ...props });
};

describe("Tab View", () => {
  test("should not render if tab has no id", () => {
    const tab: chrome.tabs.Tab = tabMock();
    tab.id = undefined;
    const { container } = render(<TabView tab={tab} />);

    expect(container).toBeEmptyDOMElement();
  });

  describe("tab states", () => {
    test("should render regular tab", () => {
      const tab: chrome.tabs.Tab = tabMock({});
      const { getByRole } = render(<TabView tab={tab} />);
      expect(getByRole("button", { name: "Tab Title https://http.cat/status/418" })).toBeVisible();
    });

    test.each([
      [TAB_PROPERTIES.Active],
      [TAB_PROPERTIES.Audible],
      [TAB_PROPERTIES.Discarded],
      [TAB_PROPERTIES.Highlighted],
      [TAB_PROPERTIES.Pinned],
    ])('should render "%s" tab', (propName: TAB_PROPERTIES) => {
      const tab: chrome.tabs.Tab = tabMock({
        [propName]: true,
      });
      const { getByTestId } = render(<TabView tab={tab} />);
      expect(getByTestId(`tab-${propName}-icon`)).toBeVisible();
    });

    test('should render "muted" tab', () => {
      const tab: chrome.tabs.Tab = tabMock({
        audible: true,
        mutedInfo: { muted: true },
      });
      const { getByTestId } = render(<TabView tab={tab} />);
      expect(getByTestId("tab-muted-icon")).toBeVisible();
    });
  });

  describe("actions", () => {
    test("should go to tab on click", async () => {
      const user = userEvent.setup();
      const tab: chrome.tabs.Tab = tabMock();
      const { getByRole } = render(<TabView tab={tab} />);

      expect(getByRole("button", { name: "Tab Title https://http.cat/status/418" })).toBeVisible();
      await user.click(getByRole("button", { name: "Tab Title https://http.cat/status/418" }));

      expect(chrome.tabs.update).toHaveBeenCalledWith(tab.id, { active: true });
      expect(chrome.windows.update).toHaveBeenCalledWith(tab.windowId, { focused: true });
    });
  });
});
