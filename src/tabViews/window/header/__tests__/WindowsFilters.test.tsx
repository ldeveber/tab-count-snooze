import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import WindowsFilter from "../WindowsFilter";

describe("Windows Filters", () => {
  test("should render a button", () => {
    const { getByRole } = render(<WindowsFilter tabs={[]} />);
    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
  });

  test("should render menu items when opened", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<WindowsFilter tabs={[]} />);

    await user.click(getByRole("button", { name: "Filter by" }));

    expect(getByRole("menu", { name: "Filter by" })).toBeVisible();
    expect(getByRole("menuitem", { name: "Active Tabs (0)" })).toBeVisible();
    expect(getByRole("menuitem", { name: "Audible Tabs (0)" })).toBeVisible();
    expect(getByRole("menuitem", { name: "Muted Tabs (0)" })).toBeVisible();
    expect(getByRole("menuitem", { name: "Discarded Tabs (0)" })).toBeVisible();
    expect(getByRole("menuitem", { name: "Highlighted Tabs (0)" })).toBeVisible();
    expect(getByRole("menuitem", { name: "Pinned Tabs (0)" })).toBeVisible();
  });
});
