import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { mockWindowList } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import WindowsHeader from "../WindowsHeader";

describe("Windows Header", () => {
  test("should not blow up with no windows or tabs", () => {
    const { getByRole, getByText } = render(
      <WindowsHeader windows={[]} tabCount={0} windowCount={0} />,
    );

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
    expect(getByText("0 Tabs")).toBeVisible();
  });

  test("should render header", () => {
    const wins = mockWindowList();
    const { getByRole, getByText } = render(
      <WindowsHeader windows={wins} tabCount={20} windowCount={wins.length} />,
    );

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
    expect(getByText("20 Tabs across 3 Windows")).toBeVisible();
  });

  test("should handle search", async () => {
    const user = userEvent.setup();
    const wins = mockWindowList();
    const { getByRole, getByText } = render(
      <WindowsHeader windows={wins} tabCount={20} windowCount={wins.length} />,
    );

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
    expect(getByText("20 Tabs across 3 Windows")).toBeVisible();

    await user.type(getByRole("textbox", { name: "Search" }), "meow");

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("meow");
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
    expect(getByRole("button", { name: "Group Tabs" })).toBeEnabled();
    expect(getByRole("button", { name: "Close Tabs" })).toBeEnabled();
  });
});
