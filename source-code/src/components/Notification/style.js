import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    width: 'auto',
  },
  skeleton: {
    background: theme.palette.action.skeleton,
    borderRadius: theme.shape.borderRadius,
  },
  iconBtn: {
    width: '40px',
    height: '40px',
    background: theme.palette.background.paper,
    color: theme.palette.grey['500'],
    '&:hover': {
      background: theme.palette.background.paper,
      color: theme.palette.grey['500'],
    },
  },
  lastEle: {
    marginTop: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  Main: {
    margin: '20px',
  },
  avatarIcon: {
    position: 'absolute',
    /* top: 29px; */
    right: '0',
    bottom: '-5px',
  },
  ListItemIcon: {
    '&.MuiListItemIcon-root': {
      minWidth: '56px !important',
    },
  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    '& .MuiListItem-root': {
      marginTop: 0,
    },
    '& .MuiListSubheader-root': {
      display: 'flex',
      alignItems: 'center',
      height: '36px',
    },

    '& .MuiListItem-root:hover': {
      backgroundColor: theme.palette.common.grey[200],
      color: theme.palette.common.grey[700],
    },
  },
}));
export default useStyles;
