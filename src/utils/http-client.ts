import axios, { AxiosError } from 'axios';

export async function fetch(url: string, method: 'GET' | 'POST' = 'GET', data?: any): Promise<string> {
    try {
        const response = await axios({ url, method, data });
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch ${url}: ${axiosError.message}`);
    }
}