import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box} from '@material-ui/core';
import { IconPaper } from 'Components';
import useStyles from './style';

const ProfileLoader = React.memo((props) => {
  const style = useStyles(props);
  return (
    <Grid item xs={12} className={`${style.row}`} >
      <IconPaper
        iconBg="transparent"
        fullWidth
        className={style.profile_container}
        // icon={
        //   <Box mb={2} mt={2} position="relative">
        //     <Skeleton variant="circle" width={120} height={120} className={style.skeletonCircle} />
        //     <Skeleton variant="circle" width={48} height={48} className={style.skeletonIcon} />
        //   </Box>
        // }
      >
            <Grid style={{width: '100%', display: "flex", justifyContent: "center", alignItems: "center", padding: '8px', gap: "12px"}}>
            <Grid className={style.profile_input_container}>
            <Box className={style.skeleton_column}>
            <Box style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}>
        <Box mb={2} mt={4} position="relative">
          <Skeleton variant="circle" width={120} height={120} className={style.skeletonCircle} />
          <Skeleton variant="circle" width={40} height={40} className={style.skeletonIcon} />
</Box>
        </Box>
        {/* <Box mb={2} mt={2}>
          <Skeleton variant="rect" width={200} height="24px" className={style.skeleton} />
        </Box> */}
        <Box mb={4}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        {/* <Box mb={2} width="300px">
          <Box width="300px" display="flex">
            <Box width="100px" display="flex">
              <Skeleton variant="circle" width={25} height={25} className={style.skeletonCircle} />
              <Box ml={1}>
                <Skeleton ml={1} variant="rect" height="24px" width="50px" className={style.skeleton} />
              </Box>
            </Box>
            <Box width="100px" display="flex">
              <Skeleton variant="circle" width={25} height={25} className={style.skeletonCircle} />
              <Box ml={1}>
                <Skeleton ml={1} variant="rect" height="24px" width="50px" className={style.skeleton} />
              </Box>
            </Box>
            <Box width="100px" display="flex">
              <Skeleton variant="circle" width={25} height={25} className={style.skeletonCircle} />
              <Box ml={1}>
                <Skeleton ml={1} variant="rect" height="24px" width="50px" className={style.skeleton} />
              </Box>
            </Box>
          </Box>
        </Box> */}
        <Box mb={2}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        </Box>
        <Box className={style.skeleton_column}>
        <Box mb={4} mt={2} height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={4}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={4}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        <Box mb={2}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
        </Box>
      </Grid>
      </Grid>
      <Grid className={style.profile_btn_container}>
            <Box className={style.skeleton_column}>
            <Box mb={4}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
            </Box>
            <Box className={style.skeleton_column}>
            <Box mb={4}  height="52px">
          <Skeleton variant="rect" width="100%" height="100%" className={style.skeleton} />
        </Box>
            </Box>
      </Grid>

      </IconPaper>
    </Grid>
  );
});

export default ProfileLoader;
