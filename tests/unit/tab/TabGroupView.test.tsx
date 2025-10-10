// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import type { Browser } from "#imports";
import TabGroupView from "@/components/tab/TabGroupView";
import {
  renderWithContext,
  waitFor,
} from "@/tests/unit/react-testing-library-utils";
import { mockTab, mockTabGroup } from "@/tests/utils/mockDataHelper";

describe("Tab Group View", () => {
  test("should not render if there are no tabs", async () => {
    const group: Browser.tabGroups.TabGroup = mockTabGroup();
    const { container } = renderWithContext(
      <TabGroupView group={group} tabs={[]} />,
    );
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  test("should render default group name if missing", async () => {
    const group = mockTabGroup({ title: undefined });
    const tab1 = mockTab({ groupId: group.id });
    const tab2 = mockTab({ groupId: group.id });

    const { getByText, getByRole } = renderWithContext(
      <TabGroupView group={group} tabs={[tab1, tab2]} />,
    );

    await waitFor(() => {
      expect(getByText("Tab Group (2)")).toBeVisible();
    });

    expect(
      getByRole("list", { name: "Tab group: Tab Group (2)" }),
    ).toBeVisible();
    expect(
      getByRole("button", {
        name: "Show or hide tabs in group: Tab Group (2)",
      }),
    ).toBeEnabled();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
  });

  test("should group with tabs", async () => {
    const group = mockTabGroup();
    const tab1 = mockTab({ groupId: group.id });
    const tab2 = mockTab({ groupId: group.id });

    const { getByText, getByRole } = renderWithContext(
      <TabGroupView group={group} tabs={[tab1, tab2]} />,
    );

    await waitFor(() => {
      expect(getByText(group.title ?? "")).toBeVisible();
    });

    expect(
      getByRole("list", { name: `Tab group: ${group.title}` }),
    ).toBeVisible();
    expect(
      getByRole("button", {
        name: `Show or hide tabs in group: ${group.title}`,
      }),
    ).toBeEnabled();
    expect(getByRole("listitem", { name: `Tab: ${tab1.title}` })).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab2.title}` })).toBeVisible();
  });
});
