import React from 'react';

const Numbers = {
  OrdinalIndicator({ n, isSuperRequired }) {
    let finalValue = n;
    let postFix = 'th';
    if (!isNaN(n)) {
      if (parseInt(n, 10) % 10 === 1 && parseInt(n, 10) % 100 !== 11) postFix = 'st';
      if (parseInt(n, 10) % 10 === 2 && parseInt(n, 10) % 100 !== 12) postFix = 'nd';
      if (parseInt(n, 10) % 10 === 3 && parseInt(n, 10) % 100 !== 13) postFix = 'rd';
      finalValue = n + postFix;
      if (isSuperRequired)
        finalValue = (
          <>
            {n}
            <sup>{postFix}</sup>
          </>
        );
    } else if (typeof n === 'string') {
      const [first] = n.split('');
      finalValue = first;
    }
    return <>{finalValue}</>;
  },

  FloatFix(n, isPercentage = false) {
    if (isNaN(n) || n === '') return 0;
    let newN = parseFloat(n);
    if (newN < 0 && isPercentage) newN = 0;
    if (newN > 100 && isPercentage) newN = 100;
    return this.SetZeroError(newN);
  },

  ZeroPad(n) {
    return n < 10 ? `0${n}` : n;
  },

  SetZeroError(n) {
    const num = `${parseFloat(n).toFixed(2)}`;
    if (num.split('.').length === 1 || parseInt(num.split('.')[1], 10) === 0) return `${num.split('.')[0]}`;
    return num;
  },

  AbbreviatedNumber(num, digits) {
    const si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
  },

  ToCommaSeparated(str, l) {
    if (l === 'urdu') return str.toLocaleString('en-IN');
    const fStr = str.toLocaleString();
    return fStr.length === 1 ? `0${fStr}` : fStr;
  },
  ToCommaSeparatedWithoutZero(str, l) {
    if (l === 'urdu') return str.toLocaleString('en-IN');
    const fStr = str.toLocaleString();
    return fStr.length === 1 ? `${fStr}` || 0 : fStr || 0;
  },

  AtLeastZero(n) {
    if (typeof n === 'undefined') return 0;
    return n;
  },
};

export default Numbers;
