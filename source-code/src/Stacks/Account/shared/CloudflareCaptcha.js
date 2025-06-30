import React, { useEffect, useState } from 'react';

function CloudflareCaptcha({ getTurnstileToken, className = '', captchaKey }) {
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    const loadTurnstileScript = () => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`)) {
          resolve(); // Script already loaded
          return;
        }

        const script = document.createElement('script');
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const verifyCaptcha = async () => {
      const container = document.getElementById('turnstile-container');
      if (container) {
        if (container.firstChild) {
          window.turnstile.remove();
        }

        try {
          await loadTurnstileScript();
          window.turnstile.render('#turnstile-container', {
            sitekey: process.env.REACT_APP_TURNSTILE_SITE_KEY,
            size: 'flexible',
            callback: function (token) {
              getTurnstileToken(token);
            },
          });
        } catch (error) {
          console.error('Failed to load CAPTCHA:', error);
          // Retry after 5 seconds if CAPTCHA fails to load
          setTimeout(() => setRetry(retry + 1), 5000);
        }
      }
    };

    verifyCaptcha();

    const handleOnline = () => {
      console.log('Internet connection restored, retrying CAPTCHA load');
      setRetry(retry + 1);
    };

    window.addEventListener('online', handleOnline);

    return () => {
      const container = document.getElementById('turnstile-container');
      if (container && container.firstChild) {
        console.log('Cleanup function: Removing CAPTCHA');
        window.turnstile.remove();
      }
      window.removeEventListener('online', handleOnline);
    };
    // eslint-disable-next-line
  }, [captchaKey, retry]); // Dependency on captchaKey and retry ensures the effect runs when they change

  return (
    <div>
      <div className={`width-full ${className}`}>
        <div id="turnstile-container" data-theme="light"></div>
      </div>
    </div>
  );
}

export default CloudflareCaptcha;
