import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Grid, Box, useTheme, makeStyles } from '@material-ui/core';
import { Body1, WriteString, Paper, H6 } from 'Components';
import { InlineButton } from 'Components/Core/Button';
import { config } from 'Constants';
import { CHALLENGE_GLOBAL } from 'Constants/challenge.constants';
import Sounds from './Sounds';
import { OptAnimate } from '../../../Utils';
// import 'animate.css';

window.GlobalQuestionDelayTimer = null;

const useStyles = makeStyles((theme) => ({
  question: {
    background: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
    overflowX: 'auto',
    '& img': {
      maxHeight: '300px',
    },
  },
  option: {
    width: '100%',
    textAlign: 'left',
    overflow: 'hidden',
    overflowX: 'auto',
    '& img': {
      maxHeight: '300px',
    },
  },
  numberArea: {
    width: '38px',
    flex: '0 0 38px',
    flexBasis: '38px',
    flexGrow: 0,
    flexShrink: 0,
    height: '38px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(1.5),
    paddingTop: theme.spacing(0.25),
  },
  textArea: {
    flex: '1 1 auto',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    alignItems: 'center',
  },
  click: {
    height: 'auto',
    minWidth: '100%',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    whiteSpace: 'normal',
  },
  right: {
    background: theme.palette.common.green,
  },
  wrong: {
    background: theme.palette.common.red,
  },
  blocker: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.000000025)',
    zIndex: 2,
  },
  particleContainer: {
    width: '854px',
    height: '480px',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    display: 'block',
    margin: ' 0 auto',
    zIndex: '-1',
  },
}));

const mjaxConv = (ele) => {
  try {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, ele]);
  } catch (e) {
    // console.log(e);
  }
};

const MathJaxTextScript = (ref) => {
  try {
    if (!window.MathJax) {
      const head = document.getElementsByTagName('head')[0];
      let script = document.createElement('script');
      script.type = 'text/x-mathjax-config';
      script[window.opera ? 'innerHTML' : 'text'] = `MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        menuSettings: {
          zoom: "No Zoom",
          zscale: "100%"
        },
        tex2jax: {
          inlineMath: [["$", "$"],["\\(", "\\)"]]
        },
        MathMenu: {
          showRenderer: false
        },
        TeX: {
          extensions: ['AMSmath.js', 'AMSsymbols.js', 'mhchem.js']
        },
        messageStyle: "none",
        "HTML-CSS": {
          availableFonts: ["TeX"],
          preferredFont: "TeX",
          imageFont: null,
          linebreaks: {
            automatic: true,
            width: "container"
          },
          width: "container",
          matchFontHeight: true
        },
        styles: {
          ".MathJax_Display": {}
        }
      });
      MathJax.Hub.Startup.onload();`;
      head.appendChild(script);

      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js';
      script.onload = () => {
        if (window.MathJax) mjaxConv(ref);
      };
      head.appendChild(script);
    }
  } catch (e) {
    // console.log(e);
  }
};

