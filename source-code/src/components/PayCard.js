import { Box, Grid, Paper, makeStyles, useTheme } from '@material-ui/core';
import React from 'react';
import { Body1, Button, ButtonText, H5 } from './Core';

const useStyles = makeStyles((theme) => ({
  competition_card_container: {
    boxShadow: '#000 0px 13px 1px -1px',
    borderRadius: '24px',
    marginBottom: '16px',
  },
  competition_card: {
    boxShadow: '#D5DBEA 0px 10px 0px -1px',
  },
  inviteCard: {
    padding: '26px 46px',
    '@media (max-width: 1023px)': {
      padding: '24px 26px',
    },
    '@media (max-width: 638.88px)': {
      padding: '24px 20px',
    },
  },
  inviteCard_title: {
    fontWeight: 700,
    fontSize: '24px',
    color: theme.palette.common.gray,
    marginBottom: '14px',
  },
  join_btn: {
    background: '#02BBFE',
    width: '100%',
    height: 'auto',
    borderRadius: '14px',
    padding: '8px 22px',
    fontWeight: 600,
    margin: '32px auto 0px auto !important',
    '@media (max-width: 1023px)': {
      padding: '6px 18px',
    },
    '&:hover': {
      background: '#02BBFE',
    },
    '@media (max-width: 638.88px)': {
      margin: '28px auto 0px auto !important',
    },
  },
  card_desc: {
    width: '94%',
    '@media (max-width: 638.88px)': {
      width: '100%',
    },
    '& span': {
      fontFamily: 'Poppins',
      fontSize: '18px',
      fontWeight: 400,
      color: '#191B29',
      '@media (max-width: 638.88px)': {
        fontSize: '16px',
      },
    },
  },
}));

// const proceedTo = () => {
//   console.log("here")
//       // PageSwitch(defaultNavConstants.PAYMENT);
// };

const PayCard = ({ item, texts, is_disable, callback, ...rest }) => {
  const style = useStyles(rest);
  const { palette } = useTheme();

  if (is_disable) {
    return <></>;
  }
  return (
    <Grid item xs={12}>
      <Box className={style.competition_card_container}>
        <Paper p={1} className={`${style.root} ${style.competition_card}`} background={palette.common.white}>
          <Box className={style.inviteCard}>
            <H5 className={style.inviteCard_title}>{texts.PAY_FOR_ACCESS_TITLE}</H5>
            <Box className={style.card_desc}>
              <Body1>{texts.PAY_FOR_ACCESS_TEXT}</Body1>
            </Box>
            <Button className={style.join_btn} tag="Payment" onClick={callback}>
              <ButtonText color="#FFF" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
                {texts.CONTINUE_TO_PAY}
              </ButtonText>
            </Button>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};

export default PayCard;
