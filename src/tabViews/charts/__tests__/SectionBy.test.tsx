import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import SectionBy from "../SectionBy";

describe("SectionBy Filter Dropdown", () => {
  test("should basic render", () => {
    const { getByLabelText, getByRole } = render(<SectionBy tabs={[]} />);
    expect(getByLabelText("Section results by")).toBeEnabled();
    expect(getByRole("combobox")).toHaveValue("");
  });

  test("should contain options", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<SectionBy tabs={[]} />);

    expect(getByRole("combobox")).toBeEnabled();
    await user.click(getByRole("combobox"));

    expect(getByRole("listbox")).toBeVisible();
    expect(getByRole("option", { name: "Active Tabs (0)" })).toBeVisible();
    expect(getByRole("option", { name: "Audible Tabs (0)" })).toBeVisible();
    expect(getByRole("option", { name: "Muted Tabs (0)" })).toBeVisible();
    expect(getByRole("option", { name: "Discarded Tabs (0)" })).toBeVisible();
    expect(getByRole("option", { name: "Highlighted Tabs (0)" })).toBeVisible();
    expect(getByRole("option", { name: "Pinned Tabs (0)" })).toBeVisible();
  });
});
