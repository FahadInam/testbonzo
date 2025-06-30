import React, { useState } from 'react';

function CustomOtpInput({ onInputChange }) {
  const [otpValue, setOtpValue] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setOtpValue(value.slice(0, 4));
    onInputChange(value);
  };
  return (
    <div>
      <input className="input___otp" maxLength="4" value={otpValue} onChange={handleChange} />
      <style>
        {`
          .input___otp {
            display: block;
            margin: 28px auto;
            border: none;
            padding: 0;
            width: 5.6ch;
            background: repeating-linear-gradient(
              90deg,
              dimgrey 0,
              dimgrey 1ch,
              transparent 0,
              transparent 1.4ch
            )
            0 100%/5.2ch 2px no-repeat;
            font: 7ch droid sans mono, consolas, monospace;
            letter-spacing: 0.4ch;
          }

          .input___otp:focus {
            outline: none;
            color: 222222;
          }
        `}
      </style>
    </div>
  );
}

export default CustomOtpInput;
