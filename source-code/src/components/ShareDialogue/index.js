import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ModalBox, Button, H5, Input as CustomInput } from 'Components';
import { OutlinedButton } from 'Components/Core/Button';
import { ButtonText } from 'Components/Core';
import { Cordova, getInstanceType, ShareSocialMedia } from 'Utils';
import { ALERT } from 'Constants';
import { Toast } from 'Actions/app.control.action';
import useStyles from './style';
import addCodeIcon from 'Assets/images/bonzoui/invite.png';

import twitterIcon from 'Assets/images/bonzoui/socialicons/twitter.png';
import facebookIcon from 'Assets/images/bonzoui/socialicons/facebook.png';
import linkedinIcon from 'Assets/images/bonzoui/socialicons/linkedin.png';
import googleIcon from 'Assets/images/bonzoui/socialicons/google.png';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const ShareDialogue = ({ isVisible, title, subTitle, textToShare, Callback, textToShareSh }) => {
  const { texts } = useTheme();
  const styled = useStyles();
  const [shareLink, setShareLink] = useState(false);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isShupavu = getInstanceType(Inst_config.instance_id, INSTANCES_ID.SHUPAVU_ID);

  const linkToShare = `${Inst_config?.share_url}${isShupavu ? textToShareSh : textToShare}`;

  useEffect(() => {
    if (isVisible) {
      if (Cordova.IsCordova) {
        Cordova.Share(linkToShare);
        Callback(false);
      } else {
        setShareLink(true);
      }
    } else {
      setShareLink(false);
    }
  }, [isVisible, linkToShare, Callback]);

  const callback = (e) => {
    const t = e.currentTarget.getAttribute('data-tag');
    switch (t) {
      case 'facebook':
        ShareSocialMedia(e, linkToShare, texts.FACEBOOK);
        break;
      case 'twitter':
        ShareSocialMedia(e, linkToShare, texts.TWITTER);
        break;
      case 'linkedin':
        ShareSocialMedia(e, linkToShare, texts.LINKED_IN);
        break;
      case 'overlay':
      case 'close':
        Callback(false);
        break;
      default:
        break;
    }
  };

  const SocialShareButton = ({ cb, tag, text = 'Share with Google', icon = 'google' }) => {
    let iconToPass;
    switch (icon) {
      case 'twitter':
        iconToPass = twitterIcon;
        break;
      case 'facebook':
        iconToPass = facebookIcon;
        break;
      case 'linkedin':
        iconToPass = linkedinIcon;
        break;
      case 'google':
        iconToPass = googleIcon;
        break;
      default:
        break;
    }
    return (
      <OutlinedButton
        className={styled.SocialBtn}
        tag={tag}
        borderRadius={15}
        width="100%"
        startIcon={iconToPass ? <img src={iconToPass} alt={icon} width="24" height="24" /> : <i className={`i i-${icon}`} />}
        onClick={cb}
        fixedWidthIcon
      >
        <ButtonText fontSize="18px" fontWeight="500">
          {text}
        </ButtonText>
      </OutlinedButton>
    );
  };

  return (
    <ModalBox
      isVisible={shareLink}
      ADD_CODE
      className={`${styled.modal_container} inviteModalCrossIcon`}
      addCodeIcon={addCodeIcon}
      allowClose
      callback={callback}
      icon="invite"
      title={title}
      child2={
        <>
          <Box m={4} textAlign="center" display="flex" flexDirection="column" justifyContent="center">
            <Box m={0.5}>
              <SocialShareButton tag="twitter" text={texts.SHARE_ON_TWITTER} icon="twitter" cb={callback} />
            </Box>
            <Box m={0.5}>
              <SocialShareButton tag="facebook" text={texts.SHARE_ON_FACEBOOK} icon="facebook" cb={callback} />
            </Box>
            <Box m={0.5}>
              <SocialShareButton tag="linkedin" text={texts.SHARE_ON_LINKEDIN} icon="linkedin" cb={callback} />
            </Box>
            {/* <IconButton data-tag="facebook" type="submit" className={styled.facebook} onClick={callback}>
            <i className="i i-facebook" />
          </IconButton>
        </Box>
        <Box m={1}>
          <IconButton data-tag="twitter" type="submit" className={styled.twitter} onClick={callback}>
            <i className="i i-twitter" />
          </IconButton>
        </Box>
        <Box m={1}>
          <IconButton data-tag="linkedin" type="submit" className={styled.linkedin} onClick={callback}>
            <i className="i i-linkedIn" />
          </IconButton>
        </Box> */}
          </Box>
        </>
      }
    >
      <H5 m={4} textAlign="left" className={styled.shareText}>
        {subTitle}
      </H5>

      <Box mb={6} mt={3} textAlign="center" className={styled.inputCustom}>
        <CustomInput
          className="custom__input__share"
          tag="url"
          id="urlId"
          value={linkToShare}
          inviteLabel
          end={<CopyToClipboardUI linkToShare={linkToShare} />}
        />
      </Box>
    </ModalBox>
  );
};

export default ShareDialogue;

const CopyToClipboardUI = ({ linkToShare }) => {
  const { texts } = useTheme();
  return (
    <Box>
      <CopyToClipboard text={linkToShare} onCopy={() => Toast.Show(texts.CODE_COPIED, ALERT.SUCCESS)}>
        <Button tag="copy" className="btn btn__copy" data-clipboard-text={linkToShare} width="75px" height="32px" m={0} mt={0} mr={1}>
          <ButtonText fontWeight="600" fontSize="18px" color="#fff">
            {texts.COPY}
          </ButtonText>
        </Button>
      </CopyToClipboard>
    </Box>
  );
};
