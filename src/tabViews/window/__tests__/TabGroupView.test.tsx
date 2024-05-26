import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/vitest";
import { mockTab, mockTabGroup } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import TabGroupView from "../TabGroupView";

describe("Tab Group View", () => {
  test("should not render if there are no tabs", () => {
    const group: chrome.tabGroups.TabGroup = mockTabGroup();
    const { container } = render(<TabGroupView group={group} tabs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("should render default group name if missing", () => {
    const group = mockTabGroup({ title: null });
    const { getByRole } = render(<TabGroupView group={group} tabs={[mockTab()]} />);
    expect(getByRole("button", { name: "Tab Group" })).toBeVisible();
  });

  test("should group with tabs", () => {
    const groupTitle = faker.commerce.productName();
    const group = mockTabGroup({ title: groupTitle });

    const title1 = faker.commerce.productName();
    const url1 = faker.internet.url();
    const tab1 = mockTab({
      title: title1,
      url: url1,
    });

    const title2 = faker.commerce.productName();
    const url2 = faker.internet.url();
    const tab2 = mockTab({
      title: title2,
      url: url2,
    });

    const tabs: chrome.tabs.Tab[] = [tab1, tab2];
    const { getByRole } = render(<TabGroupView group={group} tabs={tabs} />);

    expect(getByRole("button", { name: `${groupTitle}` })).toBeVisible();
    expect(getByRole("button", { name: `${title1} ${url1}` })).toBeVisible();
    expect(getByRole("button", { name: `${title2} ${url2}` })).toBeVisible();
  });
});
