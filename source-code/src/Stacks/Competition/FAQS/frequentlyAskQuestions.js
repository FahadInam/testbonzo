/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useTheme, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Body1, SupportBanner } from 'Components';
import { PAGE_STATE } from 'Constants';
import PageStructure from '../shared/PageStructure';
// import ProfileLoader from './ProfileLoader';
import useStyles from './style';
import DATA from './content';

const FrequentlyAskQuestions = ({ competition }) => {
  let PageState = PAGE_STATE.IS_LOADING;
  let PageUI;
  let PreLoader = null;
  const { texts } = useTheme();
  const [stateRef] = useState(DATA);
  const pageData = stateRef;
  const styled = useStyles();

  const ExpandMoreIconUI = (
    // eslint-disable-next-line react/button-has-type
    <button tag="left-btn" className={styled.iconBtn}>
      <i className="i i-bottom" />
    </button>
  );

  const accordionSummaryStyle = (index, icon) => {
    if (index === 0) return styled.summaryWithTopRadius;
    if (index === pageData.length - 1 && !icon) return styled.summaryWithBottomRadius;
    return styled.summaryOpen;
  };

  const AccordionUI = ({ question, answer, icon, id }, index) => (
    <Accordion key={id} className={styled.accordin}>
      <AccordionSummary expandIcon={ExpandMoreIconUI} className={accordionSummaryStyle(index, icon)}>
        <Body1 className={styled.question}>{question}</Body1>
      </AccordionSummary>
      <AccordionDetails className={styled.answerOpen}>
        <Body1 className={styled.answer}>
          {answer.split('Rs. 299').join(`${competition?.ticket_cost || '299'} ${competition?.ticket_currency || 'PKR'} `)}
        </Body1>
      </AccordionDetails>
    </Accordion>
  );

  const chatUI = (
    <SupportBanner
      competition={{ is_mcd: true, is_premium: true }}
      noBottomMargin
      // showActivationMessage={
      //   pageData[pageData.length - 1].transaction_mode.trim().toLowerCase() === 'otc' &&
      //   pageData[pageData.length - 1].transaction_status === 1
      // }
    />
  );

  // const chatUI = (
  //   <Paper className={styled.chatContainer} elevation={0}>
  //     <Body1 textAlign="center" m={0} className={styled.chatText}>
  //       <WriteString text={texts.FAQS_CHAT_TEXT} />
  //     </Body1>
  //     <Button m={0} className={styled.chatButton}>
  //       {texts.FAQS_BUTTON_CHAT_TEXT}
  //     </Button>
  //   </Paper>
  // );

  const questionsUI = (
    <Grid item xs={12} className={styled.grid}>
      {pageData.map((item, index) => AccordionUI(item, index))}
    </Grid>
  );

  if (!pageData) {
    PageState = PAGE_STATE.IS_LOADING;
    //  PreLoader = <ProfileLoader />;
  } else if (pageData.shouldRetry) {
    PageState = PAGE_STATE.RETRY;
  } else if (pageData.length === 0) {
    PageState = PAGE_STATE.NO_DATA_TO_SHOW;
  } else {
    PageState = PAGE_STATE.LOADED;
    PageUI = (
      <>
        {chatUI}
        {questionsUI}
      </>
    );
  }
  return (
    <>
      <PageStructure
        name={texts.FREQUENTLY_ASK_QUESTIONS}
        PreLoader={PreLoader}
        PageState={PageState}
        PageUI={PageUI}
        // callback={loadData}
        className={styled.grid}
      />
    </>
  );
};

export default FrequentlyAskQuestions;
