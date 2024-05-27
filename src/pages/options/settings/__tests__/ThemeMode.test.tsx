import "@testing-library/jest-dom/vitest";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import ThemeMode from "../ThemeMode";

describe("Theme Mode", () => {
  test("should render with system selected", () => {
    const { getByRole } = render(<ThemeMode themeMode="system" setOptions={vi.fn()} />);

    expect(getByRole("radiogroup", { name: "Preferred Theme" })).toBeVisible();
    expect(getByRole("radio", { name: "System" })).toBeChecked();
    expect(getByRole("radio", { name: "Light" })).not.toBeChecked();
    expect(getByRole("radio", { name: "Dark" })).not.toBeChecked();
  });

  test("should render with light selected", () => {
    const { getByRole } = render(<ThemeMode themeMode="light" setOptions={vi.fn()} />);

    expect(getByRole("radiogroup", { name: "Preferred Theme" })).toBeVisible();
    expect(getByRole("radio", { name: "System" })).not.toBeChecked();
    expect(getByRole("radio", { name: "Light" })).toBeChecked();
    expect(getByRole("radio", { name: "Dark" })).not.toBeChecked();
  });

  test("should render with dark selected", () => {
    const { getByRole } = render(<ThemeMode themeMode="dark" setOptions={vi.fn()} />);

    expect(getByRole("radiogroup", { name: "Preferred Theme" })).toBeVisible();
    expect(getByRole("radio", { name: "System" })).not.toBeChecked();
    expect(getByRole("radio", { name: "Light" })).not.toBeChecked();
    expect(getByRole("radio", { name: "Dark" })).toBeChecked();
  });
});
