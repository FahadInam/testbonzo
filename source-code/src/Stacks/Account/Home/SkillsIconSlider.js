import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Slider from 'react-slick';
import 'Assets/css/slick.css';
import { IMAGES } from 'Constants';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  slide: {
    padding: theme.spacing(2),
  },
  sliderContainer: {
    maxWidth: '90%',
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0 auto',
    marginTop: '0px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  dFlex: {
    display: 'flex',
    marginBottom: '30px',
  },
  image: {
    width: '45px',
    margin: '0 30px',
  },
}));

const slidesData = [
  {
    id: 1,
    icon: IMAGES.SKILL_ICON_1,
  },
  {
    id: 2,
    icon: IMAGES.SKILL_ICON_2,
  },
  {
    id: 3,
    icon: IMAGES.SKILL_ICON_3,
  },
  {
    id: 4,
    icon: IMAGES.SKILL_ICON_4,
  },
  {
    id: 5,
    icon: IMAGES.SKILL_ICON_5,
  },
  {
    id: 6,
    icon: IMAGES.SKILL_ICON_6,
  },
  {
    id: 7,
    icon: IMAGES.SKILL_ICON_7,
  },
  {
    id: 8,
    icon: IMAGES.SKILL_ICON_8,
  },
  {
    id: 9,
    icon: IMAGES.SKILL_ICON_9,
  },
  {
    id: 10,
    icon: IMAGES.SKILL_ICON_10,
  },
  {
    id: 11,
    icon: IMAGES.SKILL_ICON_11,
  },
  {
    id: 12,
    icon: IMAGES.SKILL_ICON_12,
  },
];

function SkillsIconSlider({ className }) {
  const classes = useStyles();
  const settings = {
    centerMode: true,
    className: `${className} slider variable-width`,
    variableWidth: true,
    infinite: true,
    // centerPadding: '20px',
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    rows: 1, // Set rows to 1 to show a single row
    slidesPerRow: 1, // Ensure slidesPerRow is set to 1
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box className={classes.sliderContainer}>
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <Fade right key={slide.id}>
            <div key={slide.id} className={classes.slide}>
              <img src={slide.icon} alt="Game-based learning" className={classes.image} />
            </div>
          </Fade>
        ))}
      </Slider>
    </Box>
  );
}

export default SkillsIconSlider;
