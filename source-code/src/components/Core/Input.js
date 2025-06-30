import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import OsProperties from 'Utils/OsProperties';
import { Box, Typography, useTheme } from '@material-ui/core';
import { Body1, Button, ButtonText } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(2, 2, 2, 2),
      lineHeight: 1.5,
      backgroundColor: 'rgba(255,255,255,0.7)',
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
      borderRadius: '8px' || theme.shape.borderRadius,
      color: theme.palette.grey['600'],
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey['250'],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['250']}`,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.grey['250']}`,
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
      border: '1.5px solid #DEDEDE',
    },
  },
  add_code_label: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#313644',
  },
  join_btn: {
    background: '#02BBFE',
    width: 'fit-content',
    height: '100%',
    fontFamily: 'Fredoka',
    fontSize: '16px',
    borderRadius: '15px',
    padding: '6px 22px',
    fontWeight: 700,
    margin: '0px',
    '&:hover': {
      background: '#02BBFE',
    },
  },
  input_container: {
    border: '1px solid #DEDEDE',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 42px',
    marginTop: '14px',
    '@media (max-width: 638.88px)': {
      // padding: "4px 22px",
    },
  },
  input: {
    border: '0px',
    padding: '0px',
    outline: '0px',
    fontFamily: 'Poppins',
    fontWeight: '400',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0px',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '0px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '0px 10px',
      lineHeight: 1.5,
      backgroundColor: 'transparent',
      fontSize: '18px',
    },
    '& ::placeholder': {
      fontSize: '18px',
    },
  },
  hide_input: {
    display: 'none',
  },
  label: {
    color: '#414141',
  },
  requiredAsterisk: {
    color: 'red',
    paddingLeft: '2px',
  },
  extraLabel: {
    color: '#2c4230',
    fontSize: '13px',
    fontStyle: 'italic',
    fontWeight: '500 !important',
  },
  global_voucher_code: {
    color: '#414141',
    fontFamily: 'Poppins !important',
    fontWeight: '600 !important',
  },
  global_voucher_code_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '20px',
  },
}));

export default function Input({
  tag,
  label,
  extraLabel,
  required,
  value,
  onChange,
  onKeyPress,
  type,
  variant,
  disabled,
  autoFocus,
  end,
  start,
  id,
  placeholder,
  callback,
  ADD_CODE,
  inviteLabel,
  hideInput,
  className,
  labelFontSize = '16px', // Default value,
  placeholderFontSize = '16px', // Default value
  multiline, // Add this prop, for Text area field
  minRows, // Add this prop, for Text area field
  isShowText2,
  isGlobalClimate,
}) {
  const style = useStyles();
  const { texts } = useTheme();
  const dataSid = label ? label.toLowerCase() : '';
  return (
    <>
      {label && (
        <>
          <Typography
            variant="body1"
            className={`${style.label} ${ADD_CODE && style.add_code_label} poppins-font-600`}
            align="left"
            style={{ fontSize: labelFontSize }}
          >
            {label}
            {required && <span className={style.requiredAsterisk}>*</span>}
          </Typography>
        </>
      )}
      {extraLabel && isGlobalClimate && (
        <>
          <Typography variant="body1" className={`${style.extraLabel} poppins-font-600`} align="left">
            {extraLabel}
          </Typography>
        </>
      )}
      <Box className={`${ADD_CODE && style.input_container}  ${className}`}>
        <TextField
          fullWidth
          data-sid={dataSid}
          id={id}
          data-tag={tag}
          name={tag}
          style={{ background: disabled && '#ededed' }}
          variant={variant || 'outlined'}
          onChange={onChange}
          className={`sInput ${style.root} ${ADD_CODE && style.input} ${hideInput && style.hide_input}`}
          type={type}
          value={value}
          disabled={Boolean(disabled)}
          onKeyPress={onKeyPress}
          autoFocus={process.env.REACT_APP_IS_APP === '0' ? !!autoFocus : false}
          placeholder={placeholder}
          multiline={multiline} // this prop for text area field
          minRows={minRows} // this prop for text area field
          InputProps={{
            autoComplete: 'new-password',
            startAdornment: start ? <InputAdornment position="start">{start}</InputAdornment> : '',
            endAdornment: end ? <InputAdornment position="end">{end}</InputAdornment> : '',
            classes: {
              input: style.input,
            },
            inputProps: {
              style: { fontSize: placeholderFontSize }, // Add this style to change the placeholder font size
            },
          }}
        />
        {ADD_CODE && (
          <Button className={style.join_btn} tag="continue-addComp" onClick={callback}>
            <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
              {inviteLabel ? texts.INVITE : texts.JOIN}
            </ButtonText>
          </Button>
        )}
      </Box>

      {isGlobalClimate && isShowText2 && (
        <Box className={`${style.global_voucher_code_container}`}>
          <Body1>
            <span
              className={style.global_voucher_code}
              dangerouslySetInnerHTML={{
                __html: texts.GG_ADD_VOUCHER_CODE_TEXT2.replace(
                  'here',
                  `<a href="https://docs.google.com/spreadsheets/d/1wIiBV83ITzEPKlnyoUcAePlQqlF2aOD7/edit?gid=799220056#gid=799220056" target="_blank" rel="noopener noreferrer">here</a>`
                ),
              }}
            />
          </Body1>
        </Box>
      )}
    </>
  );
}
