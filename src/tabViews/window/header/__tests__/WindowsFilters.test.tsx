import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import WindowsFilter from "../WindowsFilter";

describe("Windows Filters", () => {
  test("should render a button", async () => {
    const { getByLabelText, getByRole } = renderWithContext(<WindowsFilter />);

    await waitFor(() => {
      expect(getByLabelText("Filter by")).toBeVisible();
    });

    expect(getByRole("button", { name: "Filter by" })).toBeVisible();
  });

  test("should render menu items when opened", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole } = renderWithContext(<WindowsFilter />);

    await waitFor(() => {
      expect(getByLabelText("Filter by")).toBeVisible();
    });

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
