/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';
// import Skeleton from '@material-ui/lab/Skeleton';
import { H1, Body2, Button, IconPaper, WriteString } from 'Components';
import { parseSearchURL, friendlyDate } from 'Utils';
import { GetUserTransactions } from 'Actions';
import { useDispatch } from 'react-redux';
import useStyle from './style';

const McdPaymentSuccess = () => {
  const styled = useStyle();
  const { texts } = useTheme();
  const dispatch = useDispatch();
  const urlParams = parseSearchURL(window.location.search);

  const Grade = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  const [response, setResponse] = useState('');
  const [stateRef, setStateRef] = useState({
    transactionId: '',
    competition: '',
    grade: '',
    paymentAmount: '',
    date: '',
    transaction_status: 1,
  });
  const [successScreen, setSuccessScreen] = useState(1); // 0/1 fail, 2 pending, 3 success

  const dto = {
    user_id: urlParams.u_id,
    competition_id: urlParams.c_id,
    session_id: urlParams.s_id,
    current_grade: parseInt(Grade, 10),
  };
  // console.log('urlParams: ', urlParams);
  // console.log('dto: ', dto);
  const loadData = useCallback(() => {
    dispatch(
      GetUserTransactions(
        dto,
        (data) => {
          setResponse(data);
        },
        true
      )
    );
  }, [dispatch, dto]);

  //  console.log(response, 'loadData');

  useEffect(() => {
    loadData();
  }, []);

  const TransactionStatus = (sn) => {
    let St = 0;
    const s = parseInt(sn, 10);
    if (s === 0) {
      St = 0;
    } else if (s === 1) {
      St = 2;
    } else if (s === 2) {
      St = 3;
    } else if (s === 3) {
      St = 1;
    } else if (s === 4) {
      St = 2;
    } else if (s === 5) {
      St = 3;
    }
    return St;
  };

  const TransactionMode = (modeN) => {
    let Mode = '';
    const mode = modeN.trim().toUpperCase();
    if (mode === 'OTC') {
      Mode = 'Jazz Cash Voucher';
    } else if (mode === 'MIGS') {
      Mode = 'Debit/Credit Card';
    } else if (mode === 'MWALLET') {
      Mode = 'Jazz Cash Mobile Account';
    }
    return Mode;
  };

  useEffect(() => {
    if (response && response.length > 0) {
      // console.log('response is: ', response);
      const { transaction_id, grade, last_updated, transaction_mode, transaction_status } = response[response.length - 1];
      // console.log(' transaction_status---> ', transaction_status);
      // console.log('transaction_status filtered is ', TransactionStatus(transaction_status));
      setStateRef({
        transactionId: transaction_id,
        // competition: competition.name,
        grade,
        // paymentAmount: competition.ticket_cost,
        transaction_status: TransactionStatus(transaction_status) || 1,
        transactionMode: TransactionMode(transaction_mode),
        transaction_mode,
        date: last_updated,
      });
      // alert('transaction_status is ', stateRef.transaction_status);
      setSuccessScreen(TransactionStatus(transaction_status));
      // console.log('transaction_status is ', TransactionStatus(transaction_status));
    }
  }, [response]);

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    //  console.log('t: ', t);
    switch (t) {
      case 'overlay':
        break;
      case 'continue':
        //  console.log('Payment Continue');
        window.location.href =
          'https://dg95h.app.goo.gl/?link=https%3A%2F%2Fwww.mcdonaldsapps.com%3FappUrl%3Dgmalite%253A%252F%252Fgmalite-smartweb%253Fweburl%253Dhttps%25253A%25252F%25252Fwww.1on1quiz.com%25252Fcompetitions%25252Fknowledge-on-the-go%25253Fsh%25253D1%252526apn%25253Dcom.mcdonalds.mobileapp%252526isi%25253D1217507712%252526ibi%25253Dcom.mcdonalds.mobileapp&apn=com.mcdonalds.mobileapp&isi=1217507712&ibi=com.mcdonalds.mobileapp';
        break;
      default:
        break;
    }
  };

  //  console.log('stateRef is: ', stateRef);
  const successUI = (
    <>
      <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
        <Body2 className={styled.sub_heading_icon_paper}>{texts.PURCHASE_MADE}</Body2>
      </Box>
      <Box>
        <Body2>
          <WriteString text={texts.FOLLOWING_PAYMENT_DETAILS} />
        </Body2>
      </Box>
      <Box sx={{ width: '90%', margin: '1rem 2rem', maxWidth: '560px' }}>
        <Grid container className={styled.tableRow}>
          <Grid item className={styled.table_col_left}>
            Transaction Id
          </Grid>
          <Grid item className={styled.table_col_right}>
            {stateRef.transactionId}
          </Grid>
        </Grid>
        {/* <Grid container className={styled.tableRow}>
          <Grid item className={styled.table_col_left}>
            Competition
          </Grid>
          <Grid item className={styled.table_col_right}>
            {stateRef.competition}
          </Grid>
        </Grid> */}
        <Grid container className={styled.tableRow}>
          <Grid item className={styled.table_col_left}>
            Grade/Level
          </Grid>
          <Grid item className={styled.table_col_right}>
            {stateRef.grade === 6 ? 'Teens' : 'Adults'}
          </Grid>
        </Grid>
        {/* <Grid container className={styled.tableRow}>
          <Grid item className={styled.table_col_left}>
            Payment Amount
          </Grid>
          <Grid item className={styled.table_col_right}>
            {`Rs ${stateRef.paymentAmount}`}
          </Grid>
        </Grid> */}
        <Grid container className={styled.tableRow}>
          <Grid item className={styled.table_col_left}>
            Transaction Mode
          </Grid>
          <Grid item className={styled.table_col_right}>
            {stateRef.transactionMode}
          </Grid>
        </Grid>
        <Grid container className={styled.tableRow}>
          <Grid item className={styled.table_col_left}>
            Transaction Date/Time
          </Grid>
          <Grid item className={styled.table_col_right}>
            {friendlyDate(new Date(`${stateRef.date}Z`).toString())}
          </Grid>
        </Grid>
      </Box>
      <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
        <Body2 className={styled.error_text_paper}>
          It may take 10-20 minutes for your payment to get validated before activation of your premium account.
        </Body2>
      </Box>
    </>
  );

  const pendingUI = (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 'auto 12px!important', width: '100%' }}
      >
        <Box className={styled.TextBox} mb={4} mt={2} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>Your purchase request has been received.</Body2>
        </Box>

        <Box>
          <Body2>
            <WriteString text={texts.FOLLOWING_REQUEST_DETAILS} />
          </Body2>
        </Box>
        <Box sx={{ width: '90%', margin: '1rem 2rem', maxWidth: '560px' }}>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Request ID
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.transactionId}
            </Grid>
          </Grid>
          {/* <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Competition
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.competition}
            </Grid>
          </Grid> */}
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Grade/Level
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.grade === 6 ? 'Teens' : 'Adults'}
            </Grid>
          </Grid>
          {/* <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Expected Payment Amount
            </Grid>
            <Grid item className={styled.table_col_right}>
              {`Rs ${stateRef.paymentAmount}`}
            </Grid>
          </Grid> */}
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Expected Transaction Mode
            </Grid>
            <Grid item className={styled.table_col_right}>
              {stateRef.transactionMode}
            </Grid>
          </Grid>
          <Grid container className={styled.tableRow}>
            <Grid item className={styled.table_col_left}>
              Request Date/Time
            </Grid>
            <Grid item className={styled.table_col_right}>
              {friendlyDate(new Date(`${stateRef.date}Z`).toString())}
            </Grid>
          </Grid>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>
            {stateRef.transaction_mode?.toLowerCase().indexOf('mwallet') > -1 &&
              `However, your proof of payment is still pending. Please take a screen snapshot of your payment receipt and share it with our support team to get your premium account activated.`}
            {stateRef.transaction_mode?.toLowerCase().indexOf('otc') > -1 &&
              `However, your payment and its proof is still pending. Please pay the amount against your generated voucher by visiting any JazzCash enabled store and then take a screen snapshot of your payment receipt/sms to share it with our support team for your premium account activation.`}
            {stateRef.transaction_mode?.toLowerCase().indexOf('mwallet') === -1 &&
              stateRef.transaction_mode?.toLowerCase().indexOf('otc') === -1 &&
              `It may take 10-20 minutes for your payment to get validated before activation of your premium account.`}
          </Body2>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>
            You can email the support team at <b>gamesupport@knowledgeplatform.com</b> or message them through the support chat.
          </Body2>
        </Box>
      </Box>
    </>
  );

  const failedUI = (
    <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box className={styled.TextBox} mb={4} mt={2} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>Unable to complete the purchase.</Body2>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>Make sure you have correctly entered your payment details.</Body2>
        </Box>
        <Box className={styled.TextBox} mb={4} pr={4} pl={4} textAlign="center">
          <Body2 className={styled.error_text_paper}>Contact us for further assistance.</Body2>
        </Box>
      </Box>
    </>
  );

  // if (!response) {
  //   return (
  //     <Box
  //       m={2}
  //       // eslint-disable-next-line react/no-array-index-key

  //       display="flex"
  //       textAlign="center"
  //       justifyContent="center"
  //       sx={{ background: 'white', borderRadius: '1rem', width: '100%', height: '400px', margin: 'auto auto 4rem auto' }}
  //       alignItems="center"
  //       className={!successScreen === 3 ? styled.error_text_content : ''}
  //     >
  //       <Box>
  //         <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
  //       </Box>
  //       <Box>
  //         <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
  //       </Box>
  //       <Box>
  //         <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
  //       </Box>
  //       <Box>
  //         <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
  //       </Box>
  //       <Box>
  //         <Skeleton variant="rect" width="90%" height="40px" className={styled.skeleton} />
  //       </Box>
  //       <Box>
  //         <Skeleton variant="rect" widt
  // ="90%" height="40px" className={styled.skeleton} />
  //       </Box>
  //     </Box>
  //   );
  // }

  return response ? (
    <Box className={styled.PaymentSuccessRoot}>
      <H1 className={styled.headingPage}>{texts.PAYMENT_RESULT}</H1>
      <Grid className={styled.PaymentSuccessGrid} item xs={12} sm={12} md={12} lg={6} container justifyContent="center" padding={4}>
        <IconPaper
          // eslint-disable-next-line no-nested-ternary
          icon={successScreen === 3 ? 'i i-thumbsup' : successScreen === 2 ? 'i i-waiting' : ' i i-sadcircle'}
          // eslint-disable-next-line no-nested-ternary
          title={successScreen === 3 ? 'Congratulations!' : successScreen === 2 ? 'Step 2' : 'Oops!'}
          className={`${!successScreen === 3 && styled.error_text_content} ${styled.icoPaperStd}`}
          fullWidth
        >
          {stateRef.transaction_status !== 2 &&
            stateRef.transaction_mode?.trim().toLowerCase() !== 'otc' &&
            stateRef.transaction_status !== 3 &&
            failedUI}
          {stateRef.transaction_status === 2 && stateRef.transaction_mode?.trim().toLowerCase() !== 'otc' && pendingUI}
          {stateRef.transaction_mode?.trim().toLowerCase() === 'otc' && pendingUI}
          {stateRef.transaction_status === 3 && stateRef.transaction_mode?.trim().toLowerCase() !== 'otc' && successUI}
          <Box mt={2} textAlign="center">
            <Button tag="continue" className={styled.noPrint} onClick={callback}>
              Continue to the app
            </Button>
          </Box>
        </IconPaper>
      </Grid>
    </Box>
  ) : (
    <></>
  );
};
export default McdPaymentSuccess;
