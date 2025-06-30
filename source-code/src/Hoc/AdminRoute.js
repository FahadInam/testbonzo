import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { User } from 'Actions';
import { DefaultNav } from 'Navigation/Paths';

const AdminCheckRoute = React.memo(({ component: Component, ...rest }) => {
  const isAuthUser = User.IsLoggedInUser();
  const [AdminUser, setAdminUser] = useState(false);
  if (isAuthUser && !AdminUser) {
    const user = User.Info();
    if (user.user_id === 289 || user.user_id === 288 || user.user_id === 282) {
      setAdminUser(true);
    }
  }
  return <Route {...rest} render={props => (AdminUser ? <Component {...props} /> : <Redirect to={DefaultNav.MAIN.link} />)} />;
});

export default AdminCheckRoute;
