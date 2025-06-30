import React from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';
import { H6, H2, Body1, Button, FlexibleView } from 'Components';
import useStyle from './style';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import { McdUser } from 'Utils';

const McdErrorScreen = () => {
  const styled = useStyle();
  const { texts, palette } = useTheme();
  return (
    <Grid container className={styled.root}>
      <FlexibleView
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        className={styled.view}
      >
        <Box m={2} className={styled.image}>
          <i className="i i-error" />
        </Box>
        <Box textAlign="center" className={styled.text}>
          <H2 textAlign="center" color={palette.common.red}>
            {texts.OOPS}
          </H2>
          <H6 m={1} color={palette.grey['600']}>
            {texts.SOME_THING_WRONG}
          </H6>
        </Box>

        <Body1 textAlign="center" color={palette.grey['300']} m={3}>
          {texts.MCD_ERROR}
        </Body1>

        <Button
          mb={2}
          m={4}
          className={styled.retry}
          onClick={() => {
            // console.log('Retry');
            McdUser.Login();
            PageSwitch(DefaultNav.MCD);
          }}
        >
          {texts.RETRY}
        </Button>
      </FlexibleView>
    </Grid>
  );
};

export default McdErrorScreen;
