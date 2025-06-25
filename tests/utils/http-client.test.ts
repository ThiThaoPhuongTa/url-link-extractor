import { fetch } from '../../src/utils/http-client';

describe('fetch', () => {
    it('should return response body for a valid URL', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        const response = await fetch(url);
        expect(response).toHaveProperty('title');
    });

    it('should throw an error for an invalid URL', async () => {
        const url = 'invalid-url';
        await expect(fetch(url)).rejects.toThrow();
    });

    it('should handle network errors gracefully', async () => {
        const url = 'https://nonexistent.url';
        await expect(fetch(url)).rejects.toThrow();
    });
});