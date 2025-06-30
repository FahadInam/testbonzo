import React from 'react';
import { Divider, ListItemText, ListItem, List, ListSubheader, Box } from '@material-ui/core';
import { Menu, Body2 } from 'Components';
import { AvatarSwitcher } from 'Constants';
import useStyles from './style';

const NotificationMenu = ({ menuAnchor, callback }) => {
  // const { texts } = useTheme();
  const styled = useStyles();

  const NotificationCenterUi = (
    <Menu menuAnchor={menuAnchor} callback={callback} avAlign="bottom" tvAlign="top" hvAlign="right">
      <List className={styled.root}>
        <ListSubheader>Notification</ListSubheader>
        <Divider className={styled.divider} />
        <ListSubheader>New</ListSubheader>
        <ListItem data-tag="invitations" onClick={callback} alignItems="flex-start">
          <Box position="relative">
            <AvatarSwitcher t="1" s={48} className={styled.topAvatar} />
            <Box className={styled.avatarIcon}>
              <i className="i i-play_button_invert" />
            </Box>
          </Box>
          <Box ml={1}>
            <ListItemText
              ml={2}
              primary="Maths Challenge"
              secondary={
                <>
                  <Body2>Basit Siddiqui</Body2>
                  {' — I want to play math challange with you.'}
                </>
              }
            />
            {'1 hours ago'}
          </Box>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem data-tag="Messages" onClick={callback} alignItems="flex-start">
          <Box position="relative">
            <AvatarSwitcher t="1" s={48} className={styled.topAvatar} />
            <Box className={styled.avatarIcon}>
              <i className="i i-invite" />
            </Box>
          </Box>
          <Box ml={1}>
            <ListItemText
              ml={2}
              primary="Message"
              secondary={
                <>
                  <Body2>Yahya Naveed</Body2>
                  {''}
                </>
              }
            />
            a few moments ago
          </Box>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListSubheader>Earlier</ListSubheader>
        <ListItem data-tag="invitations" onClick={callback} alignItems="flex-start">
          <Box position="relative">
            <AvatarSwitcher t="1" s={48} className={styled.topAvatar} />
            <Box className={styled.avatarIcon}>
              <i className="i i-play_button_invert" />
            </Box>
          </Box>
          <Box ml={1}>
            <ListItemText
              ml={2}
              primary="Dino Egg Challenge"
              secondary={
                <>
                  <Body2>Adeel Ali</Body2>
                  {' — I challange you in mathamatics game .'}
                </>
              }
            />
            2 hours ago
          </Box>
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem data-tag="result" onClick={callback} alignItems="flex-start">
          <Box position="relative">
            <AvatarSwitcher t="1" s={48} className={styled.topAvatar} />
            <Box className={styled.avatarIcon}>
              <i className="i i-play_button_invert" />
            </Box>
          </Box>
          <Box ml={1}>
            <ListItemText
              ml={2}
              primary="Dino Egg Challenge"
              secondary={
                <>
                  <Body2>Adeel Ali</Body2>
                  {' — Match completed.'}
                </>
              }
            />
            2 hours ago
          </Box>
        </ListItem>
      </List>
    </Menu>
  );

  return NotificationCenterUi;
};

export default NotificationMenu;
