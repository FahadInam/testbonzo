import React from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';
import { ModalBox, Body1, IconPaper } from 'Components';

import useStyles from './style';
import { WriteString } from '../Core';
import { IMAGES } from 'Constants';
import ButtonBold from 'Components/Core/ButtonBold';
import { getInstanceText } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';

const Rules = ({ callback, menuAnchor, competitionRules, Header }) => {
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const { texts } = useTheme();
  const styled = useStyles();
  const PageUI = (
    <ModalBox fullWidth className={styled.takeOverWhenSmall} isVisible={menuAnchor} callback={callback}>
      <Grid style={{ marginTop: '-44px' }} item xs={12}>
        <IconPaper
          ADD_CODE
          title={texts.RULES}
          title_bg="#112d70"
          addCodeIcon={IMAGES.RULES}
          // icon="i i-rules"
          className={styled.rulesPopup}
          fullWidth
        >
          <Box className={styled.TextBox} mb={2}>
            <Body1>
              <WriteString text={competitionRules} />
            </Body1>
          </Box>
          {!Header ? (
            <Grid className={styled.buttons_container}>
              <ButtonBold bgBlue yellowBubble secondaryYellow tag="I_DISAGREE-rules" onClick={callback}>
                {getInstanceText(texts, 'I_DISAGREE', Inst_config.instance_id)}
              </ButtonBold>
              <ButtonBold yellowBubble secondaryYellow tag="I_AGREE-rules" onClick={callback}>
                {getInstanceText(texts, 'I_AGREE', Inst_config.instance_id)}
              </ButtonBold>
            </Grid>
          ) : (
            <Box mt={2} textAlign="center" className={styled.buttons_container}>
              <ButtonBold yellowBubble secondaryYellow tag="continue-rules" onClick={callback}>
                {texts.CLOSE}
              </ButtonBold>
            </Box>
          )}
        </IconPaper>
      </Grid>
    </ModalBox>
  );

  return PageUI;
};

export default Rules;
