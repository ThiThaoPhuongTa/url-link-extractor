import { LinkExtractor } from "./extractor";
import { urlsOfAdsPlatforms } from "./types";

const main = async () => {
  for (const [platform, url] of Object.entries(urlsOfAdsPlatforms)) {
    const extractor = new LinkExtractor(url, `${platform}.txt`);
    try {
      const links = await extractor.run();
      console.log("Extracted links:", links);
      for (const link of links) {
        await extractor.savePageContent(link);
      }
    } catch (error) {
      console.error("Error extracting links:", error);
    }
  }
};

main();