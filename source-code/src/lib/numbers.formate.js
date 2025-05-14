export const numbers = {
  /**
   * @param {string | number} n
   */
  FloatFix(n, isPercentage = false) {
    // @ts-ignore
    if (isNaN(n) || n === "") return 0;
    // @ts-ignore
    let newN = parseFloat(n);
    if (newN < 0 && isPercentage) newN = 0;
    if (newN > 100 && isPercentage) newN = 100;
    return this.SetZeroError(newN);
  },

  // @ts-ignore
  ZeroPad(n) {
    return n < 10 ? `0${n}` : n;
  },

  /**
   * @param {string | number} n
   */
  SetZeroError(n) {
    // @ts-ignore
    const num = `${parseFloat(n).toFixed(2)}`;
    if (num.split(".").length === 1 || parseInt(num.split(".")[1], 10) === 0)
      return `${num.split(".")[0]}`;
    return num;
  },

  /**
   * @param {number} num
   * @param {number | undefined} digits
   */
  AbbreviatedNumber(num, digits) {
    const si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  },

  /**
   * @param {{ toLocaleString: (arg0: string | undefined) => any; }} str
   * @param {string} l
   */
  ToCommaSeparated(str, l) {
    if (l === "urdu") return str.toLocaleString("en-IN");
    // @ts-ignore
    const fStr = str.toLocaleString();
    return fStr.length === 1 ? `0${fStr}` : fStr;
  },
  /**
   * @param {{ toLocaleString: (arg0: string | undefined) => any; }} str
   * @param {string} l
   */
  ToCommaSeparatedWithoutZero(str, l) {
    if (l === "urdu") return str.toLocaleString("en-IN");
    // @ts-ignore
    const fStr = str.toLocaleString();
    return fStr.length === 1 ? `${fStr}` || 0 : fStr || 0;
  },

  /**
   * @param {any} n
   */
  AtLeastZero(n) {
    if (typeof n === "undefined") return 0;
    return n;
  },
};
