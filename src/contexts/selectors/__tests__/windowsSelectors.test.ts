import "@testing-library/jest-dom/vitest";
import { initialState } from "src/contexts/reducers/windowsReducer";
import { mockWindow } from "test-utils/mockDataHelper";
import { describe, expect, test } from "vitest";
import { _useWindow, _useWindowCount, _useWindows } from "../windowsSelectors";

describe("Windows Selectors", () => {
  test("useWindows", () => {
    const win1 = mockWindow();
    const win2 = mockWindow();
    const map = new Map<number, chrome.windows.Window>([
      [win1.id, win1],
      [win2.id, win2],
    ]);
    expect(_useWindows({ ...initialState, map })).toStrictEqual([win1, win2]);
  });

  test("useWindowCount", () => {
    const win1 = mockWindow();
    const win2 = mockWindow();
    const map = new Map<number, chrome.windows.Window>([
      [win1.id, win1],
      [win2.id, win2],
    ]);
    expect(_useWindowCount({ ...initialState, map })).toEqual(2);
  });

  test("_useWindow", () => {
    const win1 = mockWindow();
    const win2 = mockWindow();
    const map = new Map<number, chrome.windows.Window>([
      [win1.id, win1],
      [win2.id, win2],
    ]);
    expect(_useWindow({ ...initialState, map }, win2.id)).toEqual(win2);
  });
});
