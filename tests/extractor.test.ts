import { LinkExtractor } from '../src/extractor';
import { HttpResponse } from '../src/types';

describe('LinkExtractor', () => {
    let linkExtractor: LinkExtractor;

    beforeEach(() => {
        linkExtractor = new LinkExtractor();
    });

    describe('extractLinks', () => {
        it('should extract links from a valid HTML page', async () => {
            const mockHtml = '<html><body><a href="http://example.com">Example</a></body></html>';
            const mockFetchResponse: HttpResponse = { status: 200, body: mockHtml };
            jest.spyOn(linkExtractor, 'fetchPage').mockResolvedValue(mockFetchResponse);

            const links = await linkExtractor.extractLinks('http://test.com');
            expect(links).toEqual(['http://example.com']);
        });

        it('should return an empty array if no links are found', async () => {
            const mockHtml = '<html><body>No links here!</body></html>';
            const mockFetchResponse: HttpResponse = { status: 200, body: mockHtml };
            jest.spyOn(linkExtractor, 'fetchPage').mockResolvedValue(mockFetchResponse);

            const links = await linkExtractor.extractLinks('http://test.com');
            expect(links).toEqual([]);
        });

        it('should handle fetch errors gracefully', async () => {
            jest.spyOn(linkExtractor, 'fetchPage').mockRejectedValue(new Error('Fetch error'));

            const links = await linkExtractor.extractLinks('http://test.com');
            expect(links).toEqual([]);
        });
    });

    describe('fetchPage', () => {
        it('should return the response body for a valid URL', async () => {
            const mockResponse: HttpResponse = { status: 200, body: 'Mock response body' };
            jest.spyOn(linkExtractor, 'fetch').mockResolvedValue(mockResponse);

            const response = await linkExtractor.fetchPage('http://test.com');
            expect(response).toEqual(mockResponse);
        });

        it('should throw an error for an invalid URL', async () => {
            jest.spyOn(linkExtractor, 'fetch').mockRejectedValue(new Error('Invalid URL'));

            await expect(linkExtractor.fetchPage('invalid-url')).rejects.toThrow('Invalid URL');
        });
    });
});