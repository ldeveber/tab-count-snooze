import "@testing-library/jest-dom/vitest";
import { mockTab, mockTabGroup, mockWindow } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import Windows from "../Windows";

describe("Windows", () => {
  test("should render windows", () => {
    const wins = [
      mockWindow({ id: 1, state: "normal", tabs: [mockTab({ id: 2 }), mockTab({ id: 3 })] }),
      mockWindow({ id: 4, state: "normal", tabs: [mockTab({ id: 5 }), mockTab({ id: 6 })] }),
    ];
    const groups = [mockTabGroup({ id: 11, windowId: 1 }), mockTabGroup({ id: 12, windowId: 1 })];

    const { getByRole, queryByText } = render(
      <Windows windows={wins} tabGroups={groups} tabCount={20} />,
    );

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
    expect(queryByText("Minimized")).not.toBeInTheDocument();
  });

  test("should render windows divided by state", () => {
    const wins = [
      mockWindow({ id: 1, state: "normal", tabs: [mockTab({ id: 2 }), mockTab({ id: 3 })] }),
      mockWindow({ id: 4, state: "normal", tabs: [mockTab({ id: 5 }), mockTab({ id: 6 })] }),
      mockWindow({ id: 7, state: "minimized", tabs: [mockTab({ id: 8 }), mockTab({ id: 9 })] }),
    ];
    const groups = [mockTabGroup({ id: 11, windowId: 1 }), mockTabGroup({ id: 12, windowId: 1 })];

    const { getByRole, getByText } = render(
      <Windows windows={wins} tabGroups={groups} tabCount={20} />,
    );

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
    expect(getByText("Minimized")).toBeVisible();
  });
});
