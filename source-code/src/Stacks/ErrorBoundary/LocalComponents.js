import React from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';
import { Body1, FlexibleView, H4 } from 'Components';
import useStyle from './style';
import { Cordova } from 'Utils';
import { IMAGES } from 'Constants';
import ButtonBold from 'Components/Core/ButtonBold';
import { persistor } from 'Store';
const ErrorPage = () => {
  const styled = useStyle();
  const { texts, palette } = useTheme();

  const handleRetry = () => {
    persistor.purge().then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <div className="bonzo_star_bg_grad">
        <div className="bonzo_star_bg_img"></div>
      </div>
      <Grid container className={styled.root}>
        <FlexibleView
          display="flex"
          flexDirection="column"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          className={styled.view}
        >
          <Box className={styled.page_container}>
            <Box mb={4} className={styled.image}>
              <img width={180} height={180} src={Cordova.Path(IMAGES.ERROR)} alt="icon" />
            </Box>
            <Box textAlign="center">
              <H4 color={palette.common.gray} styleCSS={{ textAlign: 'center', fontSize: '28px', fontWeight: '600' }}>
                {texts.SOME_THING_WRONG}
              </H4>
            </Box>

            {process.env.REACT_APP_IS_APP === '0' ? (
              <>
                <Body1
                  color={'black'}
                  mt={4}
                  styleCSS={{ fontFamily: 'poppins', maxWidth: '420px', textAlign: 'center', fontSize: '14px' }}
                >
                  {texts.SORRY_TRY_AGAIN}
                </Body1>
                <Box mt={4} style={{ maxWidth: '200px', width: '100%' }}>
                  <ButtonBold yellowBubble secondaryYellow onClick={handleRetry}>
                    {texts.RETRY}
                  </ButtonBold>
                </Box>
              </>
            ) : (
              <Body1 color={'black'} mt={4} styleCSS={{ fontFamily: 'poppins' }}>
                {texts.TRY_RESTART}
              </Body1>
            )}
          </Box>
        </FlexibleView>
      </Grid>
    </>
  );
};

export default ErrorPage;
