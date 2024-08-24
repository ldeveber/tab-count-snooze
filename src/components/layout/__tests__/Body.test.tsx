import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { origRender as render, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import Body from "../Body";

describe("Tab List Header", () => {
  test("should render Tab tab", async () => {
    const { getByRole } = render(<Body />);

    await waitFor(() => {
      expect(getByRole("tablist")).toBeVisible();
    });

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Tab");
    expect(getByRole("tabpanel", { name: "Tab" })).toBeVisible();
  });

  test("should render Count tab", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Body />);

    expect(getByRole("tablist")).toBeVisible();

    await user.click(getByRole("tab", { name: "Count" }));

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Count");
    expect(getByRole("tabpanel", { name: "Count" })).toBeVisible();
  });

  test("should render Snooze tab", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Body />);

    expect(getByRole("tablist")).toBeVisible();

    await user.click(getByRole("tab", { name: "Snooze" }));

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Snooze");
    expect(getByRole("tabpanel", { name: "Snooze" })).toBeVisible();
  });
});
