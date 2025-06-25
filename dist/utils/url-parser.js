"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLinks = void 0;
function parseLinks(html) {
    const linkRegex = /href="([^"]+)"/g;
    const links = [];
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
        links.push(match[1]);
    }
    return links;
}
exports.parseLinks = parseLinks;
