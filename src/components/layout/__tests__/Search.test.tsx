import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { origRender as render } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import Search from "../Search";

describe("Search Input", () => {
  test("should render empty", () => {
    const { getByRole, queryByRole } = render(<Search value="" onChange={vi.fn()} />);
    expect(getByRole("textbox", { name: "Search" })).toBeEnabled();
    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  test("should render with value", () => {
    const { getByRole } = render(<Search value="meow" onChange={vi.fn()} />);
    expect(getByRole("textbox", { name: "Search" })).toBeEnabled();
    expect(getByRole("textbox", { name: "Search" })).toHaveValue("meow");
    expect(getByRole("button", { name: "Clear" })).toBeEnabled();
  });

  test("should clear text", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { getByRole } = render(<Search value="meow" onChange={spy} />);

    await user.click(getByRole("button", { name: "Clear" }));

    expect(spy).toHaveBeenCalledWith("");
  });
});
