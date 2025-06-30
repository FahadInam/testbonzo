import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { IMAGES, PAGE_STATE } from 'Constants';
import { Body1, H4 } from 'Components/Core';
// import { RetryApiRequest } from '../../Actions/api.action';
import { persistor } from 'Store';

import useStyle from './style';
import { Cordova } from 'Utils';
import { FlexibleView } from 'Components/Layouts';
import ButtonBold from 'Components/Core/ButtonBold';

export const PerPageLoader = React.memo((props) => {
  const { texts } = useTheme();
  // const dispatch = useDispatch();
  const styled = useStyle();
  const { PageState, children } = props;
  return PageState === PAGE_STATE.RETRY ? (
    <Box p={2} className={styled.root}>
      {/* <Box m={2} className={styled.image}>
        <i className="i i-timeout" />
      </Box>
      <Box m={2} textAlign="center" className={styled.text}>
        <H2 className={styled.mainH}>{texts.SERVER_ACCESS_FAIL}</H2>
        <Body1 m={1} className={styled.subH}>
          {texts.RETRY_TO_CONNECT}
        </Body1>
      </Box>
      <Button
        m={4}
        mb={2}
        onClick={() => {
          // dispatch(RetryApiRequest());
          persistor.purge().then(() => {
            window.location.reload();
          });
        }}
        tag="retry"
      >
        {texts.RETRY}
      </Button> */}
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
            <img width={240}
            style={{transform: "Scale(1.2)"}}
            height={320} src={Cordova.Path(IMAGES.NO_INTERNET_IMAGE)} alt="icon" />
          </Box>
          <Box textAlign="center">
            <H4 color={'white'} styleCSS={{ textAlign: 'center', fontSize: '28px', fontWeight: '600' }}>
              {texts.SERVER_ACCESS_FAIL}
            </H4>
          </Box>
          <>
            <Body1
              color={'white'}
              mt={4}
              styleCSS={{ fontFamily: 'poppins', maxWidth: '420px', textAlign: 'center', fontSize: '16px' }}
            >
              {texts.RETRY_TO_CONNECT}
            </Body1>
            <Box mt={4} style={{ maxWidth: '200px', width: '100%' }}>
              <ButtonBold yellowBubble secondaryYellow blackShadow
                onClick={() => {
                  // dispatch(RetryApiRequest());
                  persistor.purge().then(() => {
                    window.location.reload();
                  });
                }}
                tag="retry"
              >
                {texts.RETRY}
              </ButtonBold>
            </Box>
          </>
        </Box>
      </FlexibleView>
    </Box>
  ) : (
    <>{children}</>
  );
});

export default PerPageLoader;
