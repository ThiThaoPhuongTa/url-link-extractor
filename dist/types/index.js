"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlsOfAdsPlatforms = exports.AdsPlatform = void 0;
var AdsPlatform;
(function (AdsPlatform) {
    AdsPlatform["GoogleAds"] = "Google Ads";
    AdsPlatform["DV360"] = "Display & Video 360";
    AdsPlatform["YahooAds"] = "Yahoo Ads";
    AdsPlatform["AppleSearchAds"] = "Apple Search Ads";
})(AdsPlatform = exports.AdsPlatform || (exports.AdsPlatform = {}));
exports.urlsOfAdsPlatforms = {
    [AdsPlatform.GoogleAds]: new URL("https://support.google.com/google-ads/announcements/9048695?sjid=11522593750236933157-NC"),
    [AdsPlatform.DV360]: new URL("https://support.google.com/displayvideo/announcements/9210754?sjid=8386331593093438182-AP"),
    [AdsPlatform.YahooAds]: new URL("https://ads-developers.yahoo.co.jp/en/ads-api/announcement/"),
    [AdsPlatform.AppleSearchAds]: new URL("https://developer.apple.com/news/"),
};
