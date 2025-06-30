/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Grid, useTheme, Box } from '@material-ui/core';
import { IconPaper, Input, Button, Input as CustomInput } from 'Components';
import { SUPPORTED_THEMES } from 'Theme';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { OnInputChange, encodeDecode } from 'Utils';
import { AppControl } from 'Actions';
import { Toast } from 'Actions/app.control.action';
import { ALERT } from 'Constants';
import PageStructure from '../shared/PageStructure';
import useStyles from './style';

const Admin = () => {
  const { texts } = useTheme();
  const styled = useStyles();

  useEffect(() => {
    AppControl.SetTheme(SUPPORTED_THEMES.BLUE);
  }, []);

  const [linkData, setLinkData] = useState({
    competition_id: '',
    grade: '',
    textbook_id: '',
    subject: '',
    content_id: '',
    skill_id: '',
    is_game: '',
  });

  const [linkToShare, setLinkToShare] = useState('');
  const [generatedData, setGeneratedData] = useState('');

  const ValidationCheck = (data) => {
    const { competition_id, grade, textbook_id, subject, content_id, skill_id, is_game } = data;
    if (!competition_id) {
      Toast.Show(texts.REQUIRED_COMPETITION_ID, ALERT.ERROR);
    } else if (!grade) {
      Toast.Show(texts.REQUIRED_GRADE, ALERT.ERROR);
    } else if (!textbook_id) {
      Toast.Show(texts.REQUIRED_TEXTBOOK_ID, ALERT.ERROR);
    } else if (!subject) {
      Toast.Show(texts.REQUIRED_SUBJECT, ALERT.ERROR);
    } else if (!content_id) {
      Toast.Show(texts.REQUIRED_CONTENT_ID, ALERT.ERROR);
    } else if (!skill_id) {
      Toast.Show(texts.REQUIRED_SKILL_ID, ALERT.ERROR);
    } else if (!is_game) {
      Toast.Show(texts.REQUIRED_IS_GAME, ALERT.ERROR);
    } else return true;
    return false;
  };

  const GenerateLink = (data) => {
    if (ValidationCheck(data)) {
      const dto = `${data.competition_id}|${data.grade}|${data.textbook_id}|${data.subject}|${data.content_id}|${data.skill_id}|${data.is_game}`;
      setGeneratedData(dto);
      setLinkToShare(`?competition=${encodeDecode('enc', JSON.stringify(dto))}`);
    }
  };

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    switch (t) {
      case 'competition_id':
      case 'grade':
      case 'textbook_id':
      case 'subject':
      case 'content_id':
      case 'skill_id':
      case 'is_game':
        OnInputChange({ name: t, value: e.target.value }, linkData, setLinkData);
        break;
      case 'Generate_link':
        GenerateLink(linkData);
        break;
      default:
        break;
    }
  };
  const PageUI = (
    <Grid item xs={12} className={styled.row}>
      <IconPaper icon="grade" fixWidth>
        <Box textAlign="center">
          <Input value={linkData.competition_id} label={texts.COMPETITION_ID} tag="competition_id" onChange={callback} />
        </Box>
        <Box textAlign="center">
          <Input value={linkData.grade} label={texts.GRADE} tag="grade" onChange={callback} />
        </Box>
        <Box textAlign="center">
          <Input value={linkData.textbook_id} label={texts.TEXTBOOK_ID} tag="textbook_id" onChange={callback} />
        </Box>
        <Box textAlign="center">
          <Input value={linkData.subject} label={texts.SUBJECT} tag="subject" onChange={callback} />
        </Box>
        <Box textAlign="center">
          <Input value={linkData.content_id} label={texts.CONTENT_ID} tag="content_id" onChange={callback} />
        </Box>
        <Box textAlign="center">
          <Input value={linkData.skill_id} label={texts.SKILL_ID} tag="skill_id" onChange={callback} />
        </Box>
        <Box textAlign="center">
          <Input value={linkData.is_game} label={texts.IS_GAME} tag="is_game" onChange={callback} />
        </Box>
        <Box mb={2} />
        <Button mb={4} mt={4} tag="Generate_link" onClick={callback} startIcon={<i className="i i-update" />}>
          {texts.GENERATE_LINK}
        </Button>
        <Box textAlign="center" display={generatedData ? 'block' : 'none'}>
          <Input value={generatedData} label={texts.GAME_DATA} />
        </Box>
        <Box mb={3} mt={3} display={generatedData ? 'block' : 'none'} textAlign="center" className={styled.inputCustom}>
          <CustomInput tag="url" id="urlId" value={linkToShare} end={<CopyToClipboardUI linkToShare={linkToShare} />} />
        </Box>
      </IconPaper>
    </Grid>
  );
  return (
    <>
      <PageStructure name={texts.ADMIN_PANEL} PageUI={PageUI} />
    </>
  );
};

export default Admin;

const CopyToClipboardUI = ({ linkToShare }) => {
  const { texts } = useTheme();
  return (
    <Box>
      <CopyToClipboard text={linkToShare} onCopy={() => Toast.Show(texts.CODE_COPIED, ALERT.SUCCESS)}>
        <Button tag="copy" className="btn" data-clipboard-text={linkToShare} width="90px" height="47px" m={0} mt={-0.2} mr={-0.2}>
          {texts.COPY}
        </Button>
      </CopyToClipboard>
    </Box>
  );
};
