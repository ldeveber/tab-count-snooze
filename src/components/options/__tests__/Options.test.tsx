import "@testing-library/jest-dom/vitest";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import Options from "../Options";

describe("Options", () => {
  test("should render initial view", () => {
    const { getByRole, queryByRole } = render(<Options />);

    expect(getByRole("banner")).toHaveTextContent("Tab Count Snooze Options");

    expect(getByRole("radiogroup", { name: "Preferred Theme" })).toBeVisible();
    expect(getByRole("radio", { name: "System" })).toBeChecked();
    expect(getByRole("radio", { name: "Light" })).not.toBeChecked();
    expect(getByRole("radio", { name: "Dark" })).not.toBeChecked();

    expect(getByRole("checkbox", { name: "Enable custom primary color" })).not.toBeChecked();
    expect(queryByRole("group", { name: "Color selection" })).not.toBeInTheDocument();

    expect(getByRole("button", { name: "Reset to Defaults" })).toBeEnabled();
  });
});
