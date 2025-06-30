/* eslint-disable camelcase */
import React, { useEffect, useRef } from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { H5B, WriteString } from 'Components';

import LastPlayed from 'Assets/images/bonzoui/tabicons/result.svg';
import YourTurnIcon from 'Assets/images/bonzoui/tabicons/turnyour.svg';
import TheirTurnIcon from 'Assets/images/bonzoui/tabicons/turntheir.svg';
import InvitationsIcon from 'Assets/images/bonzoui/tabicons/turninvite.svg';
import ListBox from '../shared/ListBox';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CompetitionDetails = React.memo(
  ({ recommendations, your_turn, their_turn, results, invitations, competition, recommendationsData, show_header, page_data }) => {
    const { texts } = useTheme();
    const location = useLocation();
    const resultsRef = useRef(null);
    //  console.log(recommendationsData, "recData")
    useEffect(() => {
      if (location?.state?.scroll) {
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000);
      }
    }, [location]);

    const { is_lesson_based } = competition;
    let lessonBasedRecommendationTitle = '&nbsp;';
    const compActivities = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);
    // TODO : This Hard coded check must be removed after eid.
    if (recommendationsData) {
      lessonBasedRecommendationTitle =
        recommendationsData[0]?.skill === 'LRN' ? 'What is your Compliance Quotient?' : recommendationsData[0]?.skill;
    }
    const progressBar = (
      <div className="bg__meter">
        <div
          className="bg__filler"
          style={{
            width: `${((compActivities?.user_data?.lessons_completed || 0) / (compActivities?.user_data?.total_lessons || 1)) * 100}%`,
          }}
        ></div>
        <div className="numbers_data">
          <b>{compActivities?.user_data?.lessons_completed || '0'}</b> / {compActivities?.user_data?.total_lessons || '-'}
        </div>
      </div>
    );
    return (
      <>
        {recommendations && (
          <>
            {show_header && (
              <div className="semi__title mt_4">
                <H5B className="semi__title" textAlign="center" m={0}>
                  <WriteString
                    className="semi__title"
                    text={is_lesson_based ? lessonBasedRecommendationTitle : texts.RECOMMENDATIONS}
                  />
                </H5B>
              </div>
            )}

            {compActivities?.user_data?.total_lessons > 0 && progressBar}

            <Grid item xs={12} className="sRecommendationSection">
              {recommendations}
            </Grid>
          </>
        )}

        {!recommendations && progressBar}

        {invitations && (
          <Grid item xs={12} key="invitations" id="invitations">
            <ListBox
              title={texts.INVITATIONS}
              icon={<img src={InvitationsIcon} border="0" alt={texts.INVITATIONS} />}
              items={invitations}
            />
          </Grid>
        )}

        {your_turn && (
          <Grid item xs={12} key="your_turn" id="your_turn">
            <ListBox title={texts.YOUR_TURN} icon={<img src={YourTurnIcon} border="0" alt={texts.YOUR_TURN} />} items={your_turn} />
          </Grid>
        )}

        {their_turn && (
          <Grid item xs={12} key="their_turn" id="their_turn">
            <ListBox
              title={texts.THEIR_TURN}
              icon={<img src={TheirTurnIcon} border="0" alt={texts.THEIR_TURN} />}
              items={their_turn}
            />
          </Grid>
        )}

        {results && (
          <Grid item xs={12} key="results" id="result" ref={resultsRef}>
            <ListBox title={texts.LAST_PLAYED} icon={<img src={LastPlayed} border="0" alt={texts.LAST_PLAYED} />} items={results} />
          </Grid>
        )}
      </>
    );
  }
);

export default CompetitionDetails;
