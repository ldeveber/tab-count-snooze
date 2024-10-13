import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { useDataDispatch } from "src/contexts";
import { TAB_PROPERTIES } from "src/utils/chrome";
import { mockTab } from "test-utils/mockDataHelper";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import TabView from "../TabView";

const tabMock = (props?: Partial<chrome.tabs.Tab>) => {
  const initProps: Partial<chrome.tabs.Tab> = {
    status: "complete",
    title: "Meow Teapot",
    url: "https://http.cat/status/418",
  };
  const keys = Object.keys(TAB_PROPERTIES);
  // ensure we start with a clean slate
  keys.forEach((property) => {
    initProps[property as TAB_PROPERTIES] = false;
  });
  return mockTab({ ...initProps, ...props });
};

function TestWrap({ search, tab }: { search?: string; tab: chrome.tabs.Tab }) {
  const dispatch = useDataDispatch();

  useEffect(() => {
    if (search) {
      dispatch({ type: "search", search });
    }
  }, []);

  return <TabView tab={tab} />;
}

describe("Tab View", () => {
  test("should not render if tab has no id", async () => {
    const tab: chrome.tabs.Tab = tabMock();
    tab.id = undefined;
    const { container } = renderWithContext(<TabView tab={tab} />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("tab states", () => {
    test("should render regular tab", async () => {
      const tab: chrome.tabs.Tab = tabMock({});
      const { getByText, getByRole, queryByLabelText } = renderWithContext(<TabView tab={tab} />);

      await waitFor(() => {
        expect(getByText(tab.title)).toBeVisible();
      });

      expect(getByRole("listitem", { name: `Tab: ${tab.title}` })).toBeVisible();
      expect(getByRole("button", { name: `Jump to tab: ${tab.title}` })).toBeEnabled();
      expect(queryByLabelText(`Select tab: ${tab.title}`)).not.toBeInTheDocument();
    });

    test("should render tab being filtered", async () => {
      const tab: chrome.tabs.Tab = tabMock({});
      const { getByText, getByRole, getByLabelText } = renderWithContext(
        <TestWrap tab={tab} search="meow" />,
      );

      await waitFor(() => {
        expect(getByText(tab.title)).toBeVisible();
      });

      expect(getByRole("listitem", { name: `Tab: ${tab.title}` })).toBeVisible();
      expect(getByRole("button", { name: `Jump to tab: ${tab.title}` })).toBeEnabled();
      expect(getByLabelText(`Select tab: ${tab.title}`)).toBeEnabled();
    });

    test.each([
      [TAB_PROPERTIES.Active],
      [TAB_PROPERTIES.Audible],
      [TAB_PROPERTIES.Discarded],
      [TAB_PROPERTIES.Highlighted],
      [TAB_PROPERTIES.Pinned],
    ])('should render "%s" tab', async (propName: TAB_PROPERTIES) => {
      const tab: chrome.tabs.Tab = tabMock({
        [propName]: true,
      });
      const { getByText, getByTestId } = renderWithContext(<TabView tab={tab} />);

      await waitFor(() => {
        expect(getByText(tab.title)).toBeVisible();
      });

      expect(getByTestId(`tab-${propName}-icon`)).toBeVisible();
    });

    test('should render "muted" tab', async () => {
      const tab: chrome.tabs.Tab = tabMock({
        audible: true,
        mutedInfo: { muted: true },
      });
      const { getByText, getByTestId } = renderWithContext(<TabView tab={tab} />);

      await waitFor(() => {
        expect(getByText(tab.title)).toBeVisible();
      });

      expect(getByTestId("tab-muted-icon")).toBeVisible();
    });
  });

  describe("actions", () => {
    test("should go to tab on click", async () => {
      const user = userEvent.setup();
      const tab: chrome.tabs.Tab = tabMock();
      const { getByText, getByRole } = renderWithContext(<TabView tab={tab} />);

      await waitFor(() => {
        expect(getByText(tab.title)).toBeVisible();
      });

      await user.click(getByRole("button", { name: `Jump to tab: ${tab.title}` }));

      expect(chrome.tabs.update).toHaveBeenCalledWith(tab.id, { active: true });
      expect(chrome.windows.update).toHaveBeenCalledWith(tab.windowId, { focused: true });
    });
  });
});
