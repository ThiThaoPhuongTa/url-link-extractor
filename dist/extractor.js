"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cheerio = __importStar(require("cheerio"));
class LinkExtractor {
    constructor(baseUrl, filename) {
        this.baseUrl = new URL("https://example.com");
        this.fileName = "";
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        if (filename) {
            this.fileName = filename;
        }
        if ((0, fs_1.existsSync)(this.fileName)) {
            (0, fs_1.unlinkSync)(this.fileName);
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.extractAllLinks(this.baseUrl);
        });
    }
    extractAllLinks(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.extractLinks(url);
            return links;
        });
    }
    extractLinks(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield cheerio.fromURL(url);
            const listItems = $("section").find("a").toArray().slice(0, 10);
            const links = listItems
                .map((item) => {
                var _a;
                const href = (_a = $(item).attr("href")) !== null && _a !== void 0 ? _a : "";
                if (href.startsWith("https://")) {
                    return href;
                }
                else if (href.startsWith("/")) {
                    return new URL(href, url).href;
                }
                return "";
            })
                .filter((link) => link !== "");
            return links;
        });
    }
    savePageContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield cheerio.fromURL(url);
            const section = $("section").first();
            const content = section.text();
            (0, fs_1.appendFileSync)(this.fileName, `URL: ${url}\nContent:\n${content}\n\n`, "utf8");
        });
    }
}
exports.LinkExtractor = LinkExtractor;
