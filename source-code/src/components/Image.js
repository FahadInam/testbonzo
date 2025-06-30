import React, { useEffect, useRef, useState } from 'react';
import { Cordova, validURL } from 'Utils';

const Image = React.memo(({ src, alt, loader, fallback, autoHeight = false }) => {
  const SrcCheck = validURL(src);
  // console.log('SrcCheck', src, SrcCheck);
  const orgRef = useRef(null);
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    let mounted = true;
    const org = orgRef.current;
    org.addEventListener('load', () => {
      if (mounted) setLoaded(1);
    });

    org.addEventListener('error', () => {
      if (mounted) setLoaded(-1);
    });

    return () => {
      mounted = false;
      org.removeEventListener('load', null);
      org.removeEventListener('error', null);
    };
  }, []);
  return loaded !== -1 ? (
    <>
      <img
        ref={orgRef}
        src={SrcCheck ? src : Cordova.Path(src, true)}
        alt={alt}
        style={{
          height: autoHeight ? '100%' : '',
          width: autoHeight ? 'auto' : '',
          display: loaded === 1 ? null : 'none',
        }}
      />
      {loaded === 0 && loader}
    </>
  ) : (
    fallback
  );
});

export default Image;
