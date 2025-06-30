import React, { useMemo, useState } from 'react';
import { Container, Grid, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@material-ui/core';
import { Body1, Input } from 'Components';
import BundlePaymentCard from './BundlePaymentCard';
import PaymentOptionCard from './PaymentOptionCard';
import { IMAGES, USER_TYPE } from 'Constants';
import { Link } from 'react-router-dom';
import ButtonBold from 'Components/Core/ButtonBold';
import { User } from 'Actions';
import { DefaultNav } from 'Navigation/Paths';
import { TimeZoneList } from 'Constants/timezone.constant';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ShupavuPaymentSelection = ({
  onBundleSelect,
  bundleData,
  selectedShupavuCard,
  onPaymentCardSelect,
  isNormalUser,
  emailVisible,
  setEmail,
  email,
  handleEnter,
  isSafaricomPaymentSelected,
  setIsSafaricomPaymentSelected,
  selectedPayment_Method,
  setSelectedPayment_Method,
}) => {
  const { texts } = useTheme();
  const [selectedBundleIndex, setSelectedBundleIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bundles = bundleData || [];
  const user = User.Info();
  const [selectedTime, setSelectedTime] = useState('');
  const isSafaricomUser = user?.user_type === USER_TYPE.Safaricom;

  useMemo(() => {
    let selectedTime = '';
    if (user?.timezone) {
      selectedTime = TimeZoneList.find((item) => item.value === user.timezone)?.name;
      setSelectedTime(selectedTime);
    }
    // eslint-disable-next-line
  }, []);

  const paymentOptions = isNormalUser
    ? [{ name: texts.PAY_VIA_MOBILE_OR_CARD, imgSrc: IMAGES.MOBILE_MONEY_IMAGE, disabled: false }]
    : [{ name: texts.PAY_VIA_SAFARICOM_AIRTIME, imgSrc: IMAGES.SAFARICOM_IMAGE, disabled: false }];

  const handleBundleClick = (bundle, index) => {
    setSelectedBundleIndex(index);
    onBundleSelect(bundle);
  };

  const handlePaymentOptionClick = (option, index) => {
    if (option.disabled) return;
    setSelectedPayment_Method(index);
    onPaymentCardSelect(option);
    setIsSafaricomPaymentSelected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEnter();
  };

  return (
    <Container>
      {/* Header Section */}
      <Grid container spacing={3} direction="column">
        <Body1 textAlign="center" mb={4} color="#414141" className="poppins-font-400 payment-selection-title">
          {isNormalUser && selectedShupavuCard && emailVisible
            ? texts.ENTER_YOUR_EMAIL_TO_CONTINUE
            : !isNormalUser && selectedShupavuCard && emailVisible && !isSafaricomUser
            ? texts.CONFIRM_TIME_ZONE
            : selectedShupavuCard
            ? texts.CHOOSE_PREFERRED_PAYMENT_METHOD
            : texts.SELECT_PREFERRED_BUNDLE_METHOD}
          {isNormalUser && selectedShupavuCard && emailVisible ? (
            ''
          ) : !selectedShupavuCard ? (
            <>
              <Typography
                variant="body1"
                className="poppins-font-400"
                style={{ fontSize: '14px', marginTop: '8px', color: '#696969' }}
              >
                {texts.ONLY_SIX_NEW_GAMES_TEXT}
                {/* <Link
                  component="button"
                  className="click_learn_more_link"
                  underline="always"
                  onClick={(event) => {
                    event.preventDefault(); // Prevents default navigation behavior
                    setIsModalOpen(true);
                  }}
                >
                  {texts.CLICK_TO_LEARN_MORE}
                </Link> */}
              </Typography>
            </>
          ) : (
            ''
          )}
        </Body1>
      </Grid>

      {/* Conditional Rendering for Bundles or Payment Options */}
      {selectedShupavuCard && emailVisible && !isSafaricomUser ? (
        <form onSubmit={handleSubmit} style={{ margin: '0px auto 4px auto', maxWidth: '32rem' }}>
          {isNormalUser && (
            <Input
              tag="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label={texts.EMAIL_ADDRESS}
              autoFocus={process.env.REACT_APP_IS_APP === '0'}
            />
          )}
          <div style={{ marginTop: '12px' }}>
            <Input
              tag="timezone"
              name="timezone"
              disabled
              value={selectedTime}
              label={texts.TIME_ZONE}
              autoFocus={process.env.REACT_APP_IS_APP === '0'}
            />
            <Body1>
              {texts.TO_UPDATE_TIME} <Link to={DefaultNav.SETTINGS.link}>{texts.PROFIlE}</Link> {texts.PAGE}.
            </Body1>
          </div>
          <button style={{ display: 'none' }} type="submit"></button>
        </form>
      ) : !selectedShupavuCard ? (
        <Grid
          container
          spacing={2}
          className={isSafaricomUser ? 'bundle-card-single' : 'bundle-card-grid'}
          wrap="nowrap"
          style={{ overflowX: 'auto', paddingBottom: '8px', display: 'flex', justifyContent: '' }}
        >
          {/* filter bundles for normal and safaricom users */}
          {(isNormalUser ? bundles.slice(1) : bundles.slice(0, 1)).map((bundle, index) => (
            <Grid item key={index} style={{ minWidth: 230, flexShrink: 0, padding: '12px' }}>
              <BundlePaymentCard
                bundle={bundle}
                isSelected={selectedBundleIndex === index}
                onClick={() => handleBundleClick(bundle, index)}
                bundleData={bundleData}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2} className="payment-card-grid">
          {paymentOptions.map((option, index) => (
            <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
              <PaymentOptionCard
                option={option}
                isSelected={selectedPayment_Method === index && (isSafaricomUser ? isSafaricomPaymentSelected : true)}
                isDisabled={option.disabled}
                isNormalUser={isNormalUser}
                onClick={() => !option.disabled && handlePaymentOptionClick(option, index)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal with Animation and Close Button */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} TransitionComponent={Transition} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="body1" className="poppins-font-700 learn_more_title">
            Why do I only get 6 games to play per day?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" className="poppins-font-400 learn_more_content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container className="close_btn_container">
            <ButtonBold yellowBubble secondaryYellow tag="subscribe" onClick={() => setIsModalOpen(false)}>
              {texts.CLOSE}
            </ButtonBold>
          </Grid>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShupavuPaymentSelection;
