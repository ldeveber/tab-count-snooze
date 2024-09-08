import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { useSelectedTabsDispatch } from "src/contexts/FilterProvider";
import chromeMock from "test-utils/chromeMock";
import { mockTab, mockWindow } from "test-utils/mockDataHelper";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import WindowsHeader from "../WindowsHeader";

function TestWrap({ selectedTabs }: { selectedTabs?: number[] }) {
  const dispatchSelection = useSelectedTabsDispatch();

  useEffect(() => {
    if (selectedTabs) {
      dispatchSelection({ type: "set", ids: selectedTabs });
    }
  }, []);

  return <WindowsHeader />;
}

describe("Windows Header", () => {
  test("should not blow up with no windows or tabs", async () => {
    const { getByLabelText, getByRole, getByText } = renderWithContext(<WindowsHeader />);

    await waitFor(() => {
      expect(getByLabelText("Search")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByText("0 Tabs")).toBeVisible();
  });

  test("should render header", async () => {
    chromeMock.windows.getAll.mockResolvedValue([mockWindow(), mockWindow()]);
    chromeMock.tabs.query.mockResolvedValue([mockTab(), mockTab(), mockTab(), mockTab()]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByLabelText, getByRole, queryByRole } = renderWithContext(<WindowsHeader />);

    await waitFor(() => {
      expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");

    expect(queryByRole("button", { name: "Group Tabs" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "Close Tabs" })).not.toBeInTheDocument();
  });

  test("should handle search", async () => {
    const user = userEvent.setup();
    chromeMock.windows.getAll.mockResolvedValue([mockWindow(), mockWindow()]);
    chromeMock.tabs.query.mockResolvedValue([
      mockTab({ title: "meow" }),
      mockTab({ title: "no", url: "no" }),
      mockTab({ title: "no", url: "no" }),
      mockTab({ title: "no", url: "no" }),
    ]);
    vi.stubGlobal("chrome", chromeMock);

    const { getByLabelText, getByRole, getByText } = renderWithContext(<WindowsHeader />);
    await waitFor(() => {
      expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
    });

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(getByText("4 Tabs across 2 Windows")).toBeVisible();

    await user.type(getByRole("textbox", { name: "Search" }), "meow");

    expect(getByRole("textbox", { name: "Search" })).toHaveValue("meow");
    expect(getByRole("button", { name: "Group Tabs" })).toBeEnabled();
    expect(getByRole("button", { name: "Close Tabs" })).toBeEnabled();
  });

  describe("bulk actions", () => {
    test("should enable if there are tabs selected", async () => {
      const user = userEvent.setup();
      chromeMock.windows.getAll.mockResolvedValue([mockWindow(), mockWindow()]);
      chromeMock.tabs.query.mockResolvedValue([
        mockTab({ title: "meow" }),
        mockTab({ title: "no", url: "no" }),
        mockTab({ title: "no", url: "no" }),
        mockTab({ title: "no", url: "no" }),
      ]);
      vi.stubGlobal("chrome", chromeMock);

      const { getByLabelText, getByRole } = renderWithContext(<TestWrap selectedTabs={[1]} />);
      await waitFor(() => {
        expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
      });

      await user.type(getByRole("textbox", { name: "Search" }), "meow");

      expect(getByRole("button", { name: "Group Tabs" })).toBeEnabled();
      expect(getByRole("button", { name: "Close Tabs" })).toBeEnabled();
    });

    test("should handle group tabs", async () => {
      const user = userEvent.setup();
      chromeMock.windows.getAll.mockResolvedValue([mockWindow(), mockWindow()]);
      chromeMock.tabs.query.mockResolvedValue([
        mockTab({ id: 1, title: "meow" }),
        mockTab({ id: 2, title: "meow" }),
        mockTab({ id: 3, title: "no", url: "no" }),
        mockTab({ id: 4, title: "no", url: "no" }),
      ]);
      vi.stubGlobal("chrome", chromeMock);

      const { getByLabelText, getByRole } = renderWithContext(<TestWrap selectedTabs={[1, 2]} />);
      await waitFor(() => {
        expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
      });

      await user.type(getByRole("textbox", { name: "Search" }), "meow");
      await user.click(getByRole("button", { name: "Group Tabs" }));

      expect(chrome.tabs.group).toHaveBeenCalledWith({ tabIds: [1, 2] });
      expect(chrome.tabGroups.update).toHaveBeenCalledWith(expect.any(Number), { title: "meow" });
    });

    test("should handle close tabs", async () => {
      const user = userEvent.setup();
      chromeMock.windows.getAll.mockResolvedValue([mockWindow(), mockWindow()]);
      chromeMock.tabs.query.mockResolvedValue([
        mockTab({ id: 1, title: "meow" }),
        mockTab({ id: 2, title: "meow" }),
        mockTab({ id: 3, title: "no", url: "no" }),
        mockTab({ id: 4, title: "no", url: "no" }),
      ]);
      vi.stubGlobal("chrome", chromeMock);

      const { getByLabelText, getByRole } = renderWithContext(<TestWrap selectedTabs={[1, 2]} />);
      await waitFor(() => {
        expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
      });

      await user.type(getByRole("textbox", { name: "Search" }), "meow");
      await user.click(getByRole("button", { name: "Close Tabs" }));

      expect(chrome.tabs.remove).toHaveBeenCalledWith([1, 2]);
    });
  });
});
