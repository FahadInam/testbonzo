import React, { useState } from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';
import { Button, Input, IconPaper, Body2 } from 'Components';
import { PageSwitch } from 'Navigation';
import { SettingsNav } from 'Navigation/Paths';
import { SelectedCompetition } from '../../../Actions';
import { ALERT } from '../../../Constants';
import { Toast } from '../../../Actions/app.control.action';
import PageStructure from '../shared/PageStructure';
import useStyles from './style';

const JoinCompetition = () => {
  const { texts } = useTheme();
  const [code, setCode] = useState('');
  const styled = useStyles();

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'continue':
        if (code) {
          PageSwitch(SettingsNav.SELECT_SCHOOL);
        } else {
          Toast.Show(texts.TOAST_ENTER_CODE, ALERT.ERROR);
        }
        break;
      case 'skip':
        SelectedCompetition.GotoCompetition();
        break;
      case 'code':
        setCode(e.target.value);
        break;
      default:
        break;
    }
  };

  const PageUI = (
    <Grid item xs={12} className={styled.row}>
      <IconPaper icon="grade" fixWidth>
        <Box mb={2} textAlign="center">
          <Body2>{texts.COMPETITION_CODE}</Body2>
        </Box>
        <Box textAlign="center">
          <Input label="Enter the code" tag="code" value={code} onChange={callback} autoComplete autoFocus />
        </Box>
        <Box mt={1} textAlign="center">
          <Button width="170px" mt={3} tag="continue" type="submit" onClick={callback}>
            {texts.CONTINUE}
          </Button>
          <Button width="170px" mt={3} tag="skip" type="submit" onClick={callback}>
            {texts.SKIP}
          </Button>
        </Box>
        <Box mb={2} />
      </IconPaper>
    </Grid>
  );

  return <PageStructure welcome name={texts.JOIN_COMPETITION} PageUI={PageUI} />;
};

export default JoinCompetition;
