import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Cordova } from 'Utils';
import cert from 'Assets/images/certicon.png';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import { Body1 } from 'Components';

const useStyles = makeStyles((theme) => ({
  cardBase: {
    // cursor: 'pointer',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    background: 'rgb(255, 255, 255)',
    margin: 'auto',
    borderRadius: '15px',
    backgroundColor: '#D5DBEA',
    boxShadow: '0px 8px 0px 0px rgba(0,0,0,0.3), 0px 3px 0px 0px rgba(0,0,0,0.8)',
  },
  certBannerBG: {
    color: '#000000',
    borderRadius: '1rem',
    margin: '0px',
    padding: '0px',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  certTextContent: {
    padding: '0px 6px 0px 0px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
  },
  certTextContent2: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  certImageIcon: {
    objectFit: 'contain',
    margin: 'auto 12px',
  },
  main_text: {
    color: '#000000',
    fontSize: '1.2rem',
    lineHeight: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  },
  text_container: {
    margin: '32px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0px',
    },
  },
}));

const InfoBanner = ({ text1, text2, text3, text4, text5, text6 }) => {
  const styled = useStyles();
  // const { texts } = useTheme();
  const allTexts = [text3, text4, text5, text6];
  return (
    <ResContainer>
      <Grid style={{ marginBottom: '24px' }} item xs={12}>
        <Box flexDirection="row" justifyContent="center" alignItems="center" className={styled.cardBase}>
          <div style={{ width: '100%', marginBottom: '8px', backgroundColor: '#ffffff', height: 'auto', borderRadius: '15px' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center" className={styled.certBannerBG}>
              <Grid item sm={12} lg={12} className={`${styled.certTextContent} ${styled.certTextContent2}`}>
                <Box ml={0} mr={0} mt={0} mb={0}>
                  <img height="50px" width="58px" src={Cordova.Path(cert)} alt="Certificate" className={styled.certImageIcon} />
                </Box>

                <Box flexDirection="row" justifyContent="center" alignItems="center">
                  {text1 && (
                    <Box className={`${styled.certTextContent} ${styled.text_container}`}>
                      <Body1>
                        <span className={styled.main_text} dangerouslySetInnerHTML={{ __html: text1 }} />
                      </Body1>
                    </Box>
                  )}

                  <Box className={`${styled.certTextContent} ${styled.text_container}`}>
                    <Body1>
                      <span className={styled.main_text} dangerouslySetInnerHTML={{ __html: text2 }} />
                    </Body1>
                  </Box>

                  {allTexts.map((text, index) =>
                    text ? (
                      <Box key={index} className={`${styled.certTextContent} ${styled.text_container}`}>
                        <Body1>
                          <span className={styled.main_text} dangerouslySetInnerHTML={{ __html: text }} />
                        </Body1>
                      </Box>
                    ) : null
                  )}
                </Box>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Grid>
    </ResContainer>
  );
};

export default InfoBanner;
