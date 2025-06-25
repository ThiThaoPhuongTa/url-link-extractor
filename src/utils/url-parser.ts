export function parseLinks(html: string): string[] {
    const linkRegex = /href="([^"]+)"/g;
    const links: string[] = [];
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
        links.push(match[1]);
    }

    return links;
}