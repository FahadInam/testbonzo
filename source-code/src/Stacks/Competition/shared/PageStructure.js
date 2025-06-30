import React, { useState } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PAGE_STATE } from 'Constants';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { NoDataFound, FlexibleView, SlidableView, H1, Header } from 'Components';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import PageTitle from 'Components/Core/PageTitle';
// import { initialize } from 'react-ga';

const PageStructure = ({
  PageState,
  PreLoader,
  TopBanner,
  ButtonsUI,
  PageUI,
  name,
  logo,
  headerSet,
  noRes,
  isOnlyCompetition,
  noDataMsg,
  flexClass,
  chatScrollId,
}) => {
  // console.log(PageState,PageUI , "PageUIPageUI")
  const useStyles = makeStyles({
    noSmallDisplay: {
      display: 'block',
      '@media (max-height: 635px)': {
        display: 'none',
      },
    },
  });
  const styled = useStyles();
  let UI = null;
  let typeOfPage = null;
  if (PageState < PAGE_STATE.NO_DATA_TO_SHOW) {
    UI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (PageState === PAGE_STATE.NO_DATA_TO_SHOW) {
    UI = <NoDataFound noDataMsg={noDataMsg} />;
  } else {
    UI = PageUI;
  }
  const [scrollTarget, setScrollTarget] = useState(undefined);
  const trigger = useScrollTrigger({ target: scrollTarget, threshold: 0, disableHysteresis: true });

  if (name && name.toLowerCase().trim() === 'rules') {
    typeOfPage = (
      <Box style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', flexDirection: 'column', flex: '1' }} m={3}>
        <div className={styled.noSmallDisplay}>{typeof name === 'string' ? <H1>{name}</H1> : name}</div>
        {UI}
      </Box>
    );
  } else {
    typeOfPage = (
      <FlexibleView
        className={`${flexClass}`}
        chatScrollId={chatScrollId}
        ref={(node) => {
          if (node) {
            setScrollTarget(node);
          }
        }}
      >
        {/* {typeof name === 'string' ? <H1>{name}</H1> : name} */}
        {typeof name === 'string' && logo ? (
          <PageTitle logo={logo} name={name} />
        ) : typeof name === 'string' && !logo ? (
          <H1>{name}</H1>
        ) : (
          name
        )}
        {ButtonsUI && ButtonsUI}
        {TopBanner && TopBanner}
        {noRes ? UI : <ResContainer>{UI}</ResContainer>}
      </FlexibleView>
    );
  }

  return (
    <>
      <SlidableView showGradient>
        <Header
          isOnlyCompetition
          trigger={trigger}
          headerSet={
            typeof headerSet !== 'undefined'
              ? { ...headerSet, showLeft: !isOnlyCompetition && headerSet.showLeft }
              : {
                  showRight: true,
                  showLeft: !isOnlyCompetition,
                  overrideLeftButton: false,
                  notify: false,
                }
          }
        />

        {typeOfPage}
      </SlidableView>
    </>
  );
};

export default PageStructure;
