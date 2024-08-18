import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { origRender as render, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import Body from "../Body";

describe("Tab List Header", () => {
  test("should render Windows tab", async () => {
    const { getByRole } = render(<Body />);

    await waitFor(() => {
      expect(getByRole("tablist")).toBeVisible();
    });

    expect(getByRole("tab", { name: "Windows" })).toBeVisible();
    expect(getByRole("tab", { name: "Charts" })).toBeVisible();
    expect(getByRole("tab", { name: "Snoozed" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Windows");
    expect(getByRole("tabpanel", { name: "Windows" })).toBeVisible();
  });

  test("should render Charts tab", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Body />);

    expect(getByRole("tablist")).toBeVisible();

    await user.click(getByRole("tab", { name: "Charts" }));

    expect(getByRole("tab", { name: "Windows" })).toBeVisible();
    expect(getByRole("tab", { name: "Charts" })).toBeVisible();
    expect(getByRole("tab", { name: "Snoozed" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Charts");
    expect(getByRole("tabpanel", { name: "Charts" })).toBeVisible();
  });

  test("should render Snoozed tab", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Body />);

    expect(getByRole("tablist")).toBeVisible();

    await user.click(getByRole("tab", { name: "Snoozed" }));

    expect(getByRole("tab", { name: "Windows" })).toBeVisible();
    expect(getByRole("tab", { name: "Charts" })).toBeVisible();
    expect(getByRole("tab", { name: "Snoozed" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Snoozed");
    expect(getByRole("tabpanel", { name: "Snoozed" })).toBeVisible();
  });
});
