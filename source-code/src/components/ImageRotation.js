import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Image from './Image';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    background: theme.palette.action.skeleton,
    height: '180px',
    width: '272px',
  },
}));

const ImageRotation = React.memo(({ srcList, name, rotationSpeed = 5000, autoHeight = false, showLoader = true }) => {
  const styled = useStyles();
  const [seconds, setSeconds] = useState(0);
  const isSingleImage = () => {
    if (srcList.indexOf('|') > -1) return false;
    return true;
  };

  useEffect(() => {
    const timer = isSingleImage()
      ? false
      : setInterval(() => {
          setSeconds((seconds % 99999) + 1);
        }, rotationSpeed);

    // if (!isSingleImage()) clearInterval(timer);
    // clearing interval
    return () => !isSingleImage() && clearInterval(timer);
  });

  // Conditionally render the Skeleton loader if showLoader is true, otherwise render nothing.
  const loader = showLoader ? <Skeleton variant="rect" width="100%" height="175px" className={styled.skeleton} /> : null;

  if (isSingleImage()) return <Image src={srcList} alt={name} autoHeight={autoHeight} loader={loader} />;

  const src = srcList.split('|');
  // console.log('seconds: ', seconds);
  // console.log('seconds % src.length: ', seconds % src.length);
  // console.log('image right now: ', src[seconds % src.length]);
  return <Image src={src[seconds % src.length]} alt={name} autoHeight={autoHeight} loader={loader} />;
});

export default ImageRotation;
