/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from 'react';
import Compressor from 'compressorjs';
// import ResContainer from 'Components/Layouts/ResponsiveGrid';
import Tooltip from '@material-ui/core/Tooltip';
import { Box, Grid, IconButton, TextField, useTheme } from '@material-ui/core';
import { Paper } from 'Components';
import { Cordova } from 'Utils';
import { Toast } from 'Actions';
import { ALERT } from 'Constants';
import ImagePreloader from 'Assets/images/loader.gif';
import useStyles from './style';

const MessageStructure = ({ messages, callback, msg, handleEnter, uploadedImageCallback, UploadedImage, isSupportChat = false }) => {
  const styled = useStyles();
  const { texts } = useTheme();
  // const allowedImageTypes = `.jpg, .jpeg, .png`;
  const fileInputRef = useRef(null);
  const MainScroll = document.getElementById('chatScrollingId');
  const [tempLength, setTempLength] = useState(0);
  // const [file, setFile] = useState(null);

  useEffect(() => {
    if (messages.length !== tempLength) {
      if (MainScroll) {
        MainScroll.scrollTop = MainScroll.scrollHeight;
        setTempLength(messages.length);
      }
    }
  }, [messages, MainScroll, tempLength]);

  const uploadFile = async (e) => {
    const { files } = e.target;
    //  console.log('onFileInputChange', files.length);

    if (files.length === 0) {
      return;
    }

    if (files[0].type === 'application/pdf') {
      return;
    }
    const file = files[0];
    if (file.size > 5242880 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      Toast.Show('Maximum upload limit is 5 MB', ALERT.ERROR);
      return;
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
      document.getElementsByClassName('loaderImageUpload')[0].style.display = 'flex';
      /* eslint-disable-line no-new */ new Compressor(file, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        maxWidth: 1600,
        success: (cBlob) => {
          const compressedFile = new File([cBlob], cBlob.name, {
            type: cBlob.type,
          });
          if (callback) uploadedImageCallback('Upload', compressedFile);
        },
        error: (err) => {
          console.log('error', err);
          document.getElementsByClassName('loaderImageUpload')[0].style.display = 'none';
        },
      });
    } else if (callback) uploadedImageCallback('Upload', file);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const delImage = () => {
    uploadedImageCallback('Delete');
  };

  return (
    <>
      <Grid xs={12} item>
        <div className={styled.messageArea}>{messages}</div>
      </Grid>

      <div className={UploadedImage?.image ? styled.imageTextArea : styled.textArea}>
        {/* <ResContainer>
          <Grid xs={12} item> */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {UploadedImage?.image && (
            <Box className={styled.ImageContainer}>
              <img height="100%" className={styled.imageShared} src={Cordova.Path(UploadedImage?.image, true)} alt="Uploaded File" />

              <Box>
                <IconButton className={styled.deleteBtn} onClick={delImage} data-tag="delMsg">
                  <i className="i i-cross" />
                </IconButton>
              </Box>
            </Box>
          )}

          <Box display="flex" flexDirection="row" alignItems="center" sx={{ width: '95%' }}>
            <Box className={styled.inputWrapper} sx={{ width: '100%' }}>
              <div
                className="loaderImageUpload"
                style={{
                  background: 'rgba(88, 153, 228, 0.001)',
                  color: 'white',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  zIndex: '1',
                  display: 'none',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={Cordova.Path(ImagePreloader)} width="32" height="32" alt="Loading..." />
              </div>
              <Paper overflowY elevation={0} p={0.5} pl={1} pr={1}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={2}
                  className={styled.input}
                  name="msg"
                  data-tag="msg"
                  value={msg}
                  onChange={callback}
                  onKeyPress={handleEnter}
                  placeholder={texts.CHAT_PLACEHOLDER}
                  autoFocus={process.env.REACT_APP_IS_APP === '0'}
                />
              </Paper>
            </Box>
            {isSupportChat && (
              <div className={styled.sendButtonWrapper}>
                <Tooltip disableFocusListener title="Upload Image">
                  <IconButton className={styled.buttonRipple} onClick={onTargetClick} data-tag="upload-image">
                    <Box className={styled.sendBtn}>
                      <i className="i i-image-upload" />
                    </Box>
                  </IconButton>
                </Tooltip>

                <input
                  onChange={uploadFile}
                  accept="image/*"
                  ref={fileInputRef}
                  type="file"
                  className={` ${styled.hiddenInputField} hidden`}
                />
              </div>
            )}
            <div className={styled.sendButtonWrapper}>
              <Tooltip disableFocusListener title="Send">
                <IconButton className={styled.buttonRipple} onClick={callback} data-tag="send">
                  <div className={styled.sendBtn}>
                    <i className="i i-send" />
                  </div>
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        </div>
        {/* </Grid>
        </ResContainer> */}
      </div>
    </>
  );
};
export default MessageStructure;
