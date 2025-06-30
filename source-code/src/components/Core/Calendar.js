import React, { useState } from 'react';
import DayJsUtils from '@date-io/dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '288px',
    // borderRadius: '8px',
    margin: '10px auto 0px auto',
    // maxWidth: '95%',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(2),
      color: theme.palette.grey['400'],
    },
    '& .MuiOutlinedInput-input.Mui-focused': {
      border: `1.5px solid ${theme.palette.grey['250']}`,
    },
    '& .MuiFormLabel-root': {
      fontWeight: theme.typography.fontWeightLight,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
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
    '& label': {
      color: theme.palette.grey['500'],
    },
    '& label.Mui-focused': {
      color: theme.palette.grey['500'],
    },
    '& MuiTypography-body2': {
      color: theme.palette.grey['400'],
    },
    '& .MuiPickersToolbar-toolbar': {
      backgroundColor: theme.palette.grey['400'],
    },
  },
}));

const Calendar = React.memo(function Calendar(props) {
  const style = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (date) => {
    const newYear = date.year();
    if (newYear !== selectedYear) {
      setSelectedYear(newYear);
      setOpen(true);
    }
  };

  const handleDayClick = (date) => {
    if (date.year() === selectedYear) {
      setOpen(false);
    }
    props.onChange(date);
  };

  return (
    <Box className={style.root}>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <DatePicker
          {...props}
          open={open}
          data-sid={props?.data_sid}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={handleDayClick}
          onYearChange={handleYearChange}
          variant="inline"
          inputVariant="outlined"
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
});

export default Calendar;
