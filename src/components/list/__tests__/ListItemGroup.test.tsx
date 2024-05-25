import "@testing-library/jest-dom/vitest";
import ListItemGroup from "src/components/list/ListItemGroup";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";

describe("List Item Group", () => {
  test("should render correctly", () => {
    const { getByRole, getByText } = render(
      <ListItemGroup title="TITLE" initOpen>
        <div>CHILDREN</div>
      </ListItemGroup>,
    );

    expect(getByRole("button", { name: "TITLE" })).toBeVisible();
    expect(getByText("CHILDREN")).toBeVisible();
  });
});
