import React from 'react';
import { Grid, makeStyles, useTheme, Box } from '@material-ui/core';
import { Paper } from 'Components';
import { Body1, Subtitle2 } from './Core';
import { IMAGES } from 'Constants';
import { CompetitionNav } from 'Navigation/Paths';
import { PageSwitch } from 'Navigation';
import { InlineButton } from './Core/Button';
import { shallowEqual, useSelector } from 'react-redux';
import { SelectedCompetition } from 'Actions';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '150px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    // color: theme.palette.common.white,
    color: (props) => props.textColor || theme.palette.common.white,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& i': {
      fontSize: '90px',
    },
  },
  played_image: {
    maxWidth: '400px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    '& img': {
      width: '100%',
    },
  },
  notFoundBg: {
    backgroundColor: (props) => props.backgroundColor || 'rgba(0,0,0,0.3)!important',
    // background: 'rgba(0,0,0,0.5)!important',
  },
  no_data_desc: {
    textAlign: 'center',
    padding: '0 6px',
    fontSize: '17px',
  },
}));

const NoDataFound = ({ noDataMsg, backgroundColor, textColor, isGamesCompleted, noDataDesc, isExpired }) => {
  const styled = useStyles({ backgroundColor, textColor });
  const { texts } = useTheme();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const selectedComp = SelectedCompetition.StrToObj(competitionStr);

  const locked_messages = noDataDesc ? JSON.parse(selectedComp?.item?.locked_messages) : null;

  const renderMessageWithButton = (message, buttonText) => {
    return message.split('My Games').map((part, index, array) => (
      <React.Fragment key={index}>
        {part}
        {index < array.length - 1 && (
          <InlineButton tag="forgot-pass" onClick={() => PageSwitch(CompetitionNav.GAMES)}>
            <Subtitle2 color="#02BBFE" fontWeight="600">
              {buttonText}
            </Subtitle2>
          </InlineButton>
        )}
      </React.Fragment>
    ));
  };

  // let icon = 'sadcircle';
  if (noDataMsg === texts.COMING_SOON); //icon = 'box';
  if (noDataMsg === texts.ALL_GAMES_PLAYED); //icon = 'games';
  return (
    <Grid item xs={12}>
      <Paper className={styled.notFoundBg}>
        <Box m={2} mt={4} className={noDataMsg === texts.ALL_GAMES_PLAYED || isGamesCompleted ? styled.played_image : styled.image}>
          {/* <i className={`i i-${icon}`} /> */}
          <img
            src={noDataMsg === texts.ALL_GAMES_PLAYED || isGamesCompleted ? IMAGES.ALL_GAMES_COMPLETED : IMAGES.NO_DATA_FOUND_IMAGE}
            alt="Game-based learning"
            width={500}
            className={styled.imageStyle}
          />
        </Box>
        <Body1
          mt={noDataMsg === texts.ALL_GAMES_PLAYED || noDataMsg === texts.DAILY_GAMES_COMPLETED || isExpired ? 0 : 2}
          mb={noDataMsg === texts.DAILY_GAMES_COMPLETED || isExpired ? 0 : 4}
          className={noDataMsg === texts.DAILY_GAMES_COMPLETED || isExpired ? '' : 'poppins-font-500'}
          styleCSS={{ fontSize: noDataMsg === texts.DAILY_GAMES_COMPLETED || isExpired ? '22px' : '' }}
          textAlign="center"
          color={textColor || 'white'}
        >
          {noDataMsg || texts.NO_DATA_FOUND}
        </Body1>
        {noDataDesc && (
          <p className={styled.no_data_desc}>
            {!isExpired && locked_messages?.weekly?.eng ? (
              renderMessageWithButton(locked_messages.weekly.eng, texts.MY_GAMES)
            ) : isExpired && locked_messages?.expired?.eng ? (
              renderMessageWithButton(locked_messages.expired.eng, texts.MY_GAMES)
            ) : (
              <>
                {isExpired ? texts.YOU_CAN_GO : texts.GAMES_WILL_UNCLOCK}
                <InlineButton tag="forgot-pass" onClick={() => PageSwitch(CompetitionNav.GAMES)}>
                  <Subtitle2 color="#02BBFE" fontWeight="600">
                    {texts.MY_GAMES}
                  </Subtitle2>
                </InlineButton>
                {isExpired ? texts.TO_PLAY_PLAYED : texts.TO_PLAY_EXISTING}
              </>
            )}
          </p>
        )}
      </Paper>
    </Grid>
  );
};

export default NoDataFound;
