import { appendFileSync, unlinkSync, existsSync } from "fs";
import * as cheerio from "cheerio";

export class LinkExtractor {
  private baseUrl: URL = new URL("https://example.com");
  private fileName = "";

  constructor(baseUrl: URL, filename: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
    if (filename) {
      this.fileName = filename;
    }

    if (existsSync(this.fileName)) {
      unlinkSync(this.fileName);
    }
  }

  async run() {
    return this.extractAllLinks(this.baseUrl);
  }

  async extractAllLinks(url: URL): Promise<string[]> {
    const links = await this.extractLinks(url);

    return links;
  }

  async extractLinks(url: URL): Promise<string[]> {
    const $ = await cheerio.fromURL(url);
    const listItems = $("section").find("a").toArray().slice(0, 10);
    const links = listItems
      .map((item) => {
        const href = $(item).attr("href") ?? "";
        if (href.startsWith("https://")) {
          return href;
        } else if (href.startsWith("/")) {
          return new URL(href, url).href;
        }
        return "";
      })
      .filter((link) => link !== "");

    return links;
  }

  async savePageContent(url: string): Promise<void> {
    const $ = await cheerio.fromURL(url);
    const section = $("section").first();
    const content = section.text();
    appendFileSync(
      this.fileName,
      `URL: ${url}\nContent:\n${content}\n\n`,
      "utf8"
    );
  }
}
