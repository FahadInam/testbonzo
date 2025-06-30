import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Box, useTheme, Input, IconButton } from '@material-ui/core';
import RecommendedIcon from 'Assets/images/bonzoui/tabicons/friendsrecommended.svg';
import ExistingIcon from 'Assets/images/bonzoui/tabicons/friendslist.svg';
import { SearchUser } from 'Actions';
import { Paper, NoDataFound } from 'Components';
import ListBox from '../shared/ListBox';
import useStyles from './style';

const FriendsStructure = React.memo(({ existing, recommended, loaded, competition, competitionDetails, search, isSearch }) => {
  const [searchStr, setSearchStr] = useState('');
  const { texts } = useTheme();
  const styled = useStyles();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const { competition_id } = competition;
    const { current_grade } = competitionDetails || {};
    dispatch(SearchUser({ competition_id, current_grade }, searchStr, texts));
  };

  const callback = (e) => {
    if (!loaded) return;
    const t = e.currentTarget.getAttribute('data-tag') || e.target.name;

    switch (t) {
      case 'search-box':
        setSearchStr(e.target.value);
        if (e.target.value.length === 0) {
          //dispatch(SearchUser(competition, e.target.value, texts));
          handleSearch(e);
        }
        break;
      case 'search-btn':
        //e.preventDefault();
        //dispatch(SearchUser(competition, searchStr, texts));
        handleSearch(e);
        break;
      case 'clear-btn':
        setSearchStr('');
        dispatch(SearchUser(competition, '', texts));
        break;
      default:
        break;
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      const { competition_id } = competition;
      const { current_grade } = competitionDetails || {};
      dispatch(SearchUser({ competition_id, current_grade }, searchStr, texts));
    }
  };
  return (
    <>
      <Grid item xs={12}>
        <Paper p={0} className={styled.transparentBg}>
          <Box>
            <Grid container className={styled.baseRoot}>
              <Box className={styled.root}>
                <Input
                  fullWidth
                  disableUnderline
                  name="search-box"
                  placeholder={texts.SEARCH_BY_NAME}
                  data-tag="search-box"
                  data-sid={texts.SEARCH_BY_NAME.toLowerCase()}
                  onChange={callback}
                  value={searchStr}
                  autoComplete="off"
                  onKeyPress={handleEnter}
                  className="sInput"
                />
              </Box>
              <Box display={searchStr ? 'block' : 'none'}>
                <IconButton className={styled.clearIcon} data-tag="clear-btn" onClick={callback}>
                  <i className="i i-cross" />
                </IconButton>
              </Box>
              <IconButton className={styled.searchIcon} data-tag="search-btn" onClick={callback}>
                <i className="i i-search2" />
              </IconButton>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      {existing && (
        <Grid item xs={12} id="Messages">
          <ListBox
            title={texts.MY_FRIENDS_LIST}
            icon={<img src={ExistingIcon} width="36" height="36" border="0" alt={texts.MY_FRIENDS_LIST} />}
            items={existing}
          />
        </Grid>
      )}

      {search && (
        <Grid item xs={12}>
          <ListBox
            title={texts.SEARCHED_FRIENDS}
            icon={<img src={ExistingIcon} width="36" height="36" border="0" alt={texts.SEARCHED_FRIENDS} />}
            items={search}
          />
        </Grid>
      )}

      {recommended && (
        <Grid item xs={12}>
          <ListBox
            title={texts.RECOMMENDATIONS}
            icon={<img src={RecommendedIcon} width="36" height="36" border="0" alt={texts.RECOMMENDATIONS} />}
            items={recommended}
          />
        </Grid>
      )}

      {isSearch && !search && <NoDataFound />}
      {!isSearch && !existing && !recommended && <NoDataFound />}
    </>
  );
});

export default FriendsStructure;
