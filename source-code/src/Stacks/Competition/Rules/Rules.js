import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTheme, Box, Grid } from '@material-ui/core';
import { Body1, IconPaper } from 'Components';
import { PageSwitch } from 'Navigation';
import { SelectedCompetition, AppControl, User } from 'Actions';
import { SettingsNav, DefaultNav } from 'Navigation/Paths';
import useStyles from './style';
import { WriteString } from '../../../Components/Core';
import { PageStructure } from '../shared';
import { IMAGES } from 'Constants';
import ButtonBold from 'Components/Core/ButtonBold';
import { getInstanceText } from 'Utils';

const Rules = ({ Header }) => {
  const { texts } = useTheme();
  const styled = useStyles();
  const competitionStr = useSelector((state) => state.Competition, shallowEqual);
  const competition = SelectedCompetition.StrToObj(competitionStr);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);

  useEffect(() => {
    if (competition.item && competition.item.theme) {
      AppControl.SetTheme(competition.item.theme);
    }
    if (!competition || (Object.keys(competition).length === 0 && competition.constructor === Object && !User.IsGuest())) {
      PageSwitch(DefaultNav.MAIN);
    }
  }, [competition, competition.item]);

  const callback = (e) => {
    const t = typeof e === 'string' ? e : e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'I_DISAGREE-rules':
        SelectedCompetition.Clear();
        PageSwitch(DefaultNav.COMPETITIONS);
        break;
      case 'I_AGREE-rules':
        if (competition.item?.is_school_based === 1 && competition.item.enrolled === 0) {
          PageSwitch(SettingsNav.SELECT_SCHOOL);
        } else {
          PageSwitch(SettingsNav.CHANGE_GRADE);
        }
        break;
      default:
        break;
    }
  };

  const PageUI = (
    <Box className={`sRules ${styled.takeOverWhenSmall}`}>
      <Grid item xs={12}>
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
              <WriteString text={competition?.item?.rules} />
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
                {texts.CONTINUE}
              </ButtonBold>
            </Box>
          )}
        </IconPaper>
      </Grid>
    </Box>
  );

  return (
    <>
      <PageStructure
        headerSet={{
          showRight: false,
          showLeft: true,
          hideCoins: false,
        }}
        flexClass={styled.rulesPaper}
        // name={texts.RULES}
        PageUI={PageUI}
      />
    </>
  );
};

export default Rules;
