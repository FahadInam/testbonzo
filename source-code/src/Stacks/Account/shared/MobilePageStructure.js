import React, { useRef, useState, useEffect } from 'react';
import { FlexibleView, SlidableView, GameLogo } from 'Components';

import { Box } from '@material-ui/core';
import logo from 'Assets/images/pb-web-logo.png';
import webLogoGreenGuardians from 'Assets/home-img/gg-web-logo.svg';
import { getInstanceType } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const MobilePageStructure = ({ children, hideLogo }) => {
  const [view, setView] = useState('center');
  const ref = useRef();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  useEffect(() => {
    if (ref.current) setView(ref.current.clientHeight > window.innerHeight ? 'top' : 'center');
  }, []);

  return (
    <SlidableView>
      <FlexibleView display="flex" flexDirection="column" alignItems="center" justifyContent={view} key={view} pl={2} pr={2}>
        <Box ref={ref} display="flex" flexDirection="column" alignItems="center">
          <Box>{!hideLogo && <GameLogo srcLogo={isGlobalClimate ? webLogoGreenGuardians : logo} />}</Box>
          {children}
        </Box>
      </FlexibleView>
    </SlidableView>
  );
};

export default MobilePageStructure;
