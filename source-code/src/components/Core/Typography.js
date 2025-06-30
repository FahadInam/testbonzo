import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CreateMarkup } from 'Utils/Helpers';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: (props) => props.color || theme.palette.text.primary,
    fontWeight: (props) => props.fontWeight,
    textAlign: (props) => props.textAlign,
    fontSize: (props) => (props.fontSize ? props.fontSize : null),
    letterSpacing: (props) => props.letterSpacing,
    transform: 'translate3d(0,0,0)',
    margin: (props) => (typeof props.m !== 'undefined' ? theme.spacing(props.m) : 0),
    marginTop: (props) => (typeof props.mt !== 'undefined' ? theme.spacing(props.mt) : null),
    marginRight: (props) => (typeof props.mr !== 'undefined' ? theme.spacing(props.mr) : null),
    marginBottom: (props) => (typeof props.mb !== 'undefined' ? theme.spacing(props.mb) : null),
    marginLeft: (props) => (typeof props.ml !== 'undefined' ? theme.spacing(props.ml) : null),

    padding: (props) => (typeof props.p !== 'undefined' ? theme.spacing(props.p) : 0),
    paddingTop: (props) => (typeof props.pt !== 'undefined' ? theme.spacing(props.pt) : null),
    width: (props) => (typeof props.width !== 'undefined' ? props.width : null),
  },
}));

export const H1 = ({ children, className, ...rest }) => {
  const { palette } = useTheme();
  const color = rest.color || palette.text.primary;
  // const m = rest.m || 4;
  // const mb = rest.mb || 3;
  const m = typeof rest.m === 'number' ? rest.m : parseInt(rest.m, 10) || 4;
  const mb = typeof rest.mb === 'number' ? rest.mb : parseInt(rest.mb, 10) || 3;
  const textAlign = rest.textAlign || 'center';
  const styled = useStyles({ ...rest, color, m, mb, textAlign });
  return (
    <Typography variant="h1" className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};

export const H2 = ({ children, className, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.secondary.main;
  const fontWeight = rest.fontWeight || typography.fontWeightBold;
  const textAlign = rest.textAlign || 'center';
  const mb = rest.mb !== 'undefined' ? rest.mb : 4;
  const styled = useStyles({ ...rest, color, fontWeight, textAlign, mb });

  return (
    <Typography variant="h2" className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};

export const H3 = ({ children, className, ...rest }) => {
  const { palette } = useTheme();
  const color = rest.color || palette.text.primary;
  const styled = useStyles({ ...rest, color });
  return (
    <Typography variant="h3" style={{ lineHeight: '2.1rem', textAlign: 'center' }} className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};

export const H4 = ({ children, styleCSS, component, className, ...rest }) => {
  const { palette } = useTheme();
  const color = rest.color || palette.text.secondary;
  const styled = useStyles({ ...rest, color });
  return (
    <Typography variant="h4" style={styleCSS} component={component} className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};

export const H5 = ({ children, className, ...rest }) => {
  const { palette } = useTheme();
  const color = rest.color || palette.text.secondary;
  const styled = useStyles({ ...rest, color });
  return (
    <Typography variant="h5" className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};
export const H5B = ({ children, className, ...rest }) => {
  // const { palette } = useTheme();
  const color = rest.color || '#ffffff';
  const styled = useStyles({ ...rest, color });
  return (
    <Typography variant="h6" className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};

export const H6 = ({ children, className, ...rest }) => {
  const { palette } = useTheme();
  const color = rest.color || palette.text.secondary;
  const styled = useStyles({ ...rest, color });
  return (
    <Typography variant="h6" className={`${className || ''} ${styled.root}`}>
      {children}
    </Typography>
  );
};

export const Body1 = ({ children, styleCSS, component, className, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.text.secondary;
  const fontWeight = rest.fontWeight || typography.fontWeightMedium;
  const fontSize = rest.fontSize;
  const textAlign = rest.textAlign;
  const styled = useStyles({ ...rest, color, fontWeight, fontSize, textAlign });
  return (
    <Typography
      variant="body1"
      style={styleCSS}
      component={typeof component === 'string' ? component : 'span'}
      className={`${className || ''} ${styled.root}`}
    >
      {children}
    </Typography>
  );
};

export const Body2 = ({ children, className, component, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.grey['400'];
  const fontWeight = rest.fontWeight || typography.fontWeightMedium;
  const fontSize = rest.fontSize;
  const textAlign = rest.textAlign;
  const styled = useStyles({ ...rest, color, fontWeight, fontSize, textAlign });
  return (
    <Typography
      variant="body2"
      component={typeof component === 'string' ? component : 'span'}
      className={`${className || ''} ${styled.root}`}
    >
      {children}
    </Typography>
  );
};

export const TextCapitalize = ({ children, styleCSS, component, className, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.text.secondary;
  const fontWeight = rest.fontWeight || typography.fontWeightMedium;
  const fontSize = rest.fontSize;
  const textAlign = rest.textAlign;
  const styled = useStyles({ ...rest, color, fontWeight, fontSize, textAlign });
  return (
    <Typography
      variant="overline"
      style={styleCSS}
      component={typeof component === 'string' ? component : 'span'}
      className={`${className || ''} ${styled.root}`}
    >
      {children}
    </Typography>
  );
};

export const Body4 = ({ children, className, component, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.grey['400'];
  const fontWeight = rest.fontWeight || typography.fontWeightMedium;
  const styled = useStyles({ ...rest, color, fontWeight });
  return (
    <Typography
      variant="body2"
      component={typeof component === 'string' ? component : 'span'}
      className={`${className || ''} ${styled.root}`}
    >
      {children}
    </Typography>
  );
};

export const Subtitle2 = ({ children, className, component, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.grey['400'];
  const fontSize = rest.fontSize;
  const fontWeight = rest.fontWeight || typography.fontWeightMedium;
  const styled = useStyles({ ...rest, color, fontWeight, fontSize });
  return (
    <Typography
      variant="subtitle2"
      component={typeof component === 'string' ? component : 'span'}
      className={`${className || ''} ${styled.root}`}
    >
      {children}
    </Typography>
  );
};

export const ButtonText = ({ children, className, component, ...rest }) => {
  const { palette, typography } = useTheme();
  const color = rest.color || palette.grey['400'];
  const fontSize = rest.fontSize;
  const letterSpacing = rest.letterSpacing;
  const fontWeight = rest.fontWeight || typography.fontWeightMedium;
  const styled = useStyles({ ...rest, color, fontWeight, fontSize, letterSpacing });
  return (
    <Typography
      variant="button"
      component={typeof component === 'string' ? component : 'span'}
      className={`${className || ''} ${styled.root}`}
    >
      {children}
    </Typography>
  );
};

export const WriteString = ({ text, className }) => {
  return <span className={className || ''} dangerouslySetInnerHTML={CreateMarkup(text)} />;
};
