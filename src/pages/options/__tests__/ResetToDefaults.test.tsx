import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import ResetToDefaults from "../ResetToDefaults";

describe("Reset to Defaults", () => {
  test("should render defaults", () => {
    const { getByRole } = render(<ResetToDefaults />);

    expect(getByRole("button", { name: "Reset to Defaults" })).toBeEnabled();
  });

  test("should call to update synced settings", async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<ResetToDefaults />);

    await user.click(getByRole("button", { name: "Reset to Defaults" }));
    expect(chrome.storage.sync.clear).toHaveBeenCalledWith();
  });
});
