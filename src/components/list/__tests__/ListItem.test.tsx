import "@testing-library/jest-dom/vitest";
import ListItem from "src/components/list/ListItem";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";

describe("List Item", () => {
  test("should render correctly", () => {
    const { getByText } = render(
      <ListItem>
        <div>CHILDREN</div>
      </ListItem>,
    );

    expect(getByText("CHILDREN")).toBeVisible();
  });
});
