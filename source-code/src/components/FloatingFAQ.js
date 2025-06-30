import { makeStyles } from '@material-ui/core';
import { IMAGES } from 'Constants';
import React, { useRef, useState } from 'react';
import { Body1, H4, Input } from './Core';
import { faqsData } from 'Constants/faq.constants';
import { getInstanceType } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  main_faq_container: {
    position: 'fixed',
    right: '24px',
    bottom: '24px',
    '@media (max-width: 440px)': {
      right: '16px',
      bottom: '16px',
    },
  },
  faq_box: {
    width: '375px',
    minHeight: '524px',
    transition: `all 350ms cubic-bezier(0.44, 0, 0.43, 1)`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    overflow: 'hidden',
    '@media (max-width: 440px)': {
      width: '320px',
      minHeight: '500px',
    },
  },
  faq_box_hide: {
    width: '80px',
    minHeight: '80px',
    transition: `all 1150ms cubic-bezier(0.44, 0, 0.43, 1)`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    overflow: 'hidden',
    '@media (max-width: 440px)': {
      width: '60px',
      minHeight: '70px',
    },
  },

  faqButton: {
    width: '72px',
    height: '72px',
    cursor: 'pointer',
    backgroundColor: '#02BBFE',
    borderRadius: '50%',
    border: 'none',
    outline: 'none',
    boxShadow: '0px 4px 4px 0px rgba(255, 255, 255, 0.12)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    '@media (max-width: 440px)': {
      width: '54px',
      height: '54px',
      '& img': {
        width: '30px',
        height: '30px',
        objectFit: 'contain',
      },
    },
  },
  name_heading: {
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '30px',
    padding: '20px 20px',
    background: 'linear-gradient(0deg, #fff 20.89%, #5BCEFF 129.04%)',
  },
  faq_name_heading: {
    fontWeight: '600',
    fontSize: '24px',
    textAlign: 'center',
    lineHeight: '30px',
    position: 'relative',
  },
  faq_detail_heading: {
    fontWeight: '600',
    fontSize: '24px',
    padding: '20px 20px',
    color: 'black',
  },
  input: {
    '& input': {
      fontSize: '14px !important',
      padding: '14px 40px 14px 14px !important',
    },
  },
  input_box: {
    margin: '0px 20px',
    position: 'relative',
  },
  faq_input_box: {
    transform: 'translateY(-4px)',
    margin: '0px 20px',
    position: 'relative',
  },
  send_icon: {
    position: 'absolute',
    top: '12px',
    right: '4px',
    cursor: 'pointer',
    padding: '10px',
  },
  faq_header: (props) => ({
    backgroundColor: '#112D70',
    padding: '6px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  faq_home_container: (props) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '370px',
    overflowY: 'auto',
  }),
  transition_container: (props) => ({
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: 'white',
    color: '#112D70',
    transition: 'all 450ms cubic-bezier(0.44, 0, 0.43, 1)',
    height: props.yes ? '420px' : '0px',
    maxHeight: '420px',
    width: props.yes ? '100%' : '0px',
    transform: props.yes ? 'translateY(0px) translateX(0px)' : 'translateY(380px) translateX(-15px)',
    opacity: props.yes ? 1 : 0,
    zIndex: props.yes ? 1 : -1,
    borderRadius: props.yes ? '10px' : '100px 100px 0px 10px',
    boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.1)',
  }),
  home_page: (props) => ({
    height: '100%',
    transition: 'all 200ms cubic-bezier(0.44, 0, 0.43, 1)',
    transform: props.activePage === 'home' ? 'translateX(0px)' : 'translateX(-375px)',
  }),
  faq_page: (props) => ({
    height: '1%',
    transition: 'all 200ms cubic-bezier(0.44, 0, 0.43, 1)',
    transform:
      props.activePage === 'faq'
        ? 'translateY(-420px) translateX(0px)'
        : props.activePage === 'faq_detail'
        ? 'translateX(-375px) translateY(-420px)'
        : 'translateX(375px) translateY(-420px)',
  }),
  faq_detail_page: (props) => ({
    overflowY: 'hidden',
    transition: 'all 200ms cubic-bezier(0.44, 0, 0.43, 1)',
    transform: props.activePage === 'faq_detail' ? 'translateY(-424px) translateX(0px)' : 'translateX(750px) translateY(-420px)',
  }),
  faq_avatar: {
    margin: '12px auto 0px auto',
    textAlign: 'center',
  },
  single_faq: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '0px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all .3s easo-out',
    '&:hover': {
      backgroundColor: '#F5F6F7',
    },
    '& svg': {
      marginLeft: '6px',
    },
  },
  no_faq: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '0px 20px',
  },
  faq_heading: {
    margin: '0px 20px',
    padding: '4px 10px',
    '& span': {
      fontSize: '16px',
      fontWeight: '700',
      color: '#112D70',
      fontFamily: 'Poppins',
    },
  },
  faq_question: {
    fontFamily: 'Poppins',
    fontSize: '14px',
  },
  back_icon: {
    position: 'absolute',
    padding: '4px 0px 4px 8px',
    left: '20px',
    cursor: 'pointer',
    rotate: '-180deg',
  },
  faq_desc: {
    fontFamily: 'Poppins',
    color: 'black',
    fontSize: '13px',
    fontWeight: '400',
    margin: '0px 20px 20px 20px !important',
    transform: 'translateY(-8px)',
  },
  faq_feedback: {
    fontFamily: 'Poppins',
    color: 'black',
    fontSize: '13px',
    fontWeight: '500',
    borderTop: '1px solid #e2e2e2',
    padding: '20px 20px 0px 20px',
    textAlign: 'center',
  },
  faq_desc_list: {
    fontFamily: 'Poppins',
    color: 'black',
    fontSize: '13px',
    fontWeight: '400',
    transform: 'translateY(-8px)',
  },
}));

