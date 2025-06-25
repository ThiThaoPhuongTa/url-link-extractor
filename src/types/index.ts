export enum AdsPlatform {
  GoogleAds = "Google Ads",
  DV360 = "Display & Video 360",
  YahooAds = "Yahoo Ads",
}

export const urlsOfAdsPlatforms: Partial<Record<AdsPlatform, URL>> = {
  [AdsPlatform.GoogleAds]: new URL(
    "https://support.google.com/google-ads/announcements/9048695?sjid=11522593750236933157-NC"
  ),
  [AdsPlatform.DV360]: new URL(
    "https://support.google.com/displayvideo/announcements/9210754?sjid=8386331593093438182-AP"
  ),
  [AdsPlatform.YahooAds]: new URL(
    "https://ads-developers.yahoo.co.jp/en/ads-api/announcement/"
  )
};