const McqTemplate = React.memo(({ data, callback, allowPlaying }) => {
  const [stateRef, setStateRef] = useState({
    launched: false,
    index: 0,
    answer: [],
    blocker: true,
    isFinished: false,
  });
  const ref = useRef(null);
  const optRef = useRef(null);
  const practicalRef = useRef(null);

  const allQ = useMemo(() => JSON.parse(data.json_data), [data.json_data]);
  const curQ = allQ[stateRef.index];
  const styled = useStyles();

  // launching
  useEffect(() => {
    if (!stateRef.launched) {
      setTimeout(() => {
        setStateRef({
          ...stateRef,
          blocker: false,
          launched: true,
        });
        if (callback) callback(CHALLENGE_GLOBAL.START, allQ.length);
      }, 300);
    }
  }, [stateRef, callback, allQ.length]);

  // mathjax
  useEffect(() => {
    MathJaxTextScript(ref.current);
  }, []);

  useEffect(() => {
    if (window.MathJax) mjaxConv(ref.current);
  });

  // finish checker
  useEffect(() => {
    if (stateRef.isFinished) {
      if (callback) callback(CHALLENGE_GLOBAL.STOP);
    }
  }, [stateRef.isFinished, callback]);

  // sets new question on screen
  useEffect(() => {
    if (stateRef.blocker && stateRef.launched && !stateRef.isFinished) {
      const nextIndex = stateRef.index + 1;
      setTimeout(() => {
        if (nextIndex > allQ.length - 1) {
          setStateRef({
            ...stateRef,
            blocker: true,
            isFinished: true,
          });
          return;
        }
        setStateRef({
          ...stateRef,
          index: nextIndex,
          blocker: false,
        });
      }, config.questionDelay);
    }
  }, [stateRef, allQ.length]);

  // answer storing
  // blocking layer setup
  const answerSubmission = (t, item) => {
    const tempA = [...stateRef.answer];
    tempA.push(item);

    if (callback) {
      callback(CHALLENGE_GLOBAL.SUBMIT_QUESTION, {
        index: stateRef.index,
        correct: item.correct,
      });
    }

    const Option = optRef.current;
    if (item.correct) {
      Sounds.Right.currentTime = 0;
      Sounds.Right.play();

      new OptAnimate().Animate(Option.childNodes[item.index - 1], 'shakeY', 750, () => {}, false);
    } else {
      Sounds.Wrong.currentTime = 0;
      Sounds.Wrong.play();
      new OptAnimate().Animate(Option.childNodes[item.index - 1], 'shakeX', 750, () => {}, false);
    }

    setStateRef({
      ...stateRef,
      answer: [...tempA],
      blocker: true,
    });
  };

  return (
    <>
      {(stateRef.blocker || !allowPlaying) && (
        <Box
          className={styled.blocker}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return false;
            return false;
          }}
        />
      )}

      <Grid item xs={12} ref={ref}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper mt={4} p={4} className={styled.question}>
              <Body1>
                <WriteString text={curQ.question} />
              </Body1>
            </Paper>
          </Grid>

          <Grid xs={12} item>
            <Grid container spacing={4} ref={optRef}>
              <Option
                text={curQ.option1}
                isRight={curQ.correct1}
                index={1}
                callback={answerSubmission}
                given={stateRef.answer[stateRef.index]}
              />
              <Option
                text={curQ.option2}
                isRight={curQ.correct2}
                index={2}
                callback={answerSubmission}
                given={stateRef.answer[stateRef.index]}
              />
              <Option
                text={curQ.option3}
                isRight={curQ.correct3}
                index={3}
                callback={answerSubmission}
                given={stateRef.answer[stateRef.index]}
              />
              <Option
                text={curQ.option4}
                isRight={curQ.correct4}
                index={4}
                callback={answerSubmission}
                given={stateRef.answer[stateRef.index]}
              />
            </Grid>
          </Grid>

          <Grid xs={12} item>
            <Grid container spacing={4} ref={practicalRef} className={styled.particleContainer} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

export default McqTemplate;

const Option = ({ text, callback, index, isRight, given }) => {
  const styled = useStyles();
  const { palette } = useTheme();
  if (!text) return null;
  const answered = given || {};
  let isThisAnswer = false;

  const localCallback = () => {
    if (callback) callback('option', { index, correct: isRight === 'Y' });
  };

  let checkClass = '';
  if (answered.index === index && answered.correct) {
    isThisAnswer = true;
    checkClass = styled.right;
  } else if (answered.index === index && !answered.correct) {
    isThisAnswer = true;
    checkClass = styled.wrong;
  }

  return (
    <Grid xs={12} item>
      <InlineButton p={0} onClick={localCallback} data-tag={index} className={styled.click}>
        <Paper p={2} className={`${styled.option} ${checkClass}`} display="flex" flexDirection="row">
          <Box className={styled.numberArea}>
            <H6 color={isThisAnswer && palette.common.white}>{index}</H6>
          </Box>
          <Box className={styled.textArea}>
            <Body1 color={isThisAnswer && palette.common.white}>
              <WriteString text={text} />
            </Body1>
          </Box>
        </Paper>
      </InlineButton>
    </Grid>
  );
};
