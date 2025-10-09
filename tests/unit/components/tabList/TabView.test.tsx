// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import type { Browser } from "#imports";
import TabView from "@/components/tabList/TabView";
import { goToTabAction } from "@/lib/browser/actions";
import {
  renderWithContext,
  waitFor,
} from "@/tests/unit/react-testing-library-utils";
import { mockTab } from "@/tests/utils/mockDataHelper";

vi.mock("@/lib/browser/actions");

function tabMock(props?: Partial<Browser.tabs.Tab>) {
  const initProps: Partial<Browser.tabs.Tab> = {
    status: "complete",
    title: "Meow Teapot",
    url: "https://http.cat/status/418",
    // ensure we start with a clean slate
    pinned: false,
    audible: false,
    discarded: false,
    frozen: false,
    active: false,
    highlighted: false,
  };
  return mockTab({ ...initProps, ...props });
}

describe("Tab View", () => {
  test("should not render if tab has no id", async () => {
    const tab: Browser.tabs.Tab = tabMock();
    tab.id = undefined;
    const { container } = renderWithContext(<TabView tab={tab} />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("actions", () => {
    test("should go to tab on click", async () => {
      const title = faker.commerce.productName();
      const user = userEvent.setup();
      const tab: Browser.tabs.Tab = tabMock({ title });
      const { getByText, getByRole } = renderWithContext(<TabView tab={tab} />);

      await waitFor(() => {
        expect(getByText(title)).toBeVisible();
      });

      await user.click(
        getByRole("button", { name: `Jump to tab: ${tab.title}` }),
      );

      expect(goToTabAction).toHaveBeenCalledWith(tab.id, tab.windowId);
    });
  });
});
