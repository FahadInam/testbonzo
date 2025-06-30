import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box } from '@material-ui/core';
import { IconPaper } from 'Components';
import useStyles from './style';

const SchoolLoader = React.memo((props) => {
  const style = useStyles(props);
  return (
    <Grid item xs={12} className={style.row}>
      <IconPaper 
      // icon="school"
      className={style.select_school_box}
      >
        <Box mb={4} mt={1} style={{gap: '20px', display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Skeleton variant="circle" className={style.skeletonNumberCircle} height="45px" width="45px" />
          <Skeleton variant="rect" width={200} height="28px" className={style.skeleton} />
        </Box>
        <Box mb={2} width="90%" height="50px">
          <Skeleton variant="rect" width="100%" height="100%" style={{borderRadius: "8px"}} className={style.skeleton} />
        </Box>
        <Box mb={4} mt={4} textAlign="center" width="250px" height="42px">
          <Skeleton variant="rect" width="250px" height="42px" className={style.skeletonButton} />
        </Box>
      </IconPaper>
    </Grid>
  );
});

export default SchoolLoader;
