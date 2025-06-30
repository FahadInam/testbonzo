import React from 'react';
import Check from '@material-ui/icons/Check';
import { styled } from '@material-ui/core/styles';

// Prevent `ownerState` from being forwarded to the DOM element
const CustomStepIconRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'ownerState', // ✅ Filters out `ownerState`
})(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active || ownerState.completed ? '#fff' : ownerState.next ? '#A3A8B5' : '#e0e0e0',
  border: ownerState.active ? '2px solid #02BBFE' : ownerState.completed ? '2px solid #BDBDBD' : 'none',
  zIndex: 1,
  color: ownerState.active || ownerState.completed ? '#02BBFE' : '#fff',
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.875rem',
}));

const CustomStepIcon = (props) => {
  const { active, completed, icon, className } = props;

  const ownerState = {
    active,
    completed,
    next: !active && !completed && icon === props.icon + 1,
  };

  return (
    <CustomStepIconRoot className={className} ownerState={ownerState}>
      {completed ? <Check style={{ fontSize: '0.875rem', color: '#112D70' }} /> : icon}
    </CustomStepIconRoot>
  );
};

export default CustomStepIcon;
