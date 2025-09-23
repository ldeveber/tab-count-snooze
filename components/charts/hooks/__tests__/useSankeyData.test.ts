import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import type { ITabData } from "../hookDataParser";
import { _getSankeyData } from "../useSankeyData";

describe("useSankeyData", () => {
  describe("_addChildren", () => {
    test("should map child data for chart", () => {
      const tabs: Array<ITabData> = [];

      const origin1 = faker.internet.url({ appendSlash: false });
      const origin2 = faker.internet.url({ appendSlash: false });

      const segment1 = faker.internet.domainWord();
      const segment2 = faker.internet.domainWord();
      const segment3 = faker.internet.domainWord();

      tabs.push({ origin: origin1, segments: [segment1] });
      tabs.push({ origin: origin1, segments: [segment1, segment2] });
      tabs.push({ origin: origin1, segments: [segment1, segment3] });
      tabs.push({ origin: origin1, segments: [segment2] });
      tabs.push({ origin: origin2, segments: [segment3] });

      const res = _getSankeyData(tabs, 0);

      expect(res.nodes.filter((n) => n.depth === 0)).toHaveLength(1);
      expect(res.nodes).toContainEqual({
        id: "All Tabs",
        depth: 0,
        value: tabs.length,
      });

      expect(res.nodes.filter((n) => n.depth === 1)).toHaveLength(2);
      expect(res.nodes).toContainEqual({ id: origin1, depth: 1, value: 4 });
      expect(res.nodes).toContainEqual({ id: origin2, depth: 1, value: 1 });

      expect(res.nodes.filter((n) => n.depth === 2)).toHaveLength(3);
      expect(res.nodes).toContainEqual({
        id: `${origin1}/${segment1}`,
        depth: 2,
        value: 3,
      });
      expect(res.nodes).toContainEqual({
        id: `${origin1}/${segment2}`,
        depth: 2,
        value: 1,
      });
      expect(res.nodes).toContainEqual({
        id: `${origin2}/${segment3}`,
        depth: 2,
        value: 1,
      });

      expect(res.nodes.filter((n) => n.depth === 3)).toHaveLength(2);
      expect(res.nodes).toContainEqual({
        id: `${origin1}/${segment1}/${segment2}`,
        depth: 3,
        value: 1,
      });
      expect(res.nodes).toContainEqual({
        id: `${origin1}/${segment1}/${segment3}`,
        depth: 3,
        value: 1,
      });

      expect(res.nodes.length).toBe(8);

      expect(res.links).toContainEqual({
        source: "All Tabs",
        target: origin1,
        value: 4,
      });
      expect(res.links).toContainEqual({
        source: "All Tabs",
        target: origin2,
        value: 1,
      });
      expect(res.links).toContainEqual({
        source: origin1,
        target: `${origin1}/${segment1}`,
        value: 3,
      });
      expect(res.links).toContainEqual({
        source: origin1,
        target: `${origin1}/${segment2}`,
        value: 1,
      });
      expect(res.links).toContainEqual({
        source: origin2,
        target: `${origin2}/${segment3}`,
        value: 1,
      });
      expect(res.links).toContainEqual({
        source: `${origin1}/${segment1}`,
        target: `${origin1}/${segment1}/${segment2}`,
        value: 1,
      });
      expect(res.links).toContainEqual({
        source: `${origin1}/${segment1}`,
        target: `${origin1}/${segment1}/${segment3}`,
        value: 1,
      });
      expect(res.links.length).toBe(7);
    });
  });
});
