import "@testing-library/jest-dom/vitest";
import { render, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import WindowsTab from "../WindowsTab";

describe("Windows Tab", () => {
  test("should render Windows tab", async () => {
    const { getAllByTestId, getByTestId } = render(<WindowsTab />);

    await waitFor(() => expect(getByTestId("window-loading")).toBeVisible());

    expect(getByTestId("window-loading")).toBeVisible();
    expect(getAllByTestId("tab-loading")).toHaveLength(6);
  });
});
