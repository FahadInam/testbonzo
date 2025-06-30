import LZString from 'lz-string';
import { config } from 'Constants';

const Compress = (v) => {
  if (process.env.NODE_ENV === 'development') return v;
  return LZString.compressToUTF16(v);
};

const DeCompress = (v) => {
  if (process.env.NODE_ENV === 'development') return v;
  return LZString.decompressFromUTF16(v);
};

const Set = (key, value, mustSave = true) => {
  const compressed = Compress(typeof value === 'object' ? JSON.stringify(value) : value);
  if (mustSave) localStorage.setItem(Compress(config.localStorageKey + key), compressed);
  return compressed;
};

const Get = (key, defaultVal, shouldDecrypt = true) => {
  const val = localStorage.getItem(Compress(config.localStorageKey + key));
  if (!shouldDecrypt) return val !== null ? val : defaultVal;
  return val !== null ? DeCompress(val) : defaultVal;
};

const Delete = (key, withoutPrefix = false) => {
  localStorage.removeItem(Compress(`${config.localStorageKey}${withoutPrefix ? '' : key}`));
};

const LocalStorage = {
  Compress,
  DeCompress,
  Set,
  Get,
  Delete,
};

export default LocalStorage;
