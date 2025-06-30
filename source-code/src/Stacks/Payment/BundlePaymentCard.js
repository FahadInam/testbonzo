import React from 'react';
import { IMAGES } from 'Constants';
import { useTheme } from '@material-ui/core';
import useStyles from './style';

const COLOR_CONFIG = {
  daily: {
    bgColor: '#79005A',
    textColor: '#79005A',
    gameNumberColor: '#EF5E99',
  },
  weekly: {
    bgColor: '#007400',
    textColor: '#007400',
    gameNumberColor: '#00FF00',
    // discountText: 'Save 14%',
    perdayText: '6 Games / day',
    perdayTextBg: '#DEF9E6',
  },
  monthly: {
    discountBgColor: '#0086FF',
    bgColor: '#003C96',
    textColor: '#003C96',
    gameNumberColor: '#00C6FF',
    discountText: 'Save 40%',
    perdayText: '6 Games / day',
    perdayTextBg: '#E5EDFB',
  },
};

const GAMES_COUNT = {
  daily: 10,
  weekly: 70,
  monthly: 300,
};

const DEFAULT_COLORS = {
  bgColor: '#006400',
  textColor: '#000000',
  gameNumberColor: '#FFFFFF',
};

const BundlePaymentCard = ({ bundle, isSelected, onClick }) => {
  const bundleType = bundle.title.toLowerCase();
  const { texts } = useTheme();
  const styled = useStyles();
  const image = IMAGES[`${bundleType.toUpperCase()}_BUNDLE_IMAGE`] || IMAGES.DAILY_BUNDLE_IMAGE;
  const colors = COLOR_CONFIG[bundleType] || DEFAULT_COLORS;
  const [gamesCount] = bundle.description.split(' ');
  const gameCount = GAMES_COUNT[bundleType] || 10;

  return (
    <div className={`bundle-card ${isSelected ? 'selected-card' : ''}`} onClick={onClick}>
      <div className="bundle-card-content">
        {colors.discountText && (
          <div className="bundle-discount" style={{ backgroundColor: colors?.discountBgColor ?? colors.bgColor }}>
            <span className="discount-text poppins-font-700">{colors.discountText}</span>
          </div>
        )}
        <div className="bundle-card-inner bundle-card-shadow">
          <div className="bundle-shape-box">
            <div className="bundle-icon">
              <img src={image} alt={`${bundle.title} Bundle Icon`} />
            </div>
            <div className="bundle-shape-container" style={{ backgroundColor: colors.bgColor }}>
              <span className="bundle-title">{bundle.title}</span>
            </div>
            <div>
              <span className="bundle-fix-title" style={{ color: colors.textColor }}>
                {texts.BUNDLE}
              </span>
            </div>
          </div>

          <h4 className="bundle-games-count">
            <span className="game-number-plus text-shadow-custom" style={{ color: colors.gameNumberColor }}>
              {gamesCount}
            </span>
            <span className="games-count-title">{texts.GAMES}</span>
            {colors.perdayText && (
              <span className="games_badge" style={{ color: colors.bgColor, backgroundColor: colors.perdayTextBg }}>
                {colors.perdayText}
              </span>
            )}
          </h4>

          <div className="bundle-pricing">
            <span className="currency-title">KES</span>
            <span className="bundle-amount text-shadow-custom">{bundle.amount}</span>
          </div>
          <p className={styled.payment_description}>Up for {gameCount} Games For Form 2</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BundlePaymentCard);
