import React from 'react';
import { Grid } from '@material-ui/core';
// import Button from './Core/Button';
import { ModalBox } from './Modal';
import { Body2, Body1 } from './Core';
import ButtonBold from './Core/ButtonBold';

const ConfirmationBox = ({
  visible,
  callback,
  icon,
  primary,
  secondary,
  positive,
  negative,
  tag,
  title,
  allowClose,
  hideCross,
  ADD_CODE,
  className,
  buttonsContainer,
  title_bg,
  addCodeIcon
}) => {
  return (
    <ModalBox isVisible={visible} callback={callback}
      fixWidth
      title_bg={title_bg}
      className={className}
      allowClose={allowClose}
      hideCross={hideCross}
      ADD_CODE={ADD_CODE}
      addCodeIcon={addCodeIcon}
      icon={icon}
      title={title}>
      <Body1
        mb={4} 
        mt={4}
        mr={1}
        ml={1}
        styleCSS={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#313644',
          padding: "0px 10px 0px 10px"
        }}
        textAlign="center">
        {primary}
      </Body1>
      {secondary && (
        <Body2 mb={4} textAlign="center">
          {secondary}
        </Body2>
      )}

      {/* <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        <Button width="auto" minWidth="120px" pl={4} pr={4} tag={`${tag}-positive`} onClick={callback}>
          {positive}
        </Button>
        {negative && (
          <Button width="auto" minWidth="120px" pl={4} pr={4} tag={`${tag}-negative`} onClick={callback}>
            {negative}
          </Button>
        )}
      </Box> */}
      <Grid className={buttonsContainer && buttonsContainer}>
        <ButtonBold bgBlue yellowBubble secondaryYellow tag={`${tag}-positive`} onClick={callback}>
        {positive}
        </ButtonBold>
        <ButtonBold
          yellowBubble secondaryYellow tag={`${tag}-negative`} onClick={callback}>
           {negative}
        </ButtonBold>
      </Grid>
    </ModalBox>
  );
};

export default ConfirmationBox;
