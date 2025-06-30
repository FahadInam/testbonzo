import React from 'react';
import { ListItemText, ListItemIcon, useTheme, MenuItem, makeStyles } from '@material-ui/core';
import { Menu } from 'Components';
import User from 'Actions/user.action';
import { SelectedCompetition } from 'Actions';
import { useLocation } from 'react-router-dom';
import { CompetitionNav } from 'Navigation/Paths';
import { gradeStrResolver } from './Stats';
import { RemoveDuplicates } from 'Utils';

const useStyles = makeStyles((theme) => ({
  lastEle: {
    marginTop: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  baseMenu: {
    color: '#414141!important',
    fontFamily: 'Fredoka',
    fontWeight: '500',
    '& span': {
      fontWeight: '500',
    },
    '& i': {
      color: '#414141!important',
    },
    '&:hover': {
      color: '#ffffff!important',
      '& i': {
        color: '#ffffff!important',
      },
    },
  },
}));

const ProfileMenu = ({
  menuAnchor,
  callback,
  username,
  hideCompetition,
  competition,
  IsMcdUser,
  competitionDetails,
  IsPremiumPurchased = false,
  isShupavu,
  isSubscribed,
}) => {
  //const grades = competition?.item?.grades;
  const grades = competitionDetails?.grades;
  const hasRules = competition?.item?.rules;
  // const isPremium = competition?.item?.is_premium;
  const isPremium = false;

  const isCompetitionSelected = SelectedCompetition.IsSelected();
  // const availableGrades = grades || [];
  const availableGrades = grades ? RemoveDuplicates(grades, 'grade') : [];
  const { state } = useLocation();
  const { texts } = useTheme();
  const styled = useStyles();
  const user = User.Info();

  let isChat = false;

  if (state && state.pathRef) {
    if (state.pathRef.link === CompetitionNav.CHAT.link) {
      isChat = true;
    }
  }

  const GuestUI = (
    <Menu menuAnchor={menuAnchor} callback={callback} avAlign="bottom" tvAlign="top">
      {/* <ListSubheader>{texts.GUEST}</ListSubheader> */}
      <MenuItem data-tag="signup" onClick={callback} className={`${styled.lastEle} ${styled.baseMenu}`}>
        <ListItemIcon>
          <i className="i i-enter" />
        </ListItemIcon>
        <ListItemText primary={texts.CREATE_ACCOUNT} />
      </MenuItem>
      {/* <Divider className={styled.divider} /> */}
      <MenuItem data-tag="logout" onClick={callback} className={`${styled.lastEle} ${styled.baseMenu}`}>
        <ListItemIcon>
          <i className="i i-Sign-out" />
        </ListItemIcon>
        <ListItemText primary={texts.LOGOUT} />
      </MenuItem>
    </Menu>
  );

  const NoCompetitionSelectedUI = (
    <Menu menuAnchor={menuAnchor} callback={callback} avAlign="bottom" tvAlign="top">
      {/* <ListSubheader>{username}</ListSubheader> */}
      <MenuItem className={styled.baseMenu} data-tag="edit-profile" onClick={callback}>
        <ListItemIcon>
          <i className="i i-Update-Profile" />
        </ListItemIcon>
        <ListItemText primary={texts.UPDATE_PROFILE} />
      </MenuItem>
      {/* <MenuItem data-tag="update-password" onClick={callback}>
        <ListItemIcon>
          <i className="i i-key" />
        </ListItemIcon>
        <ListItemText primary={texts.CHANGE_PASSWORD} />
      </MenuItem> */}
      {/* <Divider className={styled.divider} /> */}
      {!IsMcdUser ? (
        <MenuItem data-tag="logout" onClick={callback} className={`${styled.lastEle} ${styled.baseMenu}`}>
          <ListItemIcon>
            <i className="i i-Sign-out" />
          </ListItemIcon>
          <ListItemText primary={texts.LOGOUT} />
        </MenuItem>
      ) : null}
    </Menu>
  );

  const CompetitionMenu = (
    <Menu menuAnchor={menuAnchor} callback={callback} avAlign="bottom" tvAlign="top" hvAlign="right">
      {/* {IsPremiumPurchased && (
        <Box
          sx={{ backgroundColor: palette.common.orange, color: '#fff', marginTop: '-8px', padding: '4px 8px', textAlign: 'center' }}
        >
          {texts.PREMIUM}
        </Box>
      )} */}
      {/* <ListSubheader style={{ backgroundColor: 'white' }}>{texts.COMPETITION}</ListSubheader> */}
      <MenuItem className={styled.baseMenu} data-tag="stats" onClick={callback}>
        <ListItemIcon>
          <i className="i i-Stats" />
        </ListItemIcon>
        <ListItemText primary={texts.STATS} />
      </MenuItem>
      <MenuItem className={styled.baseMenu} data-tag="rewards" onClick={callback}>
        <ListItemIcon>
          <i className="i i-Rewards" />
        </ListItemIcon>
        <ListItemText primary={texts.REWARDS} />
      </MenuItem>

      {availableGrades.length > 1 ? (
        <MenuItem className={styled.baseMenu} data-tag="show-grade-selector" onClick={callback}>
          <ListItemIcon>
            <i className="i i-Change-Grades" />
          </ListItemIcon>
          <ListItemText primary={gradeStrResolver(texts.CHANGE_GRADE, competition)} />
        </MenuItem>
      ) : null}

      {hasRules ? (
        <MenuItem className={styled.baseMenu} data-tag="rules" onClick={callback}>
          <ListItemIcon>
            <i className="i i-Rules" />
          </ListItemIcon>
          <ListItemText primary={texts.RULES} />
        </MenuItem>
      ) : null}

      {/* <MenuItem className={styled.baseMenu} data-tag="faqs" onClick={callback}>
        <ListItemIcon>
          <i className="i i-FAQs" />
        </ListItemIcon>
        <ListItemText primary={texts.FAQS} />
      </MenuItem> */}

      {/* <Divider className={styled.divider} /> */}

      {isPremium ? (
        <MenuItem className={styled.baseMenu} data-tag="show-my-purchases" onClick={callback}>
          <ListItemIcon>
            <i className="i i-My-Purchases" />
          </ListItemIcon>
          <ListItemText primary={texts.MY_PURCHASES} />
        </MenuItem>
      ) : null}

      {isPremium ? (
        <MenuItem className={styled.baseMenu} data-tag="support" onClick={callback}>
          <ListItemIcon>
            <i className="i i-Support" />
          </ListItemIcon>
          <ListItemText primary={texts.SUPPORT} />
        </MenuItem>
      ) : null}

      {/* {isPremium ? <Divider className={styled.divider} /> : null} */}
      {/* 
      <ListSubheader>
        <Box>{username}</Box>
      </ListSubheader> */}

      {isShupavu && isSubscribed ? (
        <MenuItem className={styled.baseMenu} data-tag="my-subscription" onClick={callback}>
          <ListItemIcon>
            <i className="i i-credit-card" />
          </ListItemIcon>
          <ListItemText primary={texts.MY_SUBSCRIPTION} />
        </MenuItem>
      ) : null}

      <MenuItem className={styled.baseMenu} data-tag="edit-profile" onClick={callback}>
        <ListItemIcon>
          <i className="i i-Update-Profile" />
        </ListItemIcon>
        <ListItemText primary={texts.UPDATE_PROFILE} />
      </MenuItem>

      {/* <MenuItem data-tag="update-password" onClick={callback}>
        <ListItemIcon>
          <i className="i i-key" />
        </ListItemIcon>
        <ListItemText primary={texts.CHANGE_PASSWORD} />
      </MenuItem> */}

      {!IsMcdUser ? (
        <MenuItem data-tag="logout" onClick={callback} className={`${styled.lastEle} ${styled.baseMenu}`}>
          <ListItemIcon>
            <i className="i i-Sign-out" />
          </ListItemIcon>
          <ListItemText primary={texts.LOGOUT} />
        </MenuItem>
      ) : null}
    </Menu>
  );

  let UI = GuestUI;
  if (!User.IsGuest()) {
    UI = isCompetitionSelected && !hideCompetition && user.active_role !== 'principal' ? CompetitionMenu : NoCompetitionSelectedUI;
  }

  if (isChat) UI = null;

  return UI;
};

export default ProfileMenu;
