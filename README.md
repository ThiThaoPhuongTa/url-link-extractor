# URL Link Extractor

## Overview
The URL Link Extractor is a TypeScript project designed to extract all links from a specified base URL. It fetches the HTML content of the page and parses it to retrieve all hyperlinks.

## Features
- Fetches HTML content from a given URL.
- Extracts all hyperlinks from the fetched content.
- Handles errors gracefully during HTTP requests.

## Installation
To get started with the URL Link Extractor, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd url-link-extractor
npm install
```

## Usage
To run the link extractor, use the following command:

```bash
npm start -- <base-url>
```

Replace `<base-url>` with the URL you want to extract links from.

## Development
This project is structured with a clear separation of concerns:
- `src/index.ts`: Entry point for the application.
- `src/extractor.ts`: Contains the `LinkExtractor` class for link extraction logic.
- `src/utils/http-client.ts`: Utility for making HTTP requests.
- `src/utils/url-parser.ts`: Utility for parsing HTML content to extract links.
- `src/types/index.ts`: Type definitions for the project.

## Testing
To run the tests, use the following command:

```bash
npm test
```

This will execute all unit tests defined in the `tests` directory.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.