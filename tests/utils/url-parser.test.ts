import { parseLinks } from '../../../src/utils/url-parser';

describe('parseLinks', () => {
    it('should extract links from a simple HTML string', () => {
        const html = '<a href="http://example.com">Example</a>';
        const links = parseLinks(html);
        expect(links).toEqual(['http://example.com']);
    });

    it('should extract multiple links from HTML', () => {
        const html = `
            <a href="http://example.com">Example</a>
            <a href="http://test.com">Test</a>
        `;
        const links = parseLinks(html);
        expect(links).toEqual(['http://example.com', 'http://test.com']);
    });

    it('should handle links with different protocols', () => {
        const html = `
            <a href="https://secure.com">Secure</a>
            <a href="ftp://files.com">FTP</a>
        `;
        const links = parseLinks(html);
        expect(links).toEqual(['https://secure.com', 'ftp://files.com']);
    });

    it('should return an empty array when no links are present', () => {
        const html = '<p>No links here!</p>';
        const links = parseLinks(html);
        expect(links).toEqual([]);
    });

    it('should ignore malformed links', () => {
        const html = '<a href="invalid-url">Invalid</a>';
        const links = parseLinks(html);
        expect(links).toEqual([]);
    });
});