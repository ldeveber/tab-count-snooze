import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { Hue } from "src/themes";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import ColorSwatches from "../ColorSwatches";

describe("Color Swatches", () => {
  test("should render 16 swatches", () => {
    const { getByRole } = render(<ColorSwatches hue={Hue.purple} setHue={vi.fn()} />);

    expect(getByRole("group", { name: "Color selection" })).toBeVisible();
    expect(getByRole("button", { name: "pink" })).toBeEnabled();
    expect(getByRole("button", { name: "purple" })).toBeEnabled();
    expect(getByRole("button", { name: "deep purple" })).toBeEnabled();
    expect(getByRole("button", { name: "indigo" })).toBeEnabled();
    expect(getByRole("button", { name: "blue" })).toBeEnabled();
    expect(getByRole("button", { name: "light blue" })).toBeEnabled();
    expect(getByRole("button", { name: "cyan" })).toBeEnabled();
    expect(getByRole("button", { name: "teal" })).toBeEnabled();
    expect(getByRole("button", { name: "green" })).toBeEnabled();
    expect(getByRole("button", { name: "light green" })).toBeEnabled();
    expect(getByRole("button", { name: "lime" })).toBeEnabled();
    expect(getByRole("button", { name: "yellow" })).toBeEnabled();
    expect(getByRole("button", { name: "amber" })).toBeEnabled();
    expect(getByRole("button", { name: "orange" })).toBeEnabled();
    expect(getByRole("button", { name: "deep orange" })).toBeEnabled();
    expect(getByRole("button", { name: "red" })).toBeEnabled();

    expect(getByRole("button", { pressed: true })).toHaveAttribute("aria-label", "purple");
  });

  test("should be called back with selected swatch", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { getByRole } = render(<ColorSwatches hue={Hue.purple} setHue={spy} />);

    await user.click(getByRole("button", { name: "teal" }));

    expect(spy).toHaveBeenCalledWith("teal");
  });
});
