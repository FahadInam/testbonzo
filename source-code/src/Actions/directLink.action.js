/* eslint-disable camelcase */
import { SelectedCompetition } from 'Actions';
import { PageSwitch } from 'Navigation';
import { DefaultNav } from 'Navigation/Paths';
import { encodeDecode, parseSearchURL } from 'Utils';
import { Spinner } from './app.control.action';
import { GoToVsScreen } from './challenge.action';

const process = () => {
  let FinalDto = false;
  let DirectCompetitionDataSet;
  const directCompetition = parseSearchURL();
  // console.log('directCompetition', directCompetition);
  if (directCompetition.competition) {
    DirectCompetitionDataSet = JSON.parse(encodeDecode('dec', directCompetition.competition));
    const Data = DirectCompetitionDataSet.split('|');
    FinalDto = {
      event: {
        competition_id: parseInt(Data[0], 10),
        grade: parseInt(Data[1], 10),
        textbook_id: parseInt(Data[2], 10),
      },
      subjectObj: {
        subject: Data[3],
        content_id: parseInt(Data[4], 10),
        skill_id: parseInt(Data[5], 10),
        is_game: parseInt(Data[6], 10),
      },
    };
  }
  // console.log('FINAL', FinalDto);
  return FinalDto;
};

const setAndRedirect = (directLinkDto, isGuest, dispatch, data, recommendations, texts) => {
  const dto = {
    opponent: {
      name: null,
      user_id: 0,
      rank: 0,
      profile_picture: null,
      username: null,
    },
  };
  if (!isGuest) {
    const { competition_id } = directLinkDto.event;
    for (let i = 0; i < data.competitions.length; i++) {
      if (competition_id === data.competitions[i].competition_id) {
        SelectedCompetition.Clear();
        SelectedCompetition.Set({
          item: { ...data.competitions[i] },
          games: data.games,
        });
      }
    }
    //    if (FinalDto.opponent.user_id === user.user_id) {
    const competitionToPlay = SelectedCompetition.Info();
    // console.log(recommendations, 'recommendations');
    if (competitionToPlay && competitionToPlay.item && competitionToPlay.item.enrolled === 1) {
      dispatch(GoToVsScreen(dto.opponent, directLinkDto.subjectObj, recommendations, texts));
    } else {
      PageSwitch(DefaultNav.COMPETITIONS);
    }
    //    } else {
    //   dispatch(GoToVsScreen(directLinkDto.opponent, directLinkDto.subjectObj, texts));
    // }
  } else if (isGuest) {
    Spinner.Show();
    const { competition_id, grade } = directLinkDto.event;
    for (let i = 0; i < data.competitions.length; i++) {
      if (competition_id === data.competitions[i].competition_id) {
        SelectedCompetition.Clear();
        SelectedCompetition.Set({
          item: { ...data.competitions[i], current_grade: grade },
          games: data.games,
        });
      }
      const competitionToPlay = SelectedCompetition.Info();
      if (competitionToPlay && competitionToPlay.item && competitionToPlay.item.is_public) {
        dispatch(GoToVsScreen(dto.opponent, directLinkDto.subjectObj, recommendations, texts));
      } else {
        PageSwitch(DefaultNav.COMPETITIONS);
      }
    }
  }
};

const directLink = {
  process,
  setAndRedirect,
};

export default directLink;
