import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Account, User } from 'Actions';
import { USER } from 'Constants';

const RefreshToken = () => {
  const dispatch = useDispatch();
  const user = User.Info();
  const callRefresh = useSelector((state) => state.AppControl.callRefresh, shallowEqual);
  const AllCompetitions = useSelector((state) => state.AllCompetitions, shallowEqual);

  const isLoggedIn = useSelector((state) => state.User);

  const isAuthUser = User.IsLoggedInUser();


  useEffect(() => {
    if (user.refresh_token) {
      dispatch({ type: USER.SET, payload: 1 });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!sessionStorage.getItem('refreshTokenFetched') && isLoggedIn) {
      dispatch(Account.GetRefreshToken(user));
      sessionStorage.setItem('refreshTokenFetched', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isAuthUser && isLoggedIn && AllCompetitions) {
        dispatch(Account.GetRefreshToken(user));
      }
    }, 60000 * 18); // 18 minutes interval
    // Cleanup function
    return () => clearInterval(intervalId);
  }, [user, isAuthUser, dispatch, AllCompetitions, isLoggedIn, callRefresh]);

  return <div></div>;
};

export default RefreshToken;
