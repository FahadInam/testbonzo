import React, { useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Slider from 'react-slick';
import 'Assets/css/slick.css';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  railItem: {
    width: '100%',
    padding: theme.spacing(0.5, 2),
    '@media (max-width: 638.88px)': {
      // transform: 'scale(0.6)',
    },
  },
}));

const MyGamesRail = ({ children, list }) => {
  const videoLink = useSelector((state) => state.GetCompetitionVideoLink, shallowEqual);
  const sliderRef = useRef();
  if (sliderRef.current) sliderRef.current.slickGoTo(videoLink?.videoIndex || null);
  // const isFewItems = list?.length < 3;
  const settings = {
    dots: false,
    arrows: list?.length > 3,
    infinite: false,
    slidesToShow: 3, // always 3 to preserve spacing
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 920, // Mobile
        settings: {
          slidesToShow: 1,
          arrows: list?.length > 1, // Show arrows if more than 1 item
        },
      },
      // {
      //   breakpoint: 1155, // Tablet
      //   settings: {
      //     slidesToShow: 2,
      //     arrows: list?.length > 2, // Show arrows if more than 2 items
      //   },
      // },
      {
        breakpoint: 1400, // Tablet
        settings: {
          slidesToShow: 2,
          arrows: list?.length > 2,
        },
      },
    ],
  };
  return (
    <div className={`my_games_slider ${list?.length < 3 ? 'my_games_slider_web' : ''}`}>
      <Slider {...settings} ref={sliderRef} className="recommendation_slider">
        {children}
      </Slider>
    </div>
  );
};

export default MyGamesRail;

export const RailItem = ({ children }) => {
  const styled = useStyles();
  return <Box className={styled.railItem}>{children}</Box>;
};
