import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props) => props.display || 'block',
    flexDirection: (props) => props.flexDirection || 'row',
    justifyContent: (props) => props.justifyContent || 'flex-start',
    alignItems: (props) => props.alignItems || 'flex-start',
    padding: (props) => (typeof props.p !== 'undefined' ? theme.spacing(props.p) : 0),
    paddingTop: (props) => (typeof props.pt !== 'undefined' ? theme.spacing(props.pt) : 0),
    paddingBottom: (props) => (typeof props.pb !== 'undefined' ? theme.spacing(props.pb) : 0),
    paddingRight: (props) => (typeof props.pr !== 'undefined' ? theme.spacing(props.pr) : 0),
    paddingLeft: (props) => (typeof props.pl !== 'undefined' ? theme.spacing(props.pl) : 0),
    margin: (props) => (typeof props.m !== 'undefined' ? (props.m === 'auto' ? props.m : theme.spacing(props.m)) : 0),
    flex: '1 1 auto',
    flexBasis: 'auto',
    flexGrow: (props) => (typeof props.flexGrow !== 'undefined' ? props.flexGrow : 1),
    flexShrink: (props) => (typeof props.flexShrink !== 'undefined' ? props.flexShrink : 1),
    position: (props) => props.position || null,
    minHeight: 'unset',
    overflow: 'hidden',
    overflowY: (props) => props.overflowY || 'auto',
    height: (props) => props.height,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      minHeight: 'unset',
    },
  },
  chatScrollingId: {
    marginBottom: 'auto!important',
  },
}));

export default useStyles;
