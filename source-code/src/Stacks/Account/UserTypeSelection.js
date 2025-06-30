import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Body1 } from 'Components';
import { CardButton } from 'Components/Core/Button';
import { IMAGES } from 'Constants';
import { getInstanceText } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    // marginTop: '125px',
    // marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // [theme.breakpoints.down('md')]: {
    //   marginTop: '30px',
    // },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px !important',
      paddingRight: '20px !important',
    },
  },
}));

function UserTypeSelection({ texts, callback }) {
  const classes = useStyles();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  return (
    <Box className={`sSignUpModeSelection ${classes.mainBox}`}>
      <Grid container direction="row" justifyContent="center" spacing={3} className={classes.container}>
        <Grid item xs={12} sm={12} mb={6}>
          <Body1 className="poppins-font-600" fontSize="24px" textAlign="center" color="#313644">
            {getInstanceText(texts, 'USING_PLAYBONZO_TEXT', Inst_config.instance_id)}
          </Body1>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CardButton
            tag="as-learner"
            onClick={callback}
            title={texts.AS_A_LEARNER}
            titleTagLine={texts.A_LEARNER_TAGLINE}
            imageUrl={IMAGES.LEARNER_IMAGE}
            imageWidth="110px"
            cardWidth="85%"
            margin="0 auto"
            shadowColor="#fff"
            userSelectionCard
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CardButton
            tag="as-institute"
            onClick={callback}
            title={getInstanceText(texts, 'AS_AN_INSTITUTE', Inst_config.instance_id)}
            titleTagLine={getInstanceText(texts, 'AN_INSTITUTE_TAGLINE', Inst_config.instance_id)}
            imageUrl={IMAGES.INSTITUTE_IMAGE}
            imageWidth="110px"
            cardWidth="85%"
            margin="0 auto"
            shadowColor="#fff"
            userSelectionCard
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserTypeSelection;
