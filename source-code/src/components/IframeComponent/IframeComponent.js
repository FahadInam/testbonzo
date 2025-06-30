import React, { useState, useEffect, useRef, useCallback } from "react";
// import { H3 } from 'Components';
import ReactDOM from "react-dom";
import "./IframeComponent.css";
// import { makeStyles } from '@material-ui/core';

const IframeComponent = ({ src, isOpenInitially = false, messageContent = null }) => {
  
// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 0,
//     height: '100%',
//     width: '100vw',
//     alignItems: 'center',
//     justifyContent: 'center',
//     maxHeight: '100vh',
//     display: 'flex',
//     left: 0,
//     top: 0,
//     padding: theme.spacing(2),
//     overflowX: 'hidden',
//     overflowY: 'auto',
//   },
//   modalBox: {
//     position: 'relative',
//     width: '100%',
//     paddingTop: theme.spacing(5.5),
//     margin: 'auto',
//     [theme.breakpoints.up('sm')]: {
//       maxWidth: (props) => (props.fullWidth ? null : '590px'),
//     },
//   },
//   modalBox2: {
//     position: 'relative',
//     width: '100%',
//     paddingTop: '0px',
//     margin: 'auto',
//     [theme.breakpoints.up('sm')]: {
//       maxWidth: (props) => (props.fullWidth ? null : '590px'),
//     },
//   },
//   selectionModalBox: {
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     // paddingTop: theme.spacing(5.5),
//     paddingTop: theme.spacing(1),
//     margin: 'auto',
//     [theme.breakpoints.up('sm')]: {
//       maxWidth: (props) => (props.fullWidth ? null : '590px'),
//     },
//     [theme.breakpoints.down('md')]: {
//       paddingTop: theme.spacing(0),
//     },
//   },
//   circle: {
//     height: theme.spacing(13),
//     width: theme.spacing(13),
//     borderRadius: '50%',
//     background: (props) => props.iconBg || theme.palette.secondary.main,
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     margin: '0 auto',
//     top: theme.spacing(1),
//     position: 'absolute',
//     zIndex: 2,
//     left: '50%',
//     marginLeft: theme.spacing(-6.5),
//     color: theme.palette.common.white,
//     fontSize: '52px',
//   },
//   fgBox: {
//     width: '100%',
//     height: '100%',
//     padding: '0px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: theme.spacing(3),
//     [theme.breakpoints.down('sm')]: {
//       paddingBottom: theme.spacing(2),
//     },
//   },
//   fgBox2: {
//     width: '100%',
//     height: '100%',
//     padding: '0px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: theme.spacing(1),
//     margin: '24px auto',
//   },
//   paper: {
//     width: '100%',
//     // padding: props =>
//     //   typeof props.p !== 'undefined' ? theme.spacing(props.p) : theme.spacing(5, 3),
//     paddingLeft: (props) => (typeof props.pl !== 'undefined' ? theme.spacing(props.pl) : null),
//     paddingRight: (props) => (typeof props.pr !== 'undefined' ? theme.spacing(props.pr) : null),
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: theme.palette.common.white,
//     [theme.breakpoints.up('sm')]: {
//       maxWidth: '590px',
//     },
//     [theme.breakpoints.down('sm')]: {
//       width: '95%',
//     },
//   },
//   fixedWidth: {
//     minWidth: '288px',
//     maxWidth: '400px',
//   },
//   close: {
//     position: 'absolute',
//     top: (props) => theme.spacing(props.icon ? 7 : 1.25),
//     right: theme.spacing(1),
//     color: theme.palette.grey['300'],
//     fontSize: '20px',
//     zIndex: 2,
//     // border: '1px solid red',
//   },
//   iconLeft: {
//     right: 'auto',
//     left: theme.spacing(1),
//   },
//   title: {
//     fontSize: '18px',
//     color: 'white',
//   },
//   profile_btn_container: {
//     display: 'flex',
//     width: '100%',
//     maxWidth: '440px',
//     gap: '20px',
//     // marginBottom: '24px',
//     '@media (max-width: 638.88px)': {
//       gap: '10px',
//       maxWidth: '84%',
//     },
//   },
//   accountSetting: {
//     margin: 0,
//     height: '100%',
//     width: '100vw',
//     alignItems: 'center',
//     justifyContent: 'center',
//     maxHeight: '100vh',
//     display: 'flex',
//     left: 0,
//     top: 0,
//     overflowX: 'hidden',
//     overflowY: 'auto',
//     background: 'radial-gradient(circle, rgba(28, 156, 249, 1) 0%, rgba(9, 86, 172, 1) 100%)',
//   },
//   selection_paper_header: {
//     background: theme.palette.grey['220'],
//     //padding: theme.spacing(2),
//     height: '56px',
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     color: '#ffffff',
//     zIndex: 1,
//     width: '100%',
//     [theme.breakpoints.down('sm')]: {
//       //padding: '8px',
//       height: '56px',
//     },
//   },
//   selection_paper_headerTextHeadings: {
//     background: theme.palette.grey['220'],
//     padding: '16px 20px',
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//     display: 'flex',
//     color: '#fffff',
//     zIndex: 1,
//   },
//   selection_paper_headerHeadingsTitle: {
//     // padding: '6px 20px',
//     color: '#ffffff',
//     whiteSpace: 'nowrap' /* Prevents the text from wrapping */,
//     overflow: 'hidden' /* Ensures that the overflow is hidden */,
//     textOverflow: 'ellipsis' /* Adds the ellipsis */,
//     width: '100%' /* Ensures the element takes up the full width of its container */,
//     display: 'block' /* Ensures the element behaves as a block */,
//   },
//   modeTitleIcon: {
//     width: '45px',
//     marginRight: '15px',
//     [theme.breakpoints.down('md')]: {
//       width: '32px',
//     },
//   },
// }));

  // const styled = useStyles();
  // const { palette, typography, texts } = useTheme();

  const [showIframe, setShowIframe] = useState(isOpenInitially);
  const [iframeSrc, setIframeSrc] = useState(src);
  const [loading, setLoading] = useState(false);
  const [messageData, setMessageData] = useState(messageContent);
  const [continueTimer, setContinueTimer] = useState(true);
  const iframeRef = useRef(null);

  // Memoize sendMessageToIframe with useCallback
  const sendMessageToIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow && messageData && messageData.length > 0) {
      setTimeout(() => {
        
    if (iframe && iframe.contentWindow && messageData && messageData.length > 0) {
      const message = { type: 'CERT_DATA', payload: messageData };
      // console.log('SENDING CERT DATA 1: ', messageData);
      iframe.contentWindow.postMessage(message, '*'); // Replace '*' if you know the iframe origin
    }
       }, 500);
    }
  }, [messageData]);

  // useEffect to handle the iframe loading initially
  useEffect(() => {
    if (isOpenInitially) {
      setIframeSrc(src);
      setShowIframe(true);
      setContinueTimer(true);
    } else {
      setIframeSrc("");
    }
    return () => {
      setIframeSrc(""); // Clean up the iframe on component unload
      setShowIframe(false);
    };
  }, [isOpenInitially, src]);

  // useEffect to send message to iframe if data changes and iframe is shown
  useEffect(() => {
    const intervalId = setInterval(() => {
    if(continueTimer) {

    if (showIframe && !loading && messageContent?.length > 0) {
      setMessageData(messageContent);
      sendMessageToIframe();
    }
  }
}, 5000);
return () => clearInterval(intervalId);
  }, [sendMessageToIframe, messageContent, loading, showIframe, continueTimer]);

  const closeIframe = () => {
    setShowIframe(false);
    setIframeSrc(""); // Set src to blank on close
  };

  // Set up an event listener to receive messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== '*' && event.origin !== 'http://localhost:3000' && event.origin.indexOf('globalclimateliteracy.org') === -1 && event.origin.indexOf('localhost') === -1 && event.origin.indexOf('.netlify.app') === -1 && event.origin.indexOf('knowledgeplatform') === -1) {
          console.warn('Received message from untrusted origin:', event.origin);
        return;
      }

      const { type, payload } = event.data;
      if (type === 'RESPONSE') {
        setContinueTimer(false);
        if(payload === 'ABC') console.log('payload: ', payload);
        // console.log('Received message from iframe:', payload);
      } else {
        // console.warn('Unknown message type:', type);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleIframeLoad = () => setLoading(false);

  // Conditional rendering based on `showIframe`
  return showIframe ? ReactDOM.createPortal(
    <div className="iframe-overlay">
      {loading && <div className="loader"></div>}
      <div className="close-overlay">
        <button onClick={closeIframe} className="close-button">
          <i className="i i-cross" />
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title="Dynamic iFrame"
        className="iframe-fullscreen"
        onLoad={handleIframeLoad}
      />
    </div>,
    document.body
  ) : null;
};

export default IframeComponent;
