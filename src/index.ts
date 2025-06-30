import { LinkExtractor } from "./extractor";
import { urlsOfAdsPlatforms } from "./types";

const main = async () => {
  for (const [platform, url] of Object.entries(urlsOfAdsPlatforms)) {
    const extractor = new LinkExtractor(url, `${platform}.md`);
    try {
      const links = await extractor.run();
      for (const link of links) {
        try {
          await extractor.savePageContent(link);
        } catch (error) {
          console.error(`Error saving content for ${link}:`, error);
        }
      }
    } catch (error) {
      console.error("Error extracting links:", error);
    }
  }
};

main()
  .then(() => {
    console.log('Processing completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });