import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { mockTab } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import TabView from "../TabView";

describe("Tab View", () => {
  test("should not render if tab has no id", () => {
    const tab: chrome.tabs.Tab = mockTab();
    tab.id = undefined;
    const { container } = render(<TabView tab={tab} />);

    expect(container).toBeEmptyDOMElement();
  });

  test("should render regular tab", () => {
    const title = faker.commerce.productName();
    const url = faker.internet.url();
    const tab: chrome.tabs.Tab = mockTab({
      title,
      url,
    });
    const { getByRole } = render(<TabView tab={tab} />);

    expect(getByRole("button", { name: `${title} ${url}` })).toBeVisible();
  });

  test("should render pinned tab", () => {
    const title = faker.commerce.productName();
    const url = faker.internet.url();
    const tab: chrome.tabs.Tab = mockTab({
      title,
      url,
      pinned: true,
    });
    const { getByRole } = render(<TabView tab={tab} />);

    expect(getByRole("button", { name: `${title} ${url}` })).toBeVisible();
  });

  describe("actions", () => {
    test("should go to tab on click", async () => {
      const user = userEvent.setup();
      const title = faker.commerce.productName();
      const url = faker.internet.url();
      const tab: chrome.tabs.Tab = mockTab({
        index: 0,
        windowId: 0,
        title,
        url,
      });
      const { getByRole } = render(<TabView tab={tab} />);

      expect(getByRole("button", { name: `${title} ${url}` })).toBeVisible();
      await user.click(getByRole("button", { name: `${title} ${url}` }));

      expect(chrome.tabs.update).toHaveBeenCalledWith(tab.id, { active: true });
      expect(chrome.windows.update).toHaveBeenCalledWith(tab.windowId, { focused: true });
    });
  });
});
