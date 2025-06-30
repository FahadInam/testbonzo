import React from 'react';

const PaymentOptionCard = ({ option, isSelected, isDisabled, onClick, isNormalUser }) => {
  return (
    <div
      className={`payment-option-card 
          ${isSelected ? 'selected' : ''} 
          ${isDisabled ? 'disabled' : ''}`}
      onClick={!isDisabled ? onClick : undefined}
      role={isDisabled ? null : 'button'}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
    >
      <div className="payment-option-card-content">
        <img
          src={option.imgSrc}
          alt={option.name}
          className={isNormalUser ? 'payment-option-dpo-image' : 'payment-option-card-image'}
        />
        <h6 className="payment-option-card-title">{option.name}</h6>
        {isDisabled && <div className="coming-soon-badge">Coming Soon</div>}
      </div>
    </div>
  );
};

export default PaymentOptionCard;
