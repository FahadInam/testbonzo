import React from 'react';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { Body1 } from 'Components/Core';
import Paper from 'Components/Paper';
import ImageRotation from './ImageRotation';
// import Image from './Image';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '165px',
    width: '100%',
    // minWidth: '200px',
    maxWidth: '31.5%',
    // maxWidth: '49%',
    overflow: 'hidden',
    position: 'relative',
    // margin: '10px 10px 10px 10px',
    backgroundColor: '#D5DBEA',
    '@media (max-width: 888px)': {
      maxWidth: '48%',
    },
    '@media (max-width: 638.88px)': {
      maxWidth: '80%',
    },
    '@media (max-width: 460px)': {
      maxWidth: '100%',
    },
  },
  rootB: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  image: {
    width: '39px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    background: (props) => props.imgBackground || null,
    [theme.breakpoints.up('md')]: {
      maxWidth: (props) => props.imgWidth || '288px',
      maxHeight: '39px',
    },

    '& img': {
      width: '100%',
      maxWidth: (props) => props.imgWidth || '100%',
    },
  },

  skeletonCircle: {
    background: theme.palette.action.skeleton,
    minWidth: '60px',
    width: '60px',
    height: '60px',
  },

  skeletonNumber: {
    background: theme.palette.action.skeleton,
    width: '100%',
    height: '16px',
    marginTop: '30px',
    borderRadius: '5px',
  },

  skeletonTitle: {
    background: theme.palette.action.skeleton,
    width: '100%',
    height: '16px',
    borderRadius: '5px',
    marginTop: '5px',
  },

  // skeleton: {
  //   background: theme.palette.action.skeleton,
  //   height: '180px',
  //   width: '372px',
  // },
}));

export const ReportCard = React.memo(({ item }) => {
  //console.log('item', item);
  if (!item) return;
  const { icon, number, title } = item;
  const styled = useStyles();
  const { palette } = useTheme();

  // console.log('item', item);

  return (
    <Paper p={0} className={styled.root}>
      <div className={styled.rootB}>
        <Box className={styled.image} style={{ background: 'inherit', position: 'relative' }}>
          <ImageRotation srcList={icon} rotationSpeed={5000} showLoader={false} />
        </Box>

        <Box textAlign="center" pb={1} pt={1}>
          <Box height={'20px'}>
            <Body1 color={palette.text.secondary} fontSize="24px" fontWeight="700">
              {typeof number === 'string'
                ? number
                : typeof number === 'number'
                ? Number.isInteger(number)
                  ? number
                  : parseFloat(number.toFixed(2))
                : 0}
            </Body1>
          </Box>
        </Box>

        <Box textAlign="center" pb={1} pt={1}>
          {title && (
            <Box height={'20px'}>
              <Body1 fontSize="18px" color="#777777" className="poppins-font-400">
                {title}
              </Body1>
            </Box>
          )}
        </Box>
      </div>
    </Paper>
  );
});

export const ReportCardLoader = React.memo(({ item: { primary, secondary }, chip }) => {
  const styled = useStyles();
  return (
    <Paper p={0} className={styled.root}>
      <div className={styled.rootB}>
        <Box className={styled.image} style={{ background: 'inherit', position: 'relative' }}>
          <Skeleton variant="circle" className={styled.skeletonCircle} />
        </Box>

        <Box textAlign="center" style={{ minWidth: '120px' }}>
          <Box height={'20px'}>
            <Skeleton variant="rect" width="100%" height={16} className={styled.skeletonNumber} />
          </Box>
        </Box>

        <Box textAlign="center" style={{ minWidth: '200px' }}>
          <Box height={'20px'}>
            <Skeleton variant="rect" width="100%" height={16} className={styled.skeletonTitle} />
          </Box>
        </Box>
      </div>
    </Paper>
  );
});
