export enum AdsPlatform {
  GoogleAds = "Google Ads",
  DV360 = "Display & Video 360",
  YahooAds = "Yahoo Ads",
  ASA = "Apple Search Ads",
  LineAds = "LINE Ads",
  FaceboobkAds = "Facebook Ads",
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
  ),
  [AdsPlatform.ASA]: new URL(
    "https://developer.apple.com/news/"
  ),
  [AdsPlatform.LineAds]: new URL(
    "https://developers.line.biz/en/news/1/"
  ),
  [AdsPlatform.FaceboobkAds]: new URL(
    "https://developers.facebook.com/blog/"
  ),
};