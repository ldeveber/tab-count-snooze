import { faker } from "@faker-js/faker";
import { mockTab } from "@/test-utils/mockDataHelper";
import { describe, expect, test } from "vitest";
import { getChartData } from "../charts/chartjs";

const backgroundColor: ReadonlyArray<string> = [
  "#f44336",
  "#ff9800",
  "#ffeb3b",
  "#4caf50",
  "#2196f3",
  "#9c27b0",
];

function getUrlMocks() {
  const tabs = [];
  const slug1 = faker.internet.domainWord();
  const slug2 = slug1 + "/" + faker.internet.domainWord();
  const slug3 = slug2 + "/" + faker.internet.domainWord();

  const sluga = faker.internet.domainWord();
  const slugb = faker.internet.domainWord();
  const url1 = faker.internet.url({ appendSlash: false });
  const url2 = faker.internet.url({ appendSlash: false });
  const url3 = faker.internet.url({ appendSlash: false });

  tabs.push(mockTab({ url: url1 + "/" + slug1, pinned: true }));
  tabs.push(mockTab({ url: url1 + "/" + slug2, pinned: true }));
  tabs.push(mockTab({ url: url1 + "/" + slug3, pinned: false }));
  tabs.push(mockTab({ url: url1 + "/" + sluga, pinned: true }));
  tabs.push(mockTab({ url: url1 + "/" + slugb, pinned: false }));

  tabs.push(mockTab({ url: url2 + "/" + slug1, pinned: true }));
  tabs.push(mockTab({ url: url2 + "/" + slug2, pinned: false }));
  tabs.push(mockTab({ url: url2 + "/" + slug3, pinned: false }));

  tabs.push(mockTab({ url: url3 + "/" + sluga, pinned: true }));
  tabs.push(mockTab({ url: url3 + "/" + slugb, pinned: false }));

  return {
    slug1,
    slug2,
    slug3,
    sluga,
    slugb,
    url1,
    url2,
    url3,
    tabs,
  };
}

describe("chartjs utils", () => {
  describe("getChartData", () => {
    test("should map data for 10 unique URLs", () => {
      const tabs = [];
      for (let i = 0; i < 10; i++) {
        const base = faker.internet.url({ appendSlash: false });
        const slug1 = faker.internet.domainWord();
        const slug2 = faker.internet.domainWord();
        const slug3 = faker.internet.domainWord();
        tabs.push(mockTab({ url: base + "/" + slug1 + "/" + slug2 + "/" + slug3, index: i }));
      }

      const res = getChartData(tabs);

      expect(res).toEqual({
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor,
            borderWidth: 0,
          },
        ],
      });
    });

    test("should map data for 10 URLs, 3 unique domains", () => {
      const tabs = [];
      const { slug1, slug2, slug3, url1, url2, url3 } = getUrlMocks();

      tabs.push(mockTab({ url: url1 + "/" + slug1 }));
      tabs.push(mockTab({ url: url1 + "/" + slug2 }));
      tabs.push(mockTab({ url: url1 + "/" + slug3 }));
      tabs.push(mockTab({ url: url1 + "/" + faker.internet.domainWord() }));
      tabs.push(mockTab({ url: url1 + "/" + faker.internet.domainWord() }));

      tabs.push(mockTab({ url: url2 + "/" + slug1 }));
      tabs.push(mockTab({ url: url2 + "/" + slug2 }));
      tabs.push(mockTab({ url: url2 + "/" + slug3 }));

      tabs.push(mockTab({ url: url3 + "/" + faker.internet.domainWord() }));
      tabs.push(mockTab({ url: url3 + "/" + faker.internet.domainWord() }));

      const labels = [url1, url2, url3];
      const res = getChartData(tabs);

      expect(res).toEqual({
        labels,
        datasets: [
          {
            data: [5, 3, 2],
            backgroundColor,
            borderWidth: 0,
          },
        ],
      });
    });

    describe("min dupes", () => {
      test("should map data for 10 unique URLs", () => {
        const tabs = [];
        for (let i = 0; i < 10; i++) {
          const base = faker.internet.url({ appendSlash: false });
          const slug1 = faker.internet.domainWord();
          const slug2 = faker.internet.domainWord();
          const slug3 = faker.internet.domainWord();
          tabs.push(mockTab({ url: base + "/" + slug1 + "/" + slug2 + "/" + slug3, index: i }));
        }

        const res = getChartData(tabs, { minDupes: 3 });

        expect(res).toEqual({
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor,
              borderWidth: 0,
            },
          ],
        });
      });

      test("should map data for 10 URLs, 3 unique domains", () => {
        const { url1, url2, tabs } = getUrlMocks();
        const labels = [url1, url2];
        const res = getChartData(tabs, { minDupes: 3 });

        expect(res).toEqual({
          labels,
          datasets: [
            {
              data: [5, 3],
              backgroundColor,
              borderWidth: 0,
            },
          ],
        });
      });
    });

    describe("url depth", () => {
      test("should map data for 10 unique URLs", () => {
        const tabs = [];
        for (let i = 0; i < 10; i++) {
          const base = faker.internet.url({ appendSlash: false });
          const slug1 = faker.internet.domainWord();
          const slug2 = faker.internet.domainWord();
          const slug3 = faker.internet.domainWord();
          tabs.push(mockTab({ url: base + "/" + slug1 + "/" + slug2 + "/" + slug3, index: i }));
        }

        const res = getChartData(tabs, { urlDepth: 2 });

        expect(res).toEqual({
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor,
              borderWidth: 0,
            },
          ],
        });
      });

      test("should map data for 10 URLs, 3 unique domains", () => {
        const { slug2, url1, url2, tabs } = getUrlMocks();
        const labels = [url1 + "/" + slug2, url2 + "/" + slug2];
        const res = getChartData(tabs, { urlDepth: 2 });

        expect(res).toEqual({
          labels,
          datasets: [
            {
              data: [2, 2],
              backgroundColor,
              borderWidth: 0,
            },
          ],
        });
      });
    });
  });
});
