import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetObjFromArr } from 'Utils';
import OsProperties from 'Utils/OsProperties';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    // marginBottom: theme.spacing(2),
    // width: 280,
    // maxWidth: '95%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      background: 'transparent',
    },
    '& .MuiOutlinedInput-input.Mui-focused': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& .MuiInputLabel-outlined': {
      top: '-3px',
      left: '8px',
      '&.MuiInputLabel-shrink': {
        top: '0',
        left: '0',
      },
    },
    '& .MuiFormLabel-root': {
      fontWeight: theme.typography.fontWeightLight,
    },
    '& .MuiInputBase-root': {
      // borderRadius: theme.shape.borderRadius,
      borderRadius: '8px',
      color: theme.palette.grey['600'],
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey['600'],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& label': {
      color: theme.palette.grey['500'],
    },
    '& label.Mui-focused': {
      color: theme.palette.grey['500'],
    },
    '& .MuiSelect-icon': {
      color: theme.palette.grey['600'],
    },
  },
  menu: {
    '& .MuiPaper-root': {
      marginTop: theme.spacing(0.5),
    },
    '& .MuiListItem-root': {
      marginTop: theme.spacing(1),
      color: theme.palette.text.secondary,
      '& .MuiListItemIcon-root': {
        fontSize: theme.typography.pxToRem(20),
        color: theme.palette.text.secondary,
        minWidth: '36px',
      },
      '&.MuiListItem-root.Mui-disabled': {
        opacity: 1,
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: 'capitalize',
        '& p': {
          margin: theme.spacing(0.5, 0, 0, 0),
        },
      },
    },
    '& .MuiListItem-root:hover': {
      background: theme.palette.secondary.main,
      //background: theme.palette.secondary.bonzoDarkBlue,
      color: theme.palette.common.white,
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiListItem-root:active': {
      color: theme.palette.common.white,
      background: theme.palette.secondary.main,
      //background: theme.palette.secondary.bonzoDarkBlue,
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiListItem-root.Mui-selected': {
      color: theme.palette.common.white,
      //background: theme.palette.secondary.bonzoDarkBlue,
      background: theme.palette.secondary.main,
    },
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      color: theme.palette.common.white,
      background: theme.palette.secondary.main,
      // background: theme.palette.secondary.bonzoDarkBlue,
    },
    '& .MuiListItem-root.Mui-focusVisible': {
      color: theme.palette.common.white,
      background: theme.palette.secondary.main,
      // background: theme.palette.secondary.bonzoDarkBlue,
    },
  },
}));

export const TSelect = ({ value, list, callback, tag, label, className, ...rest }) => {
  const styled = useStyles(rest);
  const [val, setVal] = useState(value);
  const localCallback = (event) => {
    setVal(event.target.value);
    const item = GetObjFromArr(list, 'index', event.target.value);
    if (callback) callback(tag, item);
  };
  const menuProps = { className: styled.menu };
  useEffect(() => {
    setVal(value);
  }, [value]);
  return (
    <FormControl variant="outlined" className={`${styled.root} ${className || ''}`}>
      <InputLabel id={tag}>{label}</InputLabel>
      <Select
        data-sid={list[0]?.name.toLowerCase()}
        labelId={tag}
        value={val}
        label={label}
        onChange={localCallback}
        MenuProps={menuProps}
        className="sSelect"
      >
        {list.map((item) => {
          return (
            <MenuItem key={item.index} value={item.index} data-sid={item.index} className="sList">
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TSelect;

const useStyles2 = makeStyles((theme) => ({
  mainRoot: {
    // width: '420px',
    // minWidth: '288px',
    // maxWidth: '95%',
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiAutocomplete-option': {
      color: theme.palette.grey['600'],
      // background: "white",
      borderRadius: '8px',
      borderColor: 'red',
    },
    // MuiOutlinedInput-root
    '& .MuiOutlinedInput-root': {
      borderColor: 'red',
    },
    '& .MuiAutocomplete-option[data-focus="true"]': {
      color: theme.palette.common.white,
      //background: theme.palette.secondary.bonzoDarkBlue,
      background: theme.palette.secondary.main,
    },
    '& .MuiAutocomplete-paper': {
      width: '100%',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 4px 0px, rgba(0, 0, 1, 0.25) 0px 2px 8px 0px;',
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: theme.palette.grey['600'],
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      borderRadius: '8px',
      borderColor: '#DEDEDE',
    },
    // '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    //   borderColor: "#DEDEDE"
    // },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DEDEDE',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DEDEDE !important',
    },
    '& .MuiOutlinedInput-root:focus .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DEDEDE !important',
    },
    '& .MuiOutlinedInput-root:active .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DEDEDE !important',
    },
    '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DEDEDE !important',
    },
    '& .MuiOutlinedInput-root:target .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DEDEDE !important',
    },
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      color: theme.palette.common.white,
      // background: theme.palette.secondary.bonzoDarkBlue,
      background: theme.palette.secondary.main,
    },
    // '.makeStyles-mainRoot-318 > div '
  },
  root: {
    flexShrink: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(2, 2, 1.75, 2),
      lineHeight: 1.5,
      backgroundColor: 'rgba(255,255,255,0.7)',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
      padding: theme.spacing(2),
    },
    '& .MuiOutlinedInput-input.Mui-focused': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& .MuiInputLabel-outlined': {
      top: '-3px',
      left: '8px',
      '&.MuiInputLabel-shrink': {
        top: 0,
        left: OsProperties.IsIos() ? '8px' : 0,
      },
    },
    '& .MuiFormLabel-root': {
      fontWeight: theme.typography.fontWeightLight,
    },
    '& .MuiInputBase-root': {
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey['600'],
      padding: 0,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey['600'],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['600']}`,
    },
    ' label': {
      color: theme.palette.grey['500'],
    },
    '& label.Mui-focused': {
      color: theme.palette.grey['500'],
    },
    '& .MuiFormLabel-root.Mui-disabled': {
      color: theme.palette.grey['500'],
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      border: '1.5px solid #414141',
    },
  },
  schoolSelect: {
    minWidth: '272px',
    width: '272px',
  },
}));

export const TAutoComplete = ({ value, list, callback, tag, label, className, styleCSS, disabled, data_sid, ...rest }) => {
  const styled = useStyles2(rest);

  const [val, setVal] = useState(value);

  const localCallback = (event, newValue) => {
    setVal(newValue);
    if (callback) callback(tag, newValue);
  };

  const dataSid = data_sid ? data_sid : label ? label.toLowerCase() : '';

  return (
    <Box style={styleCSS && styleCSS} className={`${styled.mainRoot} ${tag === 'profile-school-item' ? styled.schoolSelect : ''}`}>
      <Autocomplete
        disableClearable
        options={list}
        tag={tag}
        data-sid={dataSid}
        disabled={disabled}
        disableListWrap
        disablePortal
        value={val}
        onChange={localCallback}
        className="sSelect"
        getOptionLabel={(option) => option.name || ''}
        renderInput={(params) => <TextField {...params} className={styled.root} label={label} variant="outlined" />}
      />
    </Box>
  );
};
