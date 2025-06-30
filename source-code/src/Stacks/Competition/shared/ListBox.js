import React from 'react';
import {
  Box,
  List,
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { H4, Paper, Body2, Body1, NoDataFound } from 'Components';
import { AvatarSwitcher } from 'Constants';
import { ListPrimaryText } from '../Overview/LocalComponents';
import { isString } from 'Utils';

const useStyles = makeStyles((theme) => ({
  list___box: {
    '@media (max-width: 638.88px)': {
      // transform: 'scale(0.8)',
    },
  },
  heightAdjustment: {
    height: '100%',
    width: '100%',
  },
  rootB: {
    position: 'relative',
    width: '70px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left',
    // [theme.breakpoints.up('md')]: {
    //   width: '100px!important',
    // },
  },
  rootC: {
    position: 'relative',
    width: 'auto',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // border: "1px solid red",
    // textAlign: 'center',
    // [theme.breakpoints.up('md')]: {
    //   width: '100px!important',
    // },
  },
  rootD: {
    position: 'relative',
    width: '18%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // border: "1px solid red",
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '25%',
    },
  },
  header: {
    background: theme.palette.grey['220'],
    // padding: theme.spacing(2),
    padding: theme.spacing(10 / 8),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#ffffff',
    zIndex: 1,
    height: '56px',
    [theme.breakpoints.down('md')]: {
      // padding: theme.spacing(2),
      padding: theme.spacing(10 / 8),
    },
  },
  headerTextHeadings: {
    background: theme.palette.grey['220'],
    padding: '16px 20px',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    color: '#fffff',
    zIndex: 1,
  },
  headerHeadingsTitle: {
    // padding: '6px 20px',
    color: '#ffffff',
    // whiteSpace: 'nowrap' /* Prevents the text from wrapping */,
    // overflow: 'hidden' /* Ensures that the overflow is hidden */,
    // textOverflow: 'ellipsis' /* Adds the ellipsis */,
    width: '100%' /* Ensures the element takes up the full width of its container */,
    display: 'block' /* Ensures the element behaves as a block */,
  },
  icon: {
    height: '45px',
    width: '45px',
    marginRight: theme.spacing(2),
    '& img': {
      width: '100%',
    },
  },
  currentUser: {
    backgroundColor: `${theme.palette.primary.blueBonzo}!important`,
  },
  list: {
    padding: theme.spacing(1),
    '& li': {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '50%',
        flex: '0 0 50%',
        padding: theme.spacing(0, 1),
        margin: theme.spacing(0.5, 0),
      },
    },
    '& .MuiListItem-gutters': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: '16px',
    },

    '& .MuiListItemText-primary': {
      fontSize: '1rem',
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap' /* Prevent text from wrapping */,
      overflow: 'hidden' /* Hide the overflowing text */,
      textOverflow: 'ellipsis' /* Add the "..." at the end of the truncated text */,
      marginRight: '12px',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
      },
    },
    '& .MuiListItemText-secondary': {
      fontSize: '0.875rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
      fontWeight: theme.typography.fontWeightLight,
      color: theme.palette.grey['400'],
      wordBreak: 'break-word',
    },
    '& .MuiIconButton-root': {
      fontSize: '1.5rem',
      color: '#c3c7d0',
    },
    '& .MuiListItemAvatar-root': {
      minWidth: '40px',
      marginRight: '16px',
    },
    '& li:nth-of-type(2n+1) .MuiListItem-gutters': {
      background: theme.palette.grey['100'],
    },
    '& li:nth-of-type(2n+1).MuiListItem-gutters': {
      background: theme.palette.grey['100'],
    },
    '& .MuiListItem-button:hover': {
      background: theme.palette.action.skeleton,
    },
    '& li:nth-of-type(2n+1) .MuiListItem-button:hover': {
      background: theme.palette.action.skeleton,
    },
    '& li:nth-of-type(2n+1).MuiListItem-button:hover': {
      background: theme.palette.action.skeleton,
    },

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      display: 'flex',
      flexWrap: 'wrap',

      '& li:nth-of-type(2n+1) .MuiListItem-gutters': {
        background: 'transparent',
      },
      '& li:nth-of-type(2n+1).MuiListItem-gutters': {
        background: 'transparent',
      },

      '& li:nth-of-type(4n+1) .MuiListItem-gutters': {
        background: theme.palette.grey['100'],
      },
      '& li:nth-of-type(4n+1).MuiListItem-gutters': {
        background: theme.palette.grey['100'],
      },
      '& li:nth-of-type(4n+2) .MuiListItem-gutters': {
        background: theme.palette.grey['100'],
      },
      '& li:nth-of-type(4n+2).MuiListItem-gutters': {
        background: theme.palette.grey['100'],
      },

      '& li:nth-of-type(4n+1) .MuiListItem-button:hover': {
        background: theme.palette.action.skeleton,
      },
      '& li:nth-of-type(4n+1).MuiListItem-button:hover': {
        background: theme.palette.action.skeleton,
      },
      '& li:nth-of-type(4n+2) .MuiListItem-button:hover': {
        background: theme.palette.action.skeleton,
      },
      '& li:nth-of-type(4n+2).MuiListItem-button:hover': {
        background: theme.palette.action.skeleton,
      },
      '& .MuiIconButton-edgeEnd': {
        marginRight: '-4px',
      },
      '& .MuiListItem-secondaryAction': {
        paddingRight: '56px',
      },
    },
  },
  towActionPadding: {
    paddingRight: theme.spacing(12),
  },
  noButton: {
    [theme.breakpoints.up('lg')]: {
      margin: '4px 8px !important',
      maxWidth: 'calc(50% - 16px) !important',
      padding: '8px 8px !important',
    },
  },
  noResList: {
    padding: theme.spacing(0, 1, 2),
    '& .MuiListItem-gutters': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: '16px',
    },
    // '& .MuiListItem-button:hover': {
    //   background: theme.palette.action.skeleton,
    // },
    '& .MuiListItemText-primary': {
      fontSize: '1rem',
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap' /* Prevent text from wrapping */,
      overflow: 'hidden' /* Hide the overflowing text */,
      textOverflow: 'ellipsis' /* Add the "..." at the end of the truncated text */,
      marginRight: '12px',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    '& .MuiListItemText-secondary': {
      fontSize: '0.7rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.6rem',
      },
      fontWeight: theme.typography.fontWeightLight,
      color: theme.palette.grey['400'],
      wordBreak: 'break-word',
    },
    '& .MuiIconButton-root': {
      fontSize: '1.25rem',
      color: theme.palette.grey['300'],
    },
    '& .MuiListItemAvatar-root': {
      minWidth: '40px',
      marginRight: '16px',
    },
    '& li:nth-of-type(1)': {
      marginTop: theme.spacing(1),
    },
    '& li:nth-of-type(2n+1) .MuiListItem-gutters': {
      background: theme.palette.grey['100'],
    },
    '& li:nth-of-type(2n+1).MuiListItem-gutters': {
      background: theme.palette.grey['100'],
    },
    '& .MuiListItem-button:hover': {
      background: theme.palette.action.skeleton,
    },
    '& li:nth-of-type(2n+1) .MuiListItem-button:hover': {
      background: theme.palette.action.skeleton,
    },
    '& li:nth-of-type(2n+1).MuiListItem-button:hover': {
      background: theme.palette.action.skeleton,
    },
  },

  image: {
    width: '150px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.white,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& i': {
      fontSize: '90px',
    },
  },
  list_header_font: {
    '& H4': {
      fontWeight: '500',
      fontSize: '18px',
    },
  },
  scrollHeight: {
    maxHeight: '420px',
    overflow: 'auto',
  },
  listItemTextStyle: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: '35px',
    },
  },
}));

