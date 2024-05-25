import "@testing-library/jest-dom/vitest";
import ListGroupCard from "src/components/list/ListGroupCard";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";

describe("List Group Card", () => {
  test("should render correctly", () => {
    const { getByText, getByTitle } = render(
      <ListGroupCard title="TITLE">
        <div>CHILDREN</div>
      </ListGroupCard>,
    );

    expect(getByTitle("TITLE")).toBeVisible();
    expect(getByText("CHILDREN")).toBeVisible();
  });
});
