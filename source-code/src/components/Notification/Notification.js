import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import User from 'Actions/user.action';
import { CompetitionNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';
import NotificationMenus from './NotificationMenu';
import { FromNotification } from '../../Actions/app.control.action';

import useStyles from './style';

window.FromNotification = false;
const Notification = React.memo(() => {
  // let notifyBtnUI = null;
  const [stateRef, setStateRef] = useState({
    menuAnchor: null,
  });

  const styled = useStyles();

  const callback = (e) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'settings':
        setStateRef({ ...stateRef, menuAnchor: e.currentTarget });
        break;
      case 'Messages':
        PageSwitch(CompetitionNav.FRIENDS);
        setStateRef({ ...stateRef, menuAnchor: null });
        FromNotification.NotifyTrue();
        FromNotification.NotifyTo('Messages');
        break;
      case 'invitations':
        PageSwitch(CompetitionNav.COMPETITION_HOME);
        setStateRef({ ...stateRef, menuAnchor: null });
        FromNotification.NotifyTrue();
        FromNotification.NotifyTo('invitations');
        break;
      case 'result':
        PageSwitch(CompetitionNav.COMPETITION_HOME);
        setStateRef({ ...stateRef, menuAnchor: null });
        FromNotification.NotifyTrue();
        FromNotification.NotifyTo('result');
        break;
      default:
        setStateRef({ ...stateRef, menuAnchor: null });
        break;
    }
  };

  // notifyBtnUI = (
  //   <Box ml={1}>
  //     <IconButton data-tag="settings" onClick={callback} className={styled.iconBtn}>
  //       <i className="i i-notification_bell" />
  //     </IconButton>
  //   </Box>
  // );
  return (
    <>
      <NotificationMenus menuAnchor={stateRef.menuAnchor} callback={callback} username={User.NameResolver()} />
      <Grid container className={styled.MainContainer}>
        {/* {notifyBtnUI} */}
      </Grid>
    </>
  );
});

export default Notification;
