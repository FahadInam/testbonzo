import React from 'react';
import { useTheme, Box, Grid } from '@material-ui/core';
import { Button, IconPaper, Body2 } from 'Components';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import { User } from '../../../Actions';
import PageStructure from '../shared/PageStructure';
import useStyles from './style';
import { Numbers } from '../../../Utils';

const Congrats = () => {
  const { texts } = useTheme();
  const styled = useStyles();
  const user = User.Info();
  const secondaryText = (
    <>
      {texts.AWARDED}
      <span className={styled.coins}>{Numbers.AbbreviatedNumber(user.points, 2)}</span>
      {texts.PERFORMANCE_POINTS}
    </>
  );
  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'continue':
        PageSwitch(DefaultNav.COMPETITIONS);
        break;
      default:
        break;
    }
  };

  const PageUI = (
    <Grid item xs={12} className={styled.row}>
      <IconPaper icon="migration" title={texts.LSP_ACCOUNT} fixWidth>
        <Box mb={2} textAlign="center">
          <Body2>{secondaryText}</Body2>
        </Box>
        <Box mt={1} textAlign="center">
          <Button width="170px" mt={3} tag="continue" type="submit" onClick={callback}>
            {texts.CONTINUE}
          </Button>
        </Box>
        <Box mb={2} />
      </IconPaper>
    </Grid>
  );

  return <PageStructure welcome name={texts.ACCOUNT_MIGRATED} PageUI={PageUI} />;
};

export default Congrats;
