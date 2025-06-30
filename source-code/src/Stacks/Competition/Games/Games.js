import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { PAGE_STATE } from 'Constants';
import { GetRecommendations } from 'Actions';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { RemoveDuplicates } from 'Utils';
import { PerPageLoader } from 'Components/Loader/PerPageLoader';
import { H1, FlexibleView, SlidableView, Header, NoDataFound } from 'Components';
import { SingleSubjectGames, SingleSubjectGamesLoader } from './LocalComponents';

const Games = React.memo(({ competition, games, isOnlyCompetition }) => {
  // console.log('GAMES..', games)
  // console.log('competition..', competition)
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI = null;
  let PreLoader = null;
  const dispatch = useDispatch();
  const { texts } = useTheme();
  const [callRef, setCallRef] = useState({ sent: false });
  const [scrollNode, setScrollNode] = useState(undefined);
  const pageData = useSelector((state) => state.GetRecommendations, shallowEqual);
  const loadData = useCallback(() => {
    dispatch(GetRecommendations(competition));
  }, [dispatch, competition]);

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    PreLoader = [
      { id: 0, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
      { id: 1, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
      { id: 2, list: [{ id: 0 }, { id: 1 }, { id: 2 }] },
    ].map((item) => {
      return <SingleSubjectGamesLoader item={item} key={item.id} />;
    });
    PageUI = <PerPageLoader PageState={PageState}>{PreLoader}</PerPageLoader>;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
    PageUI = <PerPageLoader PageState={PageState} />;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
    PageUI = <NoDataFound />;
  } else {
    PageState = PAGE_STATE.LOADED;
    const fGames = RemoveDuplicates(pageData, 'subject');
    // console.log('RECOMMENDATIONS HERE', fGames);
    PageUI = fGames.map((item) => {
      return <SingleSubjectGames key={item.subject} title={item.subject} list={pageData} competition={competition} />;
    });
  }

  useEffect(() => {
    if (!pageData && !callRef.sent) {
      loadData();
    }
    setCallRef({ sent: true });
  }, [pageData, loadData, callRef.sent]);

  return (
    <SlidableView showGradient>
      <Header
        isOnlyCompetition
        scrollNode={scrollNode}
        headerSet={{
          showRight: true,
          showLeft: !isOnlyCompetition,
          overrideLeftButton: false,
          notify: true,
        }}
      />
      <FlexibleView
        ref={(node) => {
          if (node) {
            setScrollNode(node);
          }
        }}
      >
        <H1>{texts.GAMES}</H1>
        <ResContainer>{PageUI}</ResContainer>
      </FlexibleView>
    </SlidableView>
  );
});

export default Games;
