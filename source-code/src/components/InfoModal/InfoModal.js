import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { ModalBox, Body1, H4 } from 'Components';

import useStyles from './style';
import { IMAGES } from 'Constants';
import { shallowEqual, useSelector } from 'react-redux';
import { CustomToast, SelectedCompetition } from 'Actions';
import { getInstanceType } from 'Utils';
import { INSTANCES_ID } from 'Constants/instance.config';

const InfoModal = ({ callback, menuAnchor, itemId }) => {
  const styled = useStyles();
  const { texts } = useTheme();
  const pageData = useSelector((state) => state.GetCompetitionsActivities, shallowEqual);
  const [is_qualified, setIs_qualified] = useState(false);
  const [is_certified, setIs_Certified] = useState(false);
  const comp = SelectedCompetition.Info();
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const isQualified =
    (pageData?.user_data?.is_show_qualified === '1' && pageData?.user_data?.is_show_certified === '0' && !itemId) || itemId === 4;

  const isCertified = (pageData?.user_data?.is_show_certified === '1' && !itemId) || itemId === 5;

  useEffect(() => {
    if (isQualified || itemId === 4) {
      setIs_qualified(true);
    } else if (isCertified || itemId === 5) {
      setIs_Certified(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, isQualified, isCertified]);

  useEffect(() => {
    return () => {
      setIs_qualified(false);
      setIs_Certified(false);
    };
  }, [itemId]);

  useEffect(() => {
    CustomToast.Close();
  }, [menuAnchor]);

  const PageUI = (
    <ModalBox
      ADD_CODE
      title={texts.SYSTEM_MSG}
      className={styled.takeOverWhenSmall}
      allowClose={true}
      isVisible={menuAnchor}
      callback={callback}
      addCodeIcon={IMAGES.SYSTEM_ICON}
      fullWidth
      maxWidth={'700px'}
    >
      <Box className={styled.TextBox}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <H4 styleCSS={{ fontSize: '24px', padding: '10px', fontWeight: '600', color: '#00A3FF', textAlign: 'center' }}>
            {is_qualified && !is_certified && texts.QUALIFY_ON_STAGE2_HEADING}
            {is_certified && texts.THANKS_FOR_COMPLETING_STAGE2}
          </H4>
        </div>
        {is_qualified && !is_certified && (
          <div className={styled.faq_home_container}>
            <div style={{ flex: '1', paddingBottom: '10px', marginTop: '10px' }}>
              <div className={styled.single_faq}>
                <Body1 className={styled.faq_question}>{texts.AMAZING_JOB}</Body1>
              </div>
              <div className={styled.faq_heading}>
                <Body1>{texts.WHATS_NEXT}</Body1>
              </div>
              <div className={styled.single_faq_li}>
                <Body1 className={styled.faq_question_li}>
                  <span> 1. </span> {texts.COMPLETE_STAGE_1}
                </Body1>
              </div>
              <div className={styled.single_faq_li}>
                <Body1 className={styled.faq_question_li}>
                  <span> 2. </span> {texts.PREPARE_FOR_STAGE_2}
                </Body1>
              </div>
              <div className={styled.single_faq_li}>
                <Body1 className={styled.faq_question_li}>
                  <span> 3. </span> {texts.INTENSE_GAMES_15}
                </Body1>
              </div>

              <div className={styled.single_faq}>
                <Body1 className={styled.faq_question}>{texts.KEEP_UP_GREAT_WORK}</Body1>
              </div>

              <div className={styled.single_faq}>
                <Body1 className={styled.faq_question}>
                  {texts.GOOD_LUCK_AND}
                  <span aria-label="emoji" role="img">
                    🌍
                  </span>
                  <span aria-label="emoji" role="img">
                    💪​
                  </span>
                </Body1>
              </div>
            </div>
          </div>
        )}
        {is_certified && (
          <div className={styled.faq_home_container}>
            <div style={{ flex: '1', paddingBottom: '10px', marginTop: '10px' }}>
              <div className={styled.single_faq}>
                <Body1 className={styled.faq_question}>
                  <span>
                    {texts.PAT_YOURSELF} <span className="fredoka-font-600">{comp?.item?.name}</span> {texts.WELL_DONE}{' '}
                  </span>
                  {/* <span
                    className={styled.main_text}
                    dangerouslySetInnerHTML={{
                      __html: texts.PAT_YOURSELF.replace(
                        'Global Climate Literacy Competition 1: Climate Change',
                        '<strong class="fredoka-font-600">Global Climate Literacy Competition 1: Climate Change</strong>'
                      ),
                    }}
                  /> */}
                </Body1>
              </div>
              {/* <div className={styled.single_faq}>
                <Body1 className={styled.faq_question}>{texts.STAGE_3_QUALIFIER} ​​</Body1>
              </div> */}
              {/* <div className={styled.faq_heading}>
                <Body1>{texts.WHATS_NEXT}</Body1>
              </div> */}
              {/* <div className={styled.single_faq_li}>
                <Body1 className={styled.faq_question_li}>
                  <span> 1 </span> {texts.COMPLETE_CERT_1}
                </Body1>
              </div>
              <div className={styled.single_faq_li}>
                <Body1 className={styled.faq_question_li}>
                  <span> 2. </span> {texts.COMPLETE_CERT_2}
                </Body1>
              </div> */}
              <div className={styled.single_faq}>
                <Body1 className={styled.faq_question}>​{texts.DONT_FORGET_DOWNLOAD}</Body1>
              </div>

              {isGlobalClimate && (
                <div className={styled.single_faq}>
                  <Body1 className={styled.faq_question}>​{texts.IF_THIS_MIGHT_END}</Body1>
                </div>
              )}
            </div>
          </div>
        )}
      </Box>
    </ModalBox>
  );

  return PageUI;
};

export default InfoModal;