const ListBox = React.memo((props) => {
  const { title, icon, items, tableHeading, noResponsive, overrideTitleWithHeadings, playerRankData, noTitleBar } = props;
  const styled = useStyles();
  // let itemsNew = items;
  // console.log('playerRankData: ', playerRankData);
  // if(playerRankData)
  // {
  //   // items.push();
  // }
  return (
    <Paper p={0} className={`${styled.heightAdjustment} ${styled.list___box}`}>
      {title && !overrideTitleWithHeadings && !noTitleBar && (
        <Box className={styled.header}>
          {icon && <Box className={styled.icon}>{icon}</Box>}
          <Body1 color="#fff" fontSize="18px" className="fredoka-one-400">
            {title}
          </Body1>
        </Box>
      )}
      {overrideTitleWithHeadings && (
        <Grid className={styled.headerTextHeadings} container>
          {/* <Box className={styled.headerTextHeadings} p={1}> */}

          {/* </Box> */}
          {overrideTitleWithHeadings?.map((el, ind) => {
            return (
              <div key={`A_${ind}`} className={ind === 0 ? styled.rootB : ind === 1 ? styled.rootC : styled.rootD}>
                <small className={styled.headerHeadingsTitle}>{el}</small>
              </div>
            );
          })}
        </Grid>
      )}

      <List className={`${noResponsive ? styled.noResList : styled.list} ${styled.scrollHeight}`}>
        {playerRankData}
        {tableHeading && (
          <OneListItem
            item={{
              //  ...item,
              primary: <ListPrimaryText forHeading={true} name={'Games'} points={'Avg.Score'} points2={`${'Completed By'}`} />,
              tag: 'games_report',
            }}
            // secondary={<SecondaryText merge1={`${item.completed_by} of ${item.total_players}`} merge2="have completed" />}
            // secondary={<SecondaryText merge1={`${item.title}`} merge2="" />}
            //  key={index}
          />
        )}
        {items}
      </List>
    </Paper>
  );
});

