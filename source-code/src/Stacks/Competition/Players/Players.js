import React from 'react';
import Leaderboard from '../Leaderboard/Leaderboard';
// import { useHistory } from 'react-router-dom';

const Players = React.memo(({ competition, isOnlyCompetition }) => {
  // const [competitionId, setCompetitionId] = useState(null)
  // const history = useHistory()

  // useEffect(() => {
  //   setCompetitionId(history.location.state?.playersCompetitionId || history.location.state?.competition_id)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  // console.log('history...', competitionId)
  
  return <Leaderboard
  // competitionId={competitionId} // we will use this competitionId in principal case if we want call any API in Leaderboard 
  playersHeading
  competition={competition} isOnlyCompetition={isOnlyCompetition} isInstituteBase />;
});

export default Players;
