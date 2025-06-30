import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTheme } from '@material-ui/core';

import { Congrats as CongratsAction, User } from 'Actions';
import ConfirmationBox from '../ConfirmationBox';
import { Numbers } from '../../Utils';

import useStyles from './style';

const Congrats = () => {
  const congrats = useSelector((state) => state.AppControl.congrats, shallowEqual);
  const styled = useStyles();
  const user = User.Info();
  const { texts } = useTheme();
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'overlay':
      case 'close':
      case 'continue-positive':
        CongratsAction.Hide();
        break;
      default:
        break;
    }
  };
  const secondaryText = (
    <>
      {texts.AWARDED}
      <span className={styled.coins}>{Numbers.AbbreviatedNumber(user.points)}</span>
      {texts.PERFORMANCE_POINTS}
    </>
  );
  return (
    <ConfirmationBox
      visible={Boolean(congrats)}
      callback={callback}
      icon="migration"
      allowClose
      title={texts.LSP_ACCOUNT}
      primary={texts.CHAMP_ON_LSP}
      secondary={secondaryText}
      positive={texts.CONTINUE}
      tag="continue"
    />
  );
};

export default Congrats;
