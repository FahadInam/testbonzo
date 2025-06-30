import React from 'react';
import PageStructure from '../shared/PageStructure';
import InstitutionDetailForm from './InstitutionDetailForm';
// import AccountFooter from '../shared/AccountFooter';
import { useMediaQuery, useTheme } from '@material-ui/core';

function InstitutionDetail() {
  const isLgOrGreater = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { texts } = useTheme();
  return (
    <>
      <PageStructure
        headerSet={{
          overrideLeftButton: true,
          showRight: false,
          // showLeft: false,
          showLeft: !isLgOrGreater, // Show left button only on mobile screen
          showCenter: true,
        }}
      >
        <InstitutionDetailForm texts={texts} />
      </PageStructure>
    </>
  );
}

export default InstitutionDetail;
