import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { mockTab, mockWindow, mockWindowList } from "test-utils/mockDataHelper";
import { render } from "test-utils/react-testing-library-utils";
import { describe, expect, test } from "vitest";
import WindowsActions from "../WindowsActions";

describe("Windows Actions", () => {
  test("should not enable if there are no tabs", () => {
    const { getByRole } = render(<WindowsActions windows={[]} />);

    expect(getByRole("button", { name: "Group Tabs" })).not.toBeEnabled();
    expect(getByRole("button", { name: "Close Tabs" })).not.toBeEnabled();
  });

  test("should enable if there are tabs", () => {
    const wins = mockWindowList();
    const { getByRole } = render(<WindowsActions windows={wins} />);

    expect(getByRole("button", { name: "Group Tabs" })).toBeEnabled();
    expect(getByRole("button", { name: "Close Tabs" })).toBeEnabled();
  });

  describe("actions", () => {
    test("should handle group tabs", async () => {
      const user = userEvent.setup();
      const wins = [
        mockWindow({ tabs: [mockTab({ id: 1 }), mockTab({ id: 2 })] }),
        mockWindow({ tabs: [mockTab({ id: 3 }), mockTab({ id: 4 })] }),
      ];
      const { getByRole } = render(<WindowsActions windows={wins} />);

      await user.click(getByRole("button", { name: "Group Tabs" }));

      expect(chrome.tabs.group).toHaveBeenCalledWith({ tabIds: [1, 2, 3, 4] });
      expect(chrome.tabGroups.update).toHaveBeenCalledWith(expect.any(Number), { title: "" });
    });

    test("should handle close tabs", async () => {
      const user = userEvent.setup();
      const wins = [
        mockWindow({ tabs: [mockTab({ id: 1 }), mockTab({ id: 2 })] }),
        mockWindow({ tabs: [mockTab({ id: 3 }), mockTab({ id: 4 })] }),
      ];
      const { getByRole } = render(<WindowsActions windows={wins} />);

      await user.click(getByRole("button", { name: "Close Tabs" }));

      expect(chrome.tabs.remove).toHaveBeenCalledWith([1, 2, 3, 4]);
    });
  });
});
