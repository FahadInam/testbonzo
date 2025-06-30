import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: (props) => (props.fullWidth ? '316px' : '316px'),
    maxWidth: (props) => (props.fullWidth ? '100%' : '100%'),
    [theme.breakpoints.up('sm')]: {
      minWidth: (props) => (props.fullWidth ? '382px' : '382px'),
      maxWidth: (props) => (props.fullWidth ? '100%' : '446px'),
    },
    [theme.breakpoints.up('md')]: {
      minWidth: (props) => (props.fullWidth ? '639px' : '639px'),
      maxWidth: (props) => (props.fullWidth ? '639px' : '639px'),
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: (props) => (props.fullWidth ? '960px' : '960px'),
      maxWidth: (props) => (props.fullWidth ? '960px' : '960px'),
      // minWidth: (props) => (props.fullWidth ? '1060px' : '1060px'),
      // maxWidth: (props) => (props.fullWidth ? '1060px' : '1060px'),
    },
    [theme.breakpoints.up('xl')]: {
      minWidth: (props) => (props.fullWidth ? '960px' : '960px'),
      maxWidth: (props) => (props.fullWidth ? '960px' : '960px'),
      // minWidth: (props) => (props.fullWidth ? '1060px' : '1060px'),
      // maxWidth: (props) => (props.fullWidth ? '1060px' : '1060px'),
    },
  },
  SimpleResMain: {
    display: 'flex',
    justifyContent: 'center',
  },
  SimpleRes: {
    margin: '-16px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
}));

const ResContainer = ({ children, className, boxClassName, ...rest }) => {
  const styleWithNav = useStyles(rest);
  return (
    <Box display="flex" justifyContent="center" className={boxClassName}>
      <Grid container spacing={4} className={`${styleWithNav.root} ${className || ''}`}>
        {children}
      </Grid>
    </Box>
  );
};

export default ResContainer;

export const SimpleResContainer = ({ children, className, boxClassName, ...rest }) => {
  const styleWithNav = useStyles(rest);
  return (
    <div className={`${styleWithNav.boxClassName} ${styleWithNav.SimpleResMain}`}>
      <div className={`${styleWithNav.root} ${styleWithNav.SimpleRes} ${className || ''}`}>{children}</div>
    </div>
  );
};

export const ResGrid = ({ children }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      {children}
    </Grid>
  );
};
