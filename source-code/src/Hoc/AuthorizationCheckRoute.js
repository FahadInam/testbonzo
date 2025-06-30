import React from 'react';
import { Route } from 'react-router-dom';
import { User } from 'Actions';
import DefaultRoute from './DefaultRoute';

const AuthorizationCheckRoute = React.memo(({ component: Component, ...rest }) => {
  const isAuthUser = User.IsLoggedInUser();
  const isGuest = User.IsGuest();

  return (
    <Route
      {...rest}
      render={(props) => ((!isAuthUser && isGuest) || (isAuthUser && isGuest) ? <Component {...props} /> : <DefaultRoute />)}
    />
  );
});

export default AuthorizationCheckRoute;
