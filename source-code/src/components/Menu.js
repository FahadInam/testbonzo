import React from 'react';
import { Menu, makeStyles, ListItemText, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '1299 !important',
    '& .MuiPaper-root': {
      marginTop: theme.spacing(0.5),
    },
    '& .MuiListItem-root': {
      marginTop: theme.spacing(1),
      color: theme.palette.text.secondary,
      '& .MuiListItemIcon-root': {
        fontSize: theme.typography.pxToRem(20),
        color: theme.palette.text.secondary,
        minWidth: '36px',
      },
      '&.MuiListItem-root.Mui-disabled': {
        opacity: 1,
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: 'capitalize',
        '& p': {
          margin: theme.spacing(0.5, 0, 0, 0),
        },
      },
    },
    '& .MuiListItem-root:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiListItem-root:active': {
      color: theme.palette.common.white,
      background: theme.palette.secondary.main,
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiListSubheader-root:focus': {
      outline: 'none',
    },
  },
}));

const MMenu = ({ menuAnchor, callback, children, avAlign, tvAlign, hvAlign }) => {
  const styled = useStyles();
  return (
    <Menu
      elevation={4}
      anchorEl={menuAnchor}
      keepMounted
      open={Boolean(menuAnchor)}
      onClose={() => {
        if (callback) callback('close-menu');
      }}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: avAlign || 'center',
        horizontal: hvAlign || 'center',
      }}
      transformOrigin={{
        vertical: tvAlign || 'center',
        horizontal: hvAlign || 'center',
      }}
      className={styled.root}
    >
      {children}
    </Menu>
  );
};

export { MMenu as Menu };

export const MenuBuilder = ({ list, callback, anchorRef }) => {
  return (
    <MMenu menuAnchor={anchorRef} callback={callback}>
      {list.map((item) => {
        return (
          <MenuItem
            onClick={() => {
              if (callback) callback('selected-item', item);
            }}
            key={item.index}
          >
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        );
      })}
    </MMenu>
  );
};
