// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import App from "@/components/App";
import { render } from "@/tests/unit/react-testing-library-utils";
import { mockTab, mockWindow } from "../utils/mockDataHelper";
import { emitRuntimeMessage } from "./message-utils";

describe("App", () => {
  test("should initialize correctly from background", async () => {
    const { findByRole, getByRole, getByText } = render(<App />);

    expect(await findByRole("tablist")).toBeVisible();

    const windowId = faker.number.int();
    const win = mockWindow({ id: windowId });
    const tab = mockTab({ windowId });
    emitRuntimeMessage({
      type: "init",
      payload: { windows: [win], tabs: [tab], tabGroups: [] },
    });

    expect(getByRole("tab", { name: "Tab" })).toBeVisible();
    expect(getByRole("tab", { name: "Count" })).toBeVisible();
    expect(getByRole("tab", { name: "Snooze" })).toBeVisible();

    expect(getByRole("tab", { selected: true })).toHaveTextContent("Tab");
    expect(getByRole("tabpanel", { name: "Tab" })).toBeVisible();

    expect(await findByRole("searchbox")).toBeVisible();
    expect(getByText("1 Tab")).toBeVisible();

    expect(
      getByRole("button", {
        name: `Show or hide 1 tabs in ${win.state} window`,
      }),
    ).toBeVisible();
    expect(
      getByRole("list", { name: "normal window with 1 tabs" }),
    ).toBeVisible();
    expect(getByRole("listitem", { name: `Tab: ${tab.title}` })).toBeVisible();
  });
});
