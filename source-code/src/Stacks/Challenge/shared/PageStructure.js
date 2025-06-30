import React, { useState } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { FlexibleView, SlidableView, Header } from 'Components';
import { SelectedCompetition } from 'Actions';
import ResContainer from 'Components/Layouts/ResponsiveGrid';
import PageTitle from 'Components/Core/PageTitle';

const PageStructure = ({ children, headerSet, hideHeader, noRes, boxClassName, containerClass, logo, title, showTitle, invisibleScore = false }) => {
  const [scrollTarget, setScrollTarget] = useState(undefined);
  const trigger = useScrollTrigger({ target: scrollTarget, threshold: 0, disableHysteresis: true });
  const callback = () => {
    // should clear all pages and challenge data
    SelectedCompetition.GotoCompetition();
  };

  return (
    <SlidableView showLights>
      {!hideHeader && (
        <Header
          trigger={trigger}
          headerSet={
            headerSet || {
              showLeft: true,
              showRight: true,
              notify: true,
              callback,
            }
          }
          invisibleScore= {invisibleScore}
        />
      )}
      <FlexibleView
        flexGrow={noRes ? 0 : null}
        flexShrink={noRes ? 0 : null}
        height={noRes ? '100%' : null}
        overflowY={noRes ? 'auto' : null}
        position={noRes ? 'relative' : null}
        ref={(node) => {
          if (node) {
            setScrollTarget(node);
          }
        }}
      >
        {/* {typeof title === 'string' ? <H3>{title}</H3> : title} */}
        {/*THIS NEEDS to be fixed for game play*/}
        {showTitle && <PageTitle logo={logo} name={title} />}
        {noRes ? (
          children
        ) : (
          <ResContainer fullWidth boxClassName={boxClassName} className={containerClass}>
            <div></div>
            {children}
          </ResContainer>
        )}
      </FlexibleView>
    </SlidableView>
  );
};

export default PageStructure;
