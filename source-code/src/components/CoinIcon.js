import React from 'react';
import { SelectedCompetition } from 'Actions';
import { Cordova, IsEmptyObject } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';

export default function CoinIcon({ height, width, position, left, top }) {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const coinsImage = Inst_config ? Inst_config.images.coin_icon : '';

  let coinImageUrl = coinsImage;
  const competition = SelectedCompetition.Info();

  if (!IsEmptyObject(competition) && competition.item) {
    coinImageUrl = coinsImage || competition.item.coin_image;
  }
  return (
    <img
      src={Cordova.Path(coinImageUrl)}
      alt="logo"
      height={height || '24px'}
      width={width || '24px'}
      style={{
        objectFit: 'contain',
        margin: '0px 0px 0px 0px',
        position: position || 'relative',
        left: left || '0',
        top: top || '0px',
        bottom: '0',
      }}
    />
  );
}
