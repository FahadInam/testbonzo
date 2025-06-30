// CustomSlider.js
import { Avatar, Box, Card, CardContent, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'Assets/css/slick.css';
import { Body1 } from 'Components';
import { lightenColor } from 'Utils';
import { CompetitionCard, CompetitionCardLoader } from 'Stacks/Competition/AllCompetitions/LocalComponents';
import { DEMO_USER } from 'Constants';
import { useDispatch } from 'react-redux';
import { Account } from 'Actions';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    width: '100%',
    minWidth: '450px',
    minHeight: '295px',
    margin: '0 auto',
    padding: '15px',
    boxShadow: 'rgb(201 226 246) 0px 10px 0px -3px',
    [theme.breakpoints.down('md')]: {
      minHeight: '315px',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '340px',
      maxWidth: '340px',
      // minHeight: '315px',
    },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 15,
  },
  slide: {
    padding: theme.spacing(2),
  },
  slideSpacing: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  sliderContainer: {
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  dFlex: {
    display: 'flex',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '15px',
      alignItems: 'center',
    },
  },
  thumbnailFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    borderRadius: '20px',
  },
  cardText: {
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}));

function CustomSlider({ className, slidesData, slidesToShow, is_demo_competitions, texts, competitions, status }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = () => {
    setDragging(true);
  };

  const handleAfterChange = () => {
    setDragging(false);
  };

  const settings = {
    centerMode: true,
    className: `${className} slider variable-width`,
    variableWidth: is_demo_competitions ? false : true,
    infinite: true,
    centerPadding: '300px',
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    slidesToShow: slidesToShow,
    arrows: is_demo_competitions ? false : true,
    dots: is_demo_competitions ? true : false,
    draggable: true, // Enable dragging
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: is_demo_competitions ? slidesToShow : 3,
          slidesToScroll: 3,
          infinite: true,
          centerPadding: is_demo_competitions ? '100px' : '30px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: is_demo_competitions ? slidesToShow : 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerPadding: is_demo_competitions ? '100px' : '30px',
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: is_demo_competitions ? '30px' : '30px',
          centerMode: is_demo_competitions ? false : true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: is_demo_competitions ? '30px' : '30px',
          centerMode: is_demo_competitions ? false : true,
        },
      },
    ],
  };
  let pageUI;
  const callback = (item) => {
    // console.log('item.url...', item?.url);
    // const newUrl = `${window.location.origin}/competitions/${item.url}`;
    dispatch(
      Account.GuestLogin({ email: DEMO_USER.email, password: DEMO_USER.password, mode: DEMO_USER.mode, url: item?.url }, texts)
    );
  };
  if (!status) {
    pageUI = [0, 1, 2].map((item, index) => (
      <div className={classes.slideSpacing} key={index}>
        <CompetitionCardLoader key={item} landingCompetitionCard />
      </div>
    ));
  } else if (status) {
    pageUI = competitions?.map((item, index) => {
      if (!item.is_public || item.is_semi_private === 1) return null;
      return (
        <div className={`${classes.slideSpacing} sCompetitionCard`} key={index} data-sid={item?.name?.toLowerCase()}>
          <CompetitionCard
            //  Login_Type={Login_Type}
            key={item.name}
            item={item}
            // callback={() => callback(item)}
            callback={() => !dragging && callback(item)}
            //  user={user}
            //  isPremiumUser={isPremiumUser}
            texts={texts}
            landingCompetitionCard={true}
          />
        </div>
      );
    });
  }

  return (
    <Box className={classes.sliderContainer}>
      <Slider {...settings}>
        {is_demo_competitions
          ? pageUI
          : slidesData.map((slide) => (
              <div key={slide.id} className={classes.slide}>
                {slide.type === 'thumbnail' ? (
                  <img src={slide.src} alt={slide.alt} className={classes.image} />
                ) : (
                  <Card className={classes.card}>
                    <CardContent>
                      <Box className={classes.dFlex}>
                        <Box>
                          <Avatar style={{ backgroundColor: lightenColor(slide.iconColor, 12) }} className={classes.avatar}>
                            <Body1 fontSize="24px" fontWeight="600" color={slide.iconColor}>
                              {slide.name.charAt(0)}
                            </Body1>
                          </Avatar>
                        </Box>
                        <Box textAlign="left" className={classes.thumbnailFlex}>
                          <Body1 fontSize="20px" fontWeight="700" color="#2C2A50">
                            {slide.name}
                          </Body1>
                          <Body1 fontSize="14px" fontWeight="400" color="#AAB0D8" className="poppins-font-400">
                            {slide.designation}
                          </Body1>
                        </Box>
                      </Box>
                      <Box align="left">
                        <Body1 className={`${classes.cardText} poppins-font-400`} textAlign="left" color="#8B8B8B">
                          {slide.testimonial}
                        </Body1>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
      </Slider>
    </Box>
  );
}

export default CustomSlider;
