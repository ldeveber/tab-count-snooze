import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import ThemeOptions from "../ThemeOptions";

describe("Theme Options", () => {
  test("should render defaults", () => {
    const { getByRole, queryByRole } = render(<ThemeOptions />);

    expect(getByRole("radiogroup", { name: "Preferred Theme" })).toBeVisible();
    expect(getByRole("radio", { name: "System" })).toBeChecked();
    expect(getByRole("radio", { name: "Light" })).not.toBeChecked();
    expect(getByRole("radio", { name: "Dark" })).not.toBeChecked();

    expect(getByRole("checkbox", { name: "Enable custom primary color" })).not.toBeChecked();
    expect(queryByRole("group", { name: "Color selection" })).not.toBeInTheDocument();
  });

  test("should call to update synced settings", async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<ThemeOptions />);

    await user.click(getByRole("radio", { name: "Dark" }));
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      themeMode: "dark",
    });

    await user.click(getByRole("checkbox", { name: "Enable custom primary color" }));
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      hue: "pink",
      isCustomTheme: true,
    });

    await user.click(getByRole("button", { name: "light green" }));
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      hue: "lightGreen",
      isCustomTheme: true,
    });

    await user.click(getByRole("checkbox", { name: "Enable custom primary color" }));
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      isCustomTheme: false,
    });
    expect(chrome.storage.sync.remove).toHaveBeenCalledWith(["hue"]);
  });
});
