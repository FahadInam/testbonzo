import { useState, useEffect } from 'react';

export default function GamePlayDimensions() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        if (window.screen.availHeight - window.innerHeight <= 10) {
          setIsFullScreen(true);
        } else {
          setIsFullScreen(false);
        }
      }, 500);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isFullScreen;
}
