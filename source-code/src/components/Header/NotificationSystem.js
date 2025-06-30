import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import { Box, Grid, useTheme, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { AvatarSwitcher } from 'Constants';
import { SelectedCompetition, Account, AccountPopUp } from 'Actions';
import { GetUserNotifications } from 'Actions/competitions.action';
import ProfileMenu from 'Components/ProfileMenu';
import SidePanel from 'Components/SidePanel';
import { SettingsNav, DefaultNav, CompetitionNav } from 'Navigation/Paths';
import User from 'Actions/user.action';
import { PageSwitch } from 'Navigation';
import { Numbers, IsEmptyObject } from 'Utils';
import Rules from 'Components/Rules/Rules';
import { H3 } from '../Core';
import ConfirmationBox from '../ConfirmationBox';
import CoinIcon from '../CoinIcon';
import useStyles from './style';

const NotificationSystem = React.memo(({ hideCoins }) => {

});

export default NotificationSystem;