import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from 'Components';


const useStyles = makeStyles((theme) => ({

buttons_container:{
    maxWidth: '540px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px auto',
    '@media (max-width: 638.88px)': {
      maxWidth: 'fit-content',
      borderRadius: '22px',
    },
  },
  active_btn:{
    backgroundColor: '#112D70',
    color: '#FFE500',
    margin: '6px!important',
    '@media (max-width: 638.88px)': {
      width: '125px',
      fontSize: '12px',
      },
    '&:hover':{
      backgroundColor: '#112D70'
    }
  },
  btn:{
    backgroundColor: 'transparent',
    color: '#fff',
    margin: '6px!important',
    '@media (max-width: 638.88px)': {
      width: '125px',
      fontSize: '12px',
      },
    '&:hover':{
      backgroundColor: 'transparent'
    }
  },
}));


 const ToggleTab = React.memo(({labelLeft, labelRight, tagLeft, tagRight, callbackLeft, callbackRight, stateSelected = 0}) => {
    const styled = useStyles();
    return  <Grid className={styled.buttons_container}>
    <Button className={stateSelected === 0 ? styled.active_btn : styled.btn} tag={tagLeft} height={38} onClick={callbackLeft}>
      {labelLeft}
    </Button>
    <Button className={stateSelected === 1 ? styled.active_btn : styled.btn} tag={tagRight} height={38} onClick={callbackRight}>
      {labelRight}
    </Button>
  </Grid>
});

export default ToggleTab;