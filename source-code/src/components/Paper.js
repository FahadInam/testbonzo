import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    // background: (props) => props.background || theme.palette.primary.main,
    overflow: 'hidden',
    display: (props) => props.display || 'flex',
    flexDirection: (props) => props.flexDirection || 'column',
    justifyContent: (props) => props.justifyContent || null,
    alignItems: (props) => props.alignItems || null,
    textAlign: (props) => props.textAlign || null,
    height: (props) => props.height || null,
    maxWidth: (props) => props.maxWidth || null,
    maxHeight: (props) => props.maxHeight || null,
    overflowY: (props) => props.overflowY || null,
    margin: (props) => (typeof props.m !== 'undefined' ? theme.spacing(props.m) : 0),
    marginTop: (props) => (typeof props.mt !== 'undefined' ? theme.spacing(props.mt) : null),
    marginRight: (props) => (typeof props.mr !== 'undefined' ? theme.spacing(props.mr) : null),
    marginBottom: (props) => (typeof props.mb !== 'undefined' ? theme.spacing(props.mb) : null),
    marginLeft: (props) => (typeof props.ml !== 'undefined' ? theme.spacing(props.ml) : null),
    // backgroundColor: (props) => props.backgroundColor || 'white',
    padding: (props) => (typeof props.p !== 'undefined' ? theme.spacing(props.p) : theme.spacing(1)),
    paddingTop: (props) => (typeof props.pt !== 'undefined' ? theme.spacing(props.pt) : null),
    paddingRight: (props) => (typeof props.pr !== 'undefined' ? theme.spacing(props.pr) : null),
    paddingBottom: (props) => (typeof props.pb !== 'undefined' ? theme.spacing(props.pb) : null),
    paddingLeft: (props) => (typeof props.pl !== 'undefined' ? theme.spacing(props.pl) : null),
    borderRadius: (props) => (typeof props.br !== 'undefined' ? theme.spacing(props.br) : '20px'),
  },
}));

const MPaper = React.forwardRef(
  ({ children, className, styleCSS, elevation, onClick, tag, data_sid, noRootClass = false, ...style }, ref) => {
    const styled = useStyle(style);
    return (
      <Paper
        data-tag={tag}
        onClick={onClick}
        elevation={typeof elevation !== 'undefined' ? elevation : 1}
        ref={ref}
        style={styleCSS}
        data-sid={data_sid}
        className={`${!noRootClass && styled.root} ${className || ''}`}
      >
        {children}
      </Paper>
    );
  }
);

export default MPaper;
