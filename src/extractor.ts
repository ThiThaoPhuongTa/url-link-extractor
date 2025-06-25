import { appendFileSync, unlinkSync } from "fs";
import { convert } from "html-to-text";

const levelSelectors: Record<number, string> = {
  1: "#wrapper > article > section",
  2: "#wrapper > article > div > section",
}

export class LinkExtractor {
  private baseUrl: string = "";
  private fileName = "html.json";

  constructor(baseUrl: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }

    unlinkSync(this.fileName);
  }

  async run() {
    return this.extractAllLinks(this.baseUrl);
  }

  async extractAllLinks(url: string): Promise<string[]> {
    const links = await this.extractLinks(url, 1);

    return links
  }

  async extractLinks(url: string, level: number): Promise<string[]> {
    const pageContent = await this.fetchPage(url, level);
    return this.parseLinks(pageContent);
  }

  async fetchPage(url: string, level: number): Promise<string> {
    try {
      const response = await fetch(url);
      const responseText = await response.text();
      const content = convert(responseText, {
        baseElements: {
            selectors: [levelSelectors[level]]
        }
      });
      return content;
    } catch (error) {
      console.error(`Error fetching page ${url}:`, error);
      return "";
    }
  }

  async savePageContent(url: string): Promise<void> {
    const response = await fetch(url);
    const responseText = await response.text();
    const content = convert(responseText, {
        baseElements: {
            selectors: [levelSelectors[2]]
        }
    });
    appendFileSync(this.fileName, `URL: ${url}\nContent:\n${content}\n\n`, "utf8");
  }

  private parseLinks(html: string): string[] {
    const httpRegex = /https:\/\/[^\s"'\]]+/g;
    const httpLinks = html.match(httpRegex) || [];
    const uniqueLinks = Array.from(new Set(httpLinks)).filter(link => !link.includes('/index'));
    return uniqueLinks;
  }
}

