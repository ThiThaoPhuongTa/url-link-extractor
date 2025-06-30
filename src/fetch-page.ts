import puppeteer from 'puppeteer';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

export async function getFullPageContent(pageUrl: URL): Promise<string> {
  const fetchHTML = await requestByFetching(pageUrl.href);
  if(fetchHTML && fetchHTML.includes('<div')) {
    return fetchHTML
  }
  return await requestByLaunchingBrowser(pageUrl.href);
}

const requestByLaunchingBrowser = async (pageUrl: string) => {
  console.log(`Launching browser to fetch page: ${pageUrl}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);

  await page.goto(pageUrl, {
    // Wait until the network is idle (no more than 2 requests for 500ms)
    waitUntil: 'networkidle2',
  });
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const bodyHTML = await page.content();

  await browser.close();

  return bodyHTML;
}

const requestByFetching = async (pageUrl: string) => {
  console.log(`Fetching page: ${pageUrl}`);
  const response = await fetch(pageUrl, {
    headers: {
      'User-Agent': userAgent,
    },
  });

  return response.ok ? await response.text() : Promise.resolve(undefined);
}