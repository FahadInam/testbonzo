import React, { useState } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { FlexibleView, SlidableView, Header } from 'Components';
import useWindowDimensions from 'Utils/Dimenssion';
import { AccountNav } from 'Navigation/Paths';

// import { Box } from '@material-ui/core';
// import logo from 'Assets/images/logo.png';

const PageStructure = ({ children, hideHeader, headerSet, hideLogo, Top, mode }) => {
  const [scrollTarget, setScrollTarget] = useState(undefined);
  const { height } = useWindowDimensions();
  let maxHeight = 590;
  if (mode !== 'MODAL') {
    if (window.location.pathname === AccountNav.LOGIN.link) maxHeight = 685;
    if (window.location.pathname === AccountNav.FORGOT_PASSWORD.link) maxHeight = 510;
  } else {
    maxHeight = 685;
  }

  const trigger = useScrollTrigger({ target: scrollTarget, threshold: 0, disableHysteresis: true });
  return (
    <SlidableView>
      {!hideHeader ? (
        <Header
          trigger={trigger}
          headerSet={
            headerSet || {
              callback: null,
              showRight: false,
              showLeft: true,
              notify: false,
            }
          }
          topRounded
        />
      ) : null}

      <FlexibleView
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={Top ? 'start' : height < maxHeight ? '' : 'start'}
        pl={0}
        pr={0}
        // pt={addMarginOnTop ? 0 : 0}
        ref={(node) => {
          if (node) {
            setScrollTarget(node);
          }
        }}
      >
        {/* <Box mt={hideHeader ? 6 : 0}>{!hideLogo && <GameLogo srcLogo={logo} width="151px" height="94px" />}</Box> */}
        {children}
      </FlexibleView>
    </SlidableView>
  );
};

export default PageStructure;
