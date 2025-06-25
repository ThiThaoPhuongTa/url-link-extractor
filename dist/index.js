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
const extractor_1 = require("./extractor");
const types_1 = require("./types");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const [platform, url] of Object.entries(types_1.urlsOfAdsPlatforms)) {
        const extractor = new extractor_1.LinkExtractor(url, `${platform}.txt`);
        try {
            const links = yield extractor.run();
            console.log("Extracted links:", links);
            for (const link of links) {
                yield extractor.savePageContent(link);
            }
        }
        catch (error) {
            console.error("Error extracting links:", error);
        }
    }
});
main();
