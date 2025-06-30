import React, { useState } from 'react';
import { Box, useScrollTrigger, useTheme } from '@material-ui/core';

import { NoDataFound, FlexibleView, SlidableView, H1, Header } from 'Components';
import { PAGE_STATE } from 'Constants';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';

const PageStructure = ({ children, name, PageState, PreLoader, PageUI, callback, welcome, headerSet }) => {
  let UI = null;
  if (PageState < PAGE_STATE.NO_DATA_TO_SHOW) {
    UI = (
      <PerPageLoader PageState={PageState} callback={callback}>
        {PreLoader}
      </PerPageLoader>
    );
  } else if (PageState === PAGE_STATE.NO_DATA_TO_SHOW) {
    UI = (
      <Box style={{ width: '100%', maxWidth: '1000px', padding: '16px' }}>
        <NoDataFound />
      </Box>
    );
  } else {
    UI = PageUI;
  }

  const { texts } = useTheme();
  const [scrollTarget, setScrollTarget] = useState(undefined);

  const trigger = useScrollTrigger({ target: scrollTarget, threshold: 0, disableHysteresis: true });
  return (
    <SlidableView showGradient>
      {!welcome && (
        <Header
          trigger={trigger}
          headerSet={headerSet || { showLeft: true, showRight: true, leftTitle: texts.BACK, hideCoins: false, notify: false }}
        />
      )}
      <FlexibleView
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={welcome ? 4 : 0}
        pb={welcome ? 4 : 0}
        ref={(node) => {
          if (node) {
            setScrollTarget(node);
          }
        }}
      >
        {typeof name === 'string' ? <H1>{name}</H1> : name}
        {UI}
        {children}
      </FlexibleView>
    </SlidableView>
  );
};

export default PageStructure;
