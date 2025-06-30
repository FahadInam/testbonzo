import React from 'react';
import { Box } from '@material-ui/core';
import { Cordova } from 'Utils';

export default function GameLogo({ height, width, mt, mr, mb, ml, className, type, callback, srcLogo }) {
  return (
    <Box mt={mt || 1} mr={mr || 1} mb={mb || 1} ml={ml || 1} textAlign="center" className={className || ''}>
      {type === 'lsp' ? (
        <img height={height || '81px'} width={width || '96px'} src={Cordova.Path(srcLogo)} alt="logo" onClick={callback} />
      ) : type === 'lsc' ? (
        <img src={Cordova.Path(srcLogo)} alt="logo" onClick={callback} />
      ) : (
        <img src={Cordova.Path(srcLogo)} alt="logo" height={height || '96px'} width={width || '96px'} />
      )}
    </Box>
  );
}
