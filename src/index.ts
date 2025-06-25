import { LinkExtractor } from './extractor';
import * as _ from 'lodash';

const main = async () => {
    const baseUrl = 'https://ads-developers.yahoo.co.jp/en/ads-api/announcement';

    const extractor = new LinkExtractor(baseUrl);
    try {
        const links = _.uniq(await extractor.run());
        console.log('Extracted links:', links);
        links.forEach(async link => {
            await extractor.savePageContent(link)
        })
    } catch (error) {
        console.error('Error extracting links:', error);
    };
}

main();