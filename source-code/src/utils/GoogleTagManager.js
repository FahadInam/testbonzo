import { useEffect } from 'react';

const GoogleTagManager = ({ gtmId, enabled = true }) => {
  console.log(gtmId, 'gtmId here');

  // Function to load the GTM script
  const loadGTM = () => {
    if (!gtmId) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    // Add GTM script to the document head
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;

    // When the GTM script is loaded, initialize gtag
    script.onload = () => {
      window.gtag =
        window.gtag ||
        function () {
          window.dataLayer.push(arguments);
        };

      // Optionally, you can push an initial page view event here
      window.gtag('js', new Date());
      window.gtag('config', gtmId); // Example to configure GTM with your ID
    };

    document.head.appendChild(script);
  };

  // Function to add GTM noscript tag for scenarios where JavaScript is disabled
  const addNoScriptGTM = () => {
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertAdjacentElement('afterbegin', noscript);
  };

  // Function to track page views in a single-page application (SPA)
  const trackPageView = () => {
    window.dataLayer.push({
      event: 'virtualPageView',
      pagePath: window.location.pathname,
    });
  };

  // Initialize GTM and set up tracking
  useEffect(() => {
    if (enabled && gtmId) {
      loadGTM(); // Load GTM script in <head>
      addNoScriptGTM(); // Add <noscript> in <body>
      trackPageView(); // Track initial page load

      // Listen for changes in URL to track page views
      const handlePopState = () => {
        trackPageView();
      };

      window.addEventListener('popstate', handlePopState);

      // Cleanup function to remove event listener when the component unmounts
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gtmId, enabled]);

  return null;
};

export default GoogleTagManager;
