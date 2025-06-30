import React, { useEffect } from 'react';
import { DotLoader } from 'Components/Loader/dotLoader';
import { McdUser } from 'Utils';
import Knowledge from 'Assets/images/mcd/kotg.png';
import Mcdonald from 'Assets/images/mcd/Mcdonald.png';
import kp from 'Assets/images/mcd/kp.png';

const McdScreen = () => {
  useEffect(() => {
    // console.log('McdScreen!');
    window.isMCDLoader = true;
    McdUser.Login();

    return () => {
      // console.log('Cleanup done!');
      window.isMCDLoader = false;
    };
  }, []);

  // useEffect(() => {
  //   return function cleanup() {
  //     window.isMCDLoader = false;
  //   };
  // }, []);

  return <DotLoader isMCD TopLogo={Knowledge} BottomLogo={Mcdonald} kp={kp} />;
};

export default McdScreen;
