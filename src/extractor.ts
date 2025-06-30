import * as cheerio from "cheerio";
import { appendFileSync, existsSync, unlinkSync } from "fs";
import TurndownService from "turndown";
import { getFullPageContent } from "./fetch-page";
import _ from "lodash";

const loadPageContent = async (url: URL): Promise<cheerio.CheerioAPI> =>  
  cheerio.load(await getFullPageContent(url));

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

  async extractAllLinks(url: URL): Promise<URL[]> {
    const links = await this.extractLinks(url);

    return links;
  }

  async extractLinks(url: URL): Promise<URL[]> {
    const $ = await loadPageContent(url);
    const main = [$("main"), $("section"), $("[data-click-area='Main']")].find(el => el.length);
    if (!main) {
      console.warn(`No main or section found in ${url}`);
      return [];
    }
    const list = main.first().find("a").toArray();
    const links = list.map((el) => {
      const href = $(el).attr("href");
      if (href) {
        if (href.startsWith("https://")) {
          return href;
        } else if (href.startsWith("/")) {
          return new URL(href, url).href;
        }
      }
      return "";
    }).filter(link => link !== "");


    const candidateLinks = _.uniq(links).slice(0, 10).sort((link1, link2) => link2.localeCompare(link1)).map((link) => new URL(link));

    return candidateLinks;
  }

  async savePageContent(url: URL): Promise<void> {

    const $ = await loadPageContent(url);
    const section = [$("article section"), $("article"), $("section"), $("[class*='article']"), $("[data-click-area='Main']")].find(el => el.length)
    
    if (!section) {
      console.warn(`No article or section found in ${url}`);
      return;
    }

    const turndownService = new TurndownService();
    const content = turndownService.turndown(section.first().html() ?? "");

    appendFileSync(
      this.fileName,
      `URL: ${url}\nContent:\n${content}\n\n`,
      "utf8"
    );
  }
}