export default ListBox;

export const OneListItem = React.memo(
  ({
    item,
    callback,
    noButton,
    endIcon,
    towAction,
    secondary,
    noResponsive,
    className = '',
    currentUser = false,
    noButtonIcon = false,
  }) => {
    const styled = useStyles();
    const { primary, avatar } = item;
    const localCallback = (e) => {
      if (callback) callback(e, item);
    };

    const dataSid = isString(primary?.props?.children) ? primary?.props?.children.toLowerCase() : '';
    // const dataSid = data_sid
    // ? data_sid.toLowerCase()
    // : isString(children?.props?.children)
    // ? children.props.children.toLowerCase()
    // : isString(children)
    // ? children.toLowerCase()
    // : '';

    return (
      <ListItem
        button={!noButton}
        data-tag="primary"
        data-sid={dataSid}
        onClick={localCallback}
        className={`${towAction ? styled.towActionPadding : ''} ${noButton && !noResponsive ? styled.noButton : ''} ${className} ${
          currentUser && styled.currentUser
        } sList`}
      >
        {avatar && (
          <ListItemAvatar>
            <AvatarSwitcher t={avatar} s={40} />
          </ListItemAvatar>
        )}
        <ListItemText primary={primary} secondary={secondary} className={styled.listItemTextStyle} />
        {endIcon && (
          <ListItemSecondaryAction style={{ cursor: 'pointer' }} data-tag="primary" onClick={localCallback}>
            {typeof endIcon === 'string' ? (
              <>
                {noButtonIcon && <i className={`i i-${endIcon} bonzoui__list__side__icon`} />}
                {/* {noButtonIcon && <i className={`i i-waiting bonzoui__list__side__icon`} />} */}
                {!noButtonIcon && (
                  <IconButton edge="end" data-tag="secondary" onClick={localCallback}>
                    <i className={`i i-${endIcon}`} />
                  </IconButton>
                )}
              </>
            ) : (
              endIcon
            )}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
);

const useListItemLoader = makeStyles((theme) => ({
  skeleton: {
    background: theme.palette.action.skeleton,
    marginBottom: theme.spacing(1),
    borderRadius: 4,
  },
  skeletonCircle: {
    background: theme.palette.action.skeleton,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
}));

export const OneListItemLoader = React.memo(({ secondary, avatar, endIcon, primary }) => {
  const styled = useListItemLoader();
  return (
    <ListItem>
      {typeof avatar === 'undefined' ? (
        <ListItemAvatar>
          <Skeleton variant="circle" width={40} height={40} className={styled.skeletonCircle} />
        </ListItemAvatar>
      ) : (
        avatar
      )}
      <ListItemText
        primary={
          primary || (
            <Skeleton
              variant="rect"
              width="90%"
              height={16}
              className={`${styled.skeleton} ${!secondary ? styled.noBottomMargin : ''}`}
            />
          )
        }
        secondary={secondary && <Skeleton variant="rect" width="70%" height={16} className={styled.skeleton} />}
      />
      {endIcon && (
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <Skeleton variant="circle" width={32} height={32} className={styled.skeletonCircle} />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
});

export const SecondaryText = ({ merge1, merge2, thirdLine }) => {
  return (
    <>
      <Body2>{`${merge1} ${merge2}`}</Body2>
      {thirdLine && (
        <>
          {/* <br /> */}
          {thirdLine}
        </>
      )}
    </>
  );
};

export const NoDataListBox = React.memo((props) => {
  const { title, icon, overrideTitleWithHeadings, noTitleBar, NoDataText } = props;
  const styled = useStyles();

  return (
    <Paper p={0} className={`${styled.heightAdjustment} ${styled.list___box}  ${styled.list_header_font}`}>
      {title && !overrideTitleWithHeadings && !noTitleBar && (
        <Box className={`${styled.header} ${styled.list_header_font}`}>
          {icon && <Box className={styled.icon}>{icon}</Box>}
          <H4 color="#fffff" className="fredoka-one-400">
            {title}
          </H4>
        </Box>
      )}

      <Box>
        <Grid item xs={12}>
          <NoDataFound noDataMsg={NoDataText} backgroundColor="transparent" textColor="gray" />
        </Grid>
      </Box>
    </Paper>
  );
});
