import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { useDataDispatch } from "src/contexts/DataProvider";
import chromeMock from "test-utils/chromeMock";
import { mockTab, mockWindow } from "test-utils/mockDataHelper";
import { renderWithContext, waitFor } from "test-utils/react-testing-library-utils";
import { describe, expect, test, vi } from "vitest";
import WindowsHeader from "../WindowsHeader";

function TestWrap({ selectedTabs }: { selectedTabs?: number[] }) {
  const dispatch = useDataDispatch();

  useEffect(() => {
    if (selectedTabs) {
      dispatch({ type: "selectTabs", ids: selectedTabs });
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
      const tab1 = mockTab({ title: "meow" });
      const tab2 = mockTab({ title: "no", url: "no" });
      const tab3 = mockTab({ title: "no", url: "no" });
      const tab4 = mockTab({ title: "no", url: "no" });
      chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4]);
      vi.stubGlobal("chrome", chromeMock);

      const { getByLabelText, getByRole } = renderWithContext(
        <TestWrap selectedTabs={[tab1.id]} />,
      );
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
      const tab1 = mockTab({ title: "meow" });
      const tab2 = mockTab({ title: "meow" });
      const tab3 = mockTab({ title: "no", url: "no" });
      const tab4 = mockTab({ title: "no", url: "no" });
      chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4]);
      vi.stubGlobal("chrome", chromeMock);

      const { getByLabelText, getByRole } = renderWithContext(
        <TestWrap selectedTabs={[tab1.id, tab2.id]} />,
      );
      await waitFor(() => {
        expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
      });

      await user.type(getByRole("textbox", { name: "Search" }), "meow");
      await user.click(getByRole("button", { name: "Group Tabs" }));

      expect(chrome.tabs.group).toHaveBeenCalledWith({ tabIds: [tab1.id, tab2.id] });
      expect(chrome.tabGroups.update).toHaveBeenCalledWith(expect.any(Number), { title: "meow" });
    });

    test("should handle close tabs", async () => {
      const user = userEvent.setup();
      chromeMock.windows.getAll.mockResolvedValue([mockWindow(), mockWindow()]);
      const tab1 = mockTab({ title: "meow" });
      const tab2 = mockTab({ title: "meow" });
      const tab3 = mockTab({ title: "no", url: "no" });
      const tab4 = mockTab({ title: "no", url: "no" });
      chromeMock.tabs.query.mockResolvedValue([tab1, tab2, tab3, tab4]);
      vi.stubGlobal("chrome", chromeMock);

      const { getByLabelText, getByRole } = renderWithContext(
        <TestWrap selectedTabs={[tab1.id, tab2.id]} />,
      );
      await waitFor(() => {
        expect(getByLabelText("4 Tabs across 2 Windows")).toBeVisible();
      });

      await user.type(getByRole("textbox", { name: "Search" }), "meow");
      await user.click(getByRole("button", { name: "Close Tabs" }));

      expect(chrome.tabs.remove).toHaveBeenCalledWith([tab1.id, tab2.id]);
    });
  });
});
