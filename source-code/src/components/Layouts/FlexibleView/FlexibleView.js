import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './style';

const FlexibleView = React.forwardRef(({ children, className, chatScrollId, ...style }, ref) => {
  const styled = useStyles(style);
  return (
    <Grid item ref={ref} id={chatScrollId || 'scrollingId'} className={`${styled.root} ${chatScrollId || ''} ${className || ''} `}>
      {children}
    </Grid>
  );
});

export default FlexibleView;
