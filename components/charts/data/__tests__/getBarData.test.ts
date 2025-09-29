import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { _getBarData, type ITabData } from "../getBarData";

describe("getBarData", () => {
  describe("_addChildren", () => {
    test("should map child data for chart with depth 0", () => {
      const tabs: Array<ITabData> = [];

      const origin1 = faker.internet.url({ appendSlash: false });
      const origin2 = faker.internet.url({ appendSlash: false });

      const segment1 = faker.internet.domainWord();
      const segment2 = faker.internet.domainWord();
      const segment3 = faker.internet.domainWord();

      tabs.push({ url: `${origin1}/${segment1}` });
      tabs.push({ url: `${origin1}/${segment2}` });
      tabs.push({ url: `${origin2}/${segment3}` });

      const res = _getBarData(tabs, 0, 10, 0);

      expect(res).toContainEqual({ id: origin1, value: 2 });
      expect(res).toContainEqual({ id: origin2, value: 1 });
      expect(res.length).toBe(2);
    });

    test("should map child data for chart with depth 1", () => {
      const tabs: Array<ITabData> = [];

      const origin1 = faker.internet.url({ appendSlash: false });
      const origin2 = faker.internet.url({ appendSlash: false });

      const segment1 = faker.internet.domainWord();
      const segment2 = faker.internet.domainWord();
      const segment3 = faker.internet.domainWord();

      const base1 = `${origin1}/${segment1}`;
      const base2 = `${origin1}/${segment2}`;
      const base3 = `${origin2}/${segment3}`;

      tabs.push({ url: `${base1}/0` });
      tabs.push({ url: `${base2}/0` });
      tabs.push({ url: `${base3}/1` });
      tabs.push({ url: `${base3}/2` });

      const res = _getBarData(tabs, 1, 10, 0);

      expect(res).toContainEqual({ id: base1, value: 1 });
      expect(res).toContainEqual({ id: base2, value: 1 });
      expect(res).toContainEqual({ id: base3, value: 2 });
      expect(res.length).toBe(3);
    });

    test("should map child data for chart with depth with depth 2", () => {
      const tabs: Array<ITabData> = [];

      const origin1 = faker.internet.url({ appendSlash: false });
      const origin2 = faker.internet.url({ appendSlash: false });

      const segment1 = faker.internet.domainWord();
      const segment2 = faker.internet.domainWord();
      const segment3 = faker.internet.domainWord();

      const base1 = `${origin1}/${segment1}/${segment2}`;
      const base2 = `${origin1}/${segment1}/${segment3}`;
      const base3 = `${origin2}/${segment2}/${segment2}`;
      const base4 = `${origin2}/${segment2}`;

      tabs.push({ url: `${base1}/0` });
      tabs.push({ url: `${base2}/0` });
      tabs.push({ url: `${base3}/1` });
      tabs.push({ url: `${base3}/2` });
      tabs.push({ url: `${base4}` });

      const res = _getBarData(tabs, 2, 10, 0);

      expect(res).toContainEqual({ id: base1, value: 1 });
      expect(res).toContainEqual({ id: base2, value: 1 });
      expect(res).toContainEqual({ id: base4, value: 1 });
      expect(res).toContainEqual({ id: base3, value: 2 });
      expect(res.length).toBe(4);
    });
  });
});
