import { API_CALLS } from 'Constants';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { gameDispatch } from './ActionCreators';

const useCompetitionLoader = (actionToDispatch, params = {}, start = true) => {
  const sParams = JSON.stringify(params);
  const res = useSelector((state) => state.AllCompetitions);

  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false);

  const resetApi = () => {
    gameDispatch(API_CALLS.GetAllCompetitions.CLEAR);
  };

  const [stateData, setStateData] = useState({
    games: res?.games,
    competitions: res?.competitions,
    shouldRetry: res?.shouldRetry,
    status: res !== null,
  });
  useEffect(() => {
    if (!start) return;
    if (res === null && !loadingState) {
      dispatch(actionToDispatch(sParams && JSON.parse(sParams)));
      setLoadingState(true);
    } else if (res !== null) {
      setStateData({ ...res, status: true });
    } else if (res === null && stateData.status) {
      setLoadingState(false);
      setStateData({ res: null, status: false, dto: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionToDispatch, res, loadingState, sParams, stateData.status, start]);

  return { ...stateData, resetApi };
};

export default useCompetitionLoader;
