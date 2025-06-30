// GoogleAdsTracker.js

import { config } from 'Constants';

/**
 * Initialize Google Ads tracking script
 * Call this function once when your page loads
 */
export const initGoogleAdsTracking = () => {
  // Check if already initialized to avoid duplicates
  if (window.googleAdsInitialized) {
    return;
  }

  // Create the Google tag manager script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.google_ads_id}`;
  document.head.appendChild(script);

  // Setup the dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // Initialize gtag
  window.gtag('js', new Date());
  window.gtag('config', config.google_ads_id);

  window.googleAdsInitialized = true;
};

/**
 * Track a conversion
 */
export const trackConversion = () => {
  if (!window.gtag) {
    console.warn('Google Ads tracking not initialized. Call initGoogleAdsTracking first.');
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: config.google_ads_id,
  });
};
