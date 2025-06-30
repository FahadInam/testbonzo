import React, { useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Slider from 'react-slick';
import 'Assets/css/slick.css';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  railItem: {
    width: '100%',
    padding: theme.spacing(0.5, 2),
    paddingTop: '32px',
    // '@media (max-width: 638.88px)': {
    //   transform: 'scale(0.6)',
    // },
  },
}));

const LessonListRail = ({ children }) => {
  const videoLink = useSelector((state) => state.GetCompetitionVideoLink, shallowEqual);
  const sliderRef = useRef();
  if (sliderRef.current) sliderRef.current.slickGoTo(videoLink?.videoIndex || null);
  const { breakpoints } = useTheme();
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    slide: null,
    centerMode: true,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: breakpoints.values.md - 1,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} ref={sliderRef}>
      {children}
    </Slider>
  );
};

export default LessonListRail;

export const LessonListRailItem = ({ children }) => {
  const styled = useStyles();
  return <div className={styled.railItem}>{children}</div>;
};
