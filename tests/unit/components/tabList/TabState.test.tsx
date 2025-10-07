// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import TabState from "@/components/tabList/TabState";
import { render } from "@/tests/unit/react-testing-library-utils";
import { mockTab } from "@/tests/utils/mockDataHelper";

function tabMock(props?: Partial<Browser.tabs.Tab>) {
  const initProps: Partial<Browser.tabs.Tab> = {
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

describe("Tab State", () => {
  test.each([
    ["active"],
    ["audible"],
    ["discarded"],
    ["frozen"],
    ["highlighted"],
    ["pinned"],
  ])('should render "%s" tab state', async (propName) => {
    const tab: Browser.tabs.Tab = tabMock({
      [propName]: true,
    });
    const { container } = render(<TabState tab={tab} />);
    expect(container).toMatchSnapshot();
  });

  test('should render "muted" tab state', async () => {
    const tab: Browser.tabs.Tab = tabMock({
      audible: true,
      mutedInfo: { muted: true },
    });
    const { container } = render(<TabState tab={tab} />);
    expect(container).toMatchSnapshot();
  });
});
