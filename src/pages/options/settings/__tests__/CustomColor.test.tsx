import "@testing-library/jest-dom/vitest";
import { Hue } from "src/themes";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import CustomColor from "../CustomColor";

describe("Custom Color Options", () => {
  test("should render not custom", () => {
    const { getByRole, queryByRole } = render(
      <CustomColor
        options={{
          themeMode: "light",
          isCustomTheme: false,
          hue: Hue.purple,
        }}
        setOptions={vi.fn()}
      />,
    );

    expect(getByRole("checkbox", { name: "Enable custom primary color" })).not.toBeChecked();
    expect(queryByRole("group", { name: "Color selection" })).not.toBeInTheDocument();
  });

  test("should render custom", () => {
    const { getByRole } = render(
      <CustomColor
        options={{
          themeMode: "light",
          isCustomTheme: true,
          hue: Hue.purple,
        }}
        setOptions={vi.fn()}
      />,
    );

    expect(getByRole("checkbox", { name: "Enable custom primary color" })).toBeChecked();
    expect(getByRole("group", { name: "Color selection" })).toBeVisible();
  });
});
