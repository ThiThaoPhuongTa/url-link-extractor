"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkExtractor = void 0;
const fs_1 = require("fs");
const html_to_text_1 = require("html-to-text");
const levelSelectors = {
    1: "#wrapper > article > section",
    2: "#wrapper > article > div > section",
};
class LinkExtractor {
    constructor(baseUrl) {
        this.baseUrl = "";
        this.fileName = "html.json";
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        (0, fs_1.unlinkSync)(this.fileName);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.extractAllLinks(this.baseUrl);
        });
    }
    //base URL
    //annoucement 1 
    //reference 1.1
    //reference 1.2
    //announcement 2
    //reference 2.1
    //reference 2.2
    //
    extractAllLinks(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.extractLinks(url, 1);
            return links;
        });
    }
    extractLinks(url, level) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageContent = yield this.fetchPage(url, level);
            return this.parseLinks(pageContent);
        });
    }
    fetchPage(url, level) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                const responseText = yield response.text();
                const content = (0, html_to_text_1.convert)(responseText, {
                    baseElements: {
                        selectors: [levelSelectors[level]]
                    }
                });
                return content;
            }
            catch (error) {
                console.error(`Error fetching page ${url}:`, error);
                return "";
            }
        });
    }
    savePageContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            const responseText = yield response.text();
            const content = (0, html_to_text_1.convert)(responseText, {
                baseElements: {
                    selectors: [levelSelectors[2]]
                }
            });
            (0, fs_1.appendFileSync)(this.fileName, `URL: ${url}\nContent:\n${content}\n\n`, "utf8");
        });
    }
    parseLinks(html) {
        const httpRegex = /https:\/\/[^\s"'\]]+/g;
        const httpLinks = html.match(httpRegex) || [];
        const uniqueLinks = Array.from(new Set(httpLinks)).filter(link => !link.includes('/index'));
        return uniqueLinks;
    }
}
exports.LinkExtractor = LinkExtractor;