const FloatingFAQ = () => {
  const [yes, setYes] = useState(false);
  const [activePage, setActivePage] = useState('faq');
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const styled = useStyles({ yes, activePage });
  const divRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(''); // To store the input value
  const [invalidSearch, setInvalidSearch] = useState('');

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    const specialCharPattern = /[^a-zA-Z0-9\s]/;

    if (specialCharPattern.test(query)) {
      setInvalidSearch(true);
      setSearchQuery(query);
    } else {
      setInvalidSearch(false);
      setSearchQuery(query);
    }
  };

  // Filter the FAQs based on search query
  const filteredFaqs = faqsData?.filter(
    (item) =>
      item?.heading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.question?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleButtonClick = () => {
    setYes(!yes);
    if (!yes) {
      setActivePage('faq');
    }
  };

  if (isGlobalClimate || true) {
    return <></>;
  }

  return (
    <div className={styled.main_faq_container}>
      <div className={yes ? styled.faq_box : styled.faq_box_hide}>
        <div className={`${styled.transition_container} custom_scrollbar`}>
          <div className={styled.home_page}>
            <div className={styled.faq_home_container}></div>
          </div>
          {/* faq screen */}
          <div className={styled.faq_page}>
            <div className={styled.faq_header}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ objectFit: 'contain', width: '30px', height: '30px' }} src={IMAGES.FAQ_ICON} alt="" />
                <H4 styleCSS={{ color: 'white', fontSize: '14px', padding: '10px' }}>Frequently Asked Questions</H4>
              </div>
            </div>
            <div className={styled.faq_home_container} ref={divRef}>
              <div style={{ flex: '1', paddingBottom: '10px' }}>
                <div className={styled.faq_avatar}>
                  <img src={IMAGES.FAQ_AVATAR} alt="" />
                </div>
                <h1 className={styled.faq_name_heading}>Helpful FAQs for You! </h1>
                <div className={styled.faq_input_box}>
                  <Input placeholder={'Search for help'} className={styled.input} value={searchQuery} onChange={handleSearchChange} />
                  <img className={styled.send_icon} src={IMAGES.SEARCH_ICON} alt="" />
                </div>
                {/* faqs list */}
                {!invalidSearch && filteredFaqs.length > 0 ? (
                  filteredFaqs.map((item, index) => {
                    return (
                      <div key={index}>
                        {item?.heading ? (
                          <div className={styled.faq_heading}>
                            <Body1>{item?.heading}</Body1>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setSelectedQuestion(item);
                              setActivePage('faq_detail');
                            }}
                            className={styled.single_faq}
                          >
                            <Body1 className={styled.faq_question}>{item?.question}</Body1>
                            <ArrowIcon color={'black'} width="6" height="8" />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : invalidSearch ? (
                  <div className={styled.no_faq}>
                    <Body1 className={styled.faq_question}>Invalid entry, try again</Body1>
                  </div>
                ) : (
                  <div className={styled.no_faq}>
                    <Body1 className={styled.faq_question}>No matches found</Body1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* faq detail screen */}
          <div className={styled.faq_detail_page}>
            <div className={styled.faq_header}>
              <div onClick={() => setActivePage('faq')} className={styled.back_icon}>
                <ArrowIcon color={'#F1F5F7'} width="8" height="13" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ objectFit: 'contain', width: '30px', height: '30px' }} src={IMAGES.FAQ_ICON} alt="" />
                <H4 styleCSS={{ color: 'white', fontSize: '14px', padding: '10px' }}>Frequently Asked Questions</H4>
              </div>
            </div>
            <div className={styled.faq_home_container} ref={divRef}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '366px',
                }}
              >
                <div>
                  <h1 className={styled.faq_detail_heading}>{selectedQuestion?.question} </h1>
                  <p className={styled.faq_desc}>{selectedQuestion?.answer} </p>
                </div>
                {/* <div>
                  <p className={styled.faq_feedback}>Did this answer your question?</p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateY(-8px)' }}>
                    <span role="img" style={{ fontSize: '20px' }} aria-label="emoji-sad">
                      {' '}
                      😞{' '}
                    </span>
                    <span role="img" style={{ fontSize: '20px', margin: '0px 10px' }} aria-label="emoji-satisfy">
                      {' '}
                      😐{' '}
                    </span>
                    <span role="img" style={{ fontSize: '20px' }} aria-label="emoji-happy">
                      😃{' '}
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* action btn */}
        <button
          onClick={handleButtonClick}
          className={`${styled.faqButton} up_down_animate`}
          style={{ overflow: 'hidden', position: 'relative' }}
        >
          <img
            alt="faq-img"
            src={IMAGES.QUESTION_IMG}
            style={{
              transform: yes ? 'translateY(-60px)' : 'translateY(0px)',
              opacity: yes ? '0' : '1',
              transition: 'all 200ms cubic-bezier(0.44, 0, 0.43, 1)',
              position: 'absolute',
            }}
          />
          <div
            style={{
              transform: yes ? 'translateY(0px)' : 'translateY(60px)',
              opacity: yes ? '1' : '0',
              transition: 'all 200ms cubic-bezier(0.44, 0, 0.43, 1)',
              position: 'absolute',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 21 12" fill="none">
              <path
                d="M10.5441 7.35914L17.6 0.558625C17.9735 0.200829 18.4786 -8.43462e-07 19.0052 -8.66479e-07C19.5318 -8.89497e-07 20.037 0.200829 20.4104 0.558625C20.5972 0.737212 20.7455 0.949682 20.8467 1.18378C20.9479 1.41788 21 1.66897 21 1.92257C21 2.17617 20.9479 2.42726 20.8467 2.66136C20.7455 2.89546 20.5972 3.10793 20.4104 3.28651L11.9592 11.4318C11.7739 11.6118 11.5535 11.7547 11.3106 11.8523C11.0677 11.9498 10.8072 12 10.5441 12C10.2809 12 10.0204 11.9498 9.77753 11.8523C9.53464 11.7547 9.31419 11.6118 9.1289 11.4318L0.578064 3.28652C0.393331 3.10701 0.247181 2.89413 0.147991 2.66007C0.0487991 2.42602 -0.00148244 2.17539 3.38918e-05 1.92257C-0.00148246 1.66975 0.0487991 1.41912 0.147991 1.18507C0.24718 0.951013 0.393331 0.73813 0.578063 0.558626C0.951515 0.200829 1.4567 -9.94093e-08 1.98327 -1.22427e-07C2.50985 -1.45444e-07 3.01503 0.200829 3.38848 0.558626L10.5441 7.35914Z"
                fill="white"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FloatingFAQ;

const ArrowIcon = ({ color, width, height }) => {
  return (
    <svg
      style={{ minWidth: width, minHeight: height }}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 6 8"
      fill="none"
    >
      <path
        d="M3.56631 3.98321L0.732761 1.29524C0.583678 1.15297 0.5 0.960521 0.5 0.759921C0.5 0.559321 0.583678 0.366871 0.73276 0.224604C0.807171 0.153435 0.8957 0.0969462 0.993241 0.0583968C1.09078 0.0198474 1.1954 3.7632e-07 1.30107 3.67082e-07C1.40674 3.57844e-07 1.51136 0.0198473 1.6089 0.0583967C1.70644 0.0969461 1.79497 0.153435 1.86938 0.224604L5.26323 3.4441C5.33826 3.51469 5.3978 3.59867 5.43844 3.6912C5.47908 3.78373 5.5 3.88297 5.5 3.98321C5.5 4.08345 5.47908 4.1827 5.43844 4.27523C5.3978 4.36776 5.33826 4.45174 5.26323 4.52233L1.86938 7.77979C1.79459 7.85016 1.70589 7.90584 1.60836 7.94362C1.51084 7.98141 1.40641 8.00056 1.30107 7.99999C1.19573 8.00056 1.0913 7.98141 0.993779 7.94362C0.896256 7.90584 0.807554 7.85016 0.732761 7.77979C0.583679 7.63752 0.5 7.44507 0.5 7.24447C0.5 7.04387 0.583679 6.85142 0.732761 6.70915L3.56631 3.98321Z"
        fill={color}
      />
    </svg>
  );
};
