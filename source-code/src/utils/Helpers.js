/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
/* eslint-disable camelcase */
import md5 from 'js-md5';
import dayjs from 'dayjs';
import { Toast } from 'Actions';
import { ALERT } from 'Constants';
import { INSTANCES_ID, TWENTY_FIRST_CTD_URLS } from 'Constants/instance.config';
import { PageSwitch } from 'Navigation';
import { AccountNav } from 'Navigation/Paths';

export const IsEmptyObject = (o) => {
  const keys = Object.keys(o);
  return keys.length === 0;
};

export const IsObject_Empty = (o) => {
  return typeof o === 'object' && o !== null && !Array.isArray(o) && Object.keys(o).length === 0;
};

export const GetObjFromArr = (arr, key, val) => {
  // console.log('GetObjFromArr', arr, key, val);
  return arr?.find((item) => (typeof item[key] === 'string' ? item[key].toUpperCase() === val.toUpperCase() : item[key] === val));
};

export const GetObjFromObj = (obj, key, value) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]][key].toUpperCase() === value.toUpperCase()) return obj[keys[i]];
  }
  return false;
};

export const RemoveDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export const CreateMarkup = (x) => {
  return { __html: x };
};

export const OnInputChange = ({ name, value }, state, update) => {
  const temp = {
    ...state,
  };
  temp[name] = value;
  update({ ...temp });
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateSecretCode = (code) => {
  const re = /^[a-z0-9]+$/i;
  return re.test(code);
};
export const PasswordFormation = (p) => {
  return md5.base64(p).slice(0, -2);
};

export const encodeDecode = (type, value) => {
  let changedValue = '';
  if (value !== 'undefined') {
    if (type === 'enc') {
      changedValue = window.btoa(value);
    } else if (type === 'dec') {
      changedValue = window.atob(value);
    }
  }
  return changedValue;
};

export const SortAlphaNum = (arr, key) => {
  return arr.sort((a, b) => {
    const reA = /[^a-zA-Z]/g;
    const reN = /[^0-9]/g;
    const aA = a[key].replace(reA, '');
    const bA = b[key].replace(reA, '');
    if (aA === bA) {
      const aN = parseInt(a[key].replace(reN, ''), 10);
      const bN = parseInt(b[key].replace(reN, ''), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    }
    return aA > bA ? 1 : -1;
  });
};

export const RemoveValueFromArray = (arr, val) => {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const GetRandomInt = (min, max) => {
  const nMin = Math.ceil(min);
  const nMax = Math.floor(max);

  return Math.floor(Math.random() * (nMax - nMin + 1)) + nMin;
};

export const UsernameResolver = (name, username) => {
  let nName = '';
  if (name) {
    nName = name;
  } else if (username) {
    const [first] = username.split('@');
    nName = first;
  }
  return nName;
};

export const ImageResolver = (p) => {
  return p.toLowerCase().split(' ').join('-').replace('-json', '');
};

export const SortOnDate = (arr, prop) => {
  return arr.sort((a, b) => {
    return new Date(b[prop]) - new Date(a[prop]);
  });
};

export const FilterOnArrayObjProp = (arr, prop, value) => {
  return arr.filter((e) => {
    return e[prop] === value;
  });
};

export const IsSafari = () => {
  if (navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0) {
    return true;
  }
  return false;
};

export const isString = (value) => typeof value === 'string';

export const parseURL = (str) => {
  const query_string = {};
  const query = str.toLocaleLowerCase();
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    // If first entry with this name
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
      const arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
};

export const parseSearchURL = (str) => {
  const query_string = {};
  const query = str || window.location.href;
  const params = query.split('?');
  const vars = params.length > 1 ? params[1].split('&') : query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    // If first entry with this name
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
      const arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
};

export const ShareSocialMedia = (e, ShareLinkUrl, type) => {
  //  console.log(ShareLinkUrl, 'ShareLinkUrl');

  e.preventDefault();
  let SocialWindow = '';
  if (type === 'linkedin') {
    SocialWindow = window.open(
      `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(ShareLinkUrl)}`,
      'Linkdin invite friends',
      'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
    );
  } else if (type === 'twitter') {
    SocialWindow = window.open(
      `https://twitter.com/share?url=${encodeURIComponent(ShareLinkUrl)}`,
      'twitter invite friends',
      'height=350,width=600'
    );
  } else if (type === 'facebook') {
    SocialWindow = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${ShareLinkUrl}`)}`,
      'Facebook invite friends',
      'height=350,width=600'
    );
  }

  if (SocialWindow.focus) {
    SocialWindow.focus();
  }
  return false;
};

export const friendlyDate = (str, checkForCustomDayOld) => {
  const yesterday = dayjs().subtract(1, 'day');
  let format = dayjs(str).format('hh:mm a');
  if (dayjs().isSame(str, 'date')) format += ', Today';
  else if (yesterday.isSame(str, 'date')) format += ', Yesterday';
  else if (dayjs().isSame(str, 'week')) format = dayjs(str).format('hh:mm a, dddd');
  else if (dayjs().isSame(str, 'month')) format = dayjs(str).format('hh:mm a, DD/MM/YYYY');
  else if (
    !yesterday.isSame(str, 'date') &&
    !dayjs().isSame(str, 'week') &&
    !dayjs().isSame(str, 'month') &&
    !dayjs().isSame(str, 'date')
  )
    format = dayjs(str).format('DD MMM, YYYY (hh:mm a)');

  return format;
};

export const formatBytes = (byte) => {
  let bytes = byte;
  if (bytes >= 1073741824) {
    bytes = `${(bytes / 1073741824).toFixed(0)}`;
  } else if (bytes >= 1048576) {
    bytes = `${(bytes / 1048576).toFixed(0)}`;
  } else if (bytes >= 1024) {
    bytes = `${(bytes / 1024).toFixed(0)}`;
  } else if (bytes > 1) {
    bytes += ' ';
  } else if (bytes === 1) {
    bytes += '';
  } else {
    bytes = '0';
  }
  return bytes;
};

export const convertSecondsToTimeString = (seconds) => {
  // let time = moment.utc(1000 * seconds).format("H:m:s");

  let hours = Math.floor(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  let minutes = Math.floor(remainingSeconds / 60);
  let timeSeconds = remainingSeconds % 60;

  // const splitTime = time.split(":");
  // const hours = splitTime[0];
  // const minutes = splitTime[1];
  // const timeSeconds = splitTime[2];

  let timeString = '';

  if (hours && hours > 0)
    timeString = `${hours} hour${minutes && minutes > 0 ? `, ${minutes} ${'minute'}` : ''}${
      timeSeconds && timeSeconds > 0 ? `, ${timeSeconds}s` : ''
    }`;
  else if (minutes && minutes > 0)
    timeString = `${minutes} ${'minute'}${timeSeconds && timeSeconds > 0 ? `, ${timeSeconds} ${'seconds'}` : ''}`;
  else timeString = `${timeSeconds ? `${timeSeconds} ${'seconds'}` : ''}`;

  return timeString;
};

export const formatSize = (byte) => {
  let bytes = byte;
  if (bytes >= 1073741824) {
    bytes = `GB`;
  } else if (bytes >= 1048576) {
    bytes = `MB`;
  } else if (bytes >= 1024) {
    bytes = `KB`;
  } else if (bytes > 1) {
    bytes = 'bytes';
  } else if (bytes === 1) {
    bytes = 'byte';
  } else {
    bytes = 'bytes';
  }
  return bytes;
};

export const validURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

const removeHtmlTags = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  const element = doc.getElementsByClassName('change-tex');
  for (let i = 0; i < doc.getElementsByClassName('change-tex').length; i++) {
    element[i].innerText = element[i].getAttribute('data-selected-text')?.trim();
  }
  return doc.documentElement.innerText?.replace(/(<([^>]+)>)/gi, '');
};

const DataFormateForRij = (form) => {
  const {
    cardsData,
    question,
    hint,
    template_type,
    unit,
    blank,
    preHeader,
    columns,
    rows,
    qContent,
    imagename,
    audio,
    cipher_key,
    encrypted_statment,
    decrypted_statment,
  } = form;
  // console.log(template_type);
  if (!template_type) {
    return;
  }
  const sampleString = {
    template_type: '',
    data1: '',
    data2: '',
    data3: '',
    data4: '',
    data5: '',
    data6: '',
    data7: '',
    data8: '',
    data9: '',
    data10: '',
    data11: '',
    data12: '',
    data13: '',
    data14: '',
    data15: '',
  };

  const QuestionsStr = [];

  const HeaderTemp = { ...sampleString };
  const TitleTemp = { ...sampleString };
  const OptionsTemp = { ...sampleString };
  const HintTemp = { ...sampleString };

  const UnitTemp = { ...sampleString };
  const BlankTemp = { ...sampleString };
  const EncryptedStatementTemp = { ...sampleString };
  const DecryptedStatementTemp = { ...sampleString };
  const PreHeaderTemp = { ...sampleString };
  const ColumnTemp = { ...sampleString };
  // const LanguageTemp = { ...sampleString };

  if (template_type === 'non_overlapping_classification') {
    HeaderTemp.template_type = form?.dual_is_enabled ? 'single_container_non_overlapping_classification' : template_type;
    HeaderTemp.data1 = 'type';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'images';
    HeaderTemp.data4 = '';

    TitleTemp.data1 = 'title';

    TitleTemp.data2 = removeHtmlTags(question);

    QuestionsStr.push(HeaderTemp, TitleTemp);
    OptionsTemp.data1 = 'options';
    OptionsTemp.data2 = form?.options;
    QuestionsStr.push(OptionsTemp);
  } else if (template_type === 'financial-fib') {
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'type';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'images';
    HeaderTemp.data4 = 'audio';

    TitleTemp.data1 = 'title';
    TitleTemp.data2 = removeHtmlTags(question);
    TitleTemp.data3 = qContent.image;
    TitleTemp.data4 = qContent.audio;
    BlankTemp.data1 = 'blank';
    BlankTemp.data2 = removeHtmlTags(blank);

    UnitTemp.data1 = 'unit';
    UnitTemp.data2 = removeHtmlTags(unit);

    QuestionsStr.push(HeaderTemp, TitleTemp, BlankTemp, UnitTemp);
  } else if (template_type === 'crack_the_code') {
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'type';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'images';
    HeaderTemp.data4 = 'audio';

    TitleTemp.data1 = 'question';
    TitleTemp.data2 = removeHtmlTags(question);

    BlankTemp.data1 = 'cipher_key';
    BlankTemp.data2 = cipher_key;

    EncryptedStatementTemp.data1 = 'encrypted_statement';
    EncryptedStatementTemp.data2 = removeHtmlTags(encrypted_statment);

    DecryptedStatementTemp.data1 = 'decrypted_statement';
    DecryptedStatementTemp.data2 = removeHtmlTags(decrypted_statment);

    UnitTemp.data1 = 'image';
    UnitTemp.data3 = qContent.image;

    QuestionsStr.push(HeaderTemp, TitleTemp, BlankTemp, UnitTemp, EncryptedStatementTemp, DecryptedStatementTemp);
  } else if (template_type === 'tabular_fib') {
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';

    TitleTemp.data1 = 'title';
    TitleTemp.data2 = removeHtmlTags(question);

    PreHeaderTemp.data1 = 'pre_header';
    PreHeaderTemp.data2 = preHeader.title;
    PreHeaderTemp.data3 = preHeader.value;

    ColumnTemp.data1 = 'header';
    ColumnTemp.data2 = columns[0].name;
    ColumnTemp.data3 = columns[1].name;
    ColumnTemp.data4 = columns[2].name;
    ColumnTemp.data5 = columns[3].name;

    QuestionsStr.push(HeaderTemp, TitleTemp, PreHeaderTemp, ColumnTemp);

    for (let i = 0; i < rows.length; i++) {
      const RowTemp = { ...sampleString };
      RowTemp.data1 = 'data';

      if (columns[0].name && rows[i].column1) {
        RowTemp.data2 = rows[i].column1;
      } else if (columns[0].name && !rows[i].column1) {
        RowTemp.data2 = '&nbsp;';
      }

      if (columns[1].name && rows[i].column2) {
        RowTemp.data3 = rows[i].column2;
      } else if (columns[1].name && !rows[i].column2) {
        RowTemp.data3 = '&nbsp;';
      }

      if (columns[2].name && rows[i].column3) {
        RowTemp.data4 = rows[i].column3;
      } else if (columns[2].name && !rows[i].column3) {
        RowTemp.data4 = '&nbsp;';
      }

      if (columns[3].name && rows[i].column4) {
        RowTemp.data5 = rows[i].column4;
      } else if (columns[3].name && !rows[i].column4) {
        RowTemp.data5 = '&nbsp;';
      }

      QuestionsStr.push(RowTemp);
    }
  } else if (template_type === 'mcq') {
    HeaderTemp.template_type = 'mcq_short';
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'result';
    TitleTemp.data1 = 'title';
    TitleTemp.data2 = removeHtmlTags(question);
    TitleTemp.data3 = imagename;
    TitleTemp.data4 = audio;
    QuestionsStr.push(HeaderTemp, TitleTemp);
  } else {
    // console.log('387');
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'images';
    HeaderTemp.data4 = 'audio';

    TitleTemp.data1 = 'title';
    TitleTemp.data2 = removeHtmlTags(question);

    QuestionsStr.push(HeaderTemp, TitleTemp);
  }
  if (template_type !== 'financial-fib' || template_type !== 'crack_the_code') {
    // console.log("!FINIANCILA FIB");
    for (let i = 0; i < form?.cardsData.length; i++) {
      // console.log('form', cardsData[i]);
      const cardData = { ...sampleString };
      cardData.data1 = template_type === 'mcq' ? cardsData[i].isCorrect : cardsData[i].data || '';
      cardData.data2 = cardsData[i].text;
      cardData.data3 = cardsData[i].imagePath;
      cardData.data4 = cardsData[i].audioPath;
      QuestionsStr.push(cardData);
    }
  }

  HintTemp.data1 = template_type === 'mcq' ? 'help' : 'hint';
  // HintTemp.data2 = removeHtmlTags(hint);

  const containsTags = hint ? containsImageTag(hint) || containsIframe(hint) : '';

  HintTemp.data2 = containsTags ? hint : removeHtmlTags(hint);

  QuestionsStr.push(HintTemp);

  const FinalString = QuestionsStr?.map((item) => JSON.stringify(item)).join(',');

  return FinalString;
};

export const GetRIJCmsQuestionData = (data) => {
  let FinalQuestionStr = '';
  for (let i = data?.questionData.length - 1; i >= 0; i--) {
    FinalQuestionStr = `${DataFormateForRij(data?.questionData[i])}${FinalQuestionStr === '' ? '' : `,${FinalQuestionStr}`}`;
  }
  const QuestionStr = `[${FinalQuestionStr}]`;
  // console.log('QuestionStr', QuestionStr);
  return QuestionStr;
};

const containsIframe = (htmlString) => {
  var parser = new DOMParser();
  var doc = parser.parseFromString(htmlString, 'text/html');
  var iframeElement = doc.querySelector('iframe');
  return iframeElement !== null;
};

const containsImageTag = (inputString) => {
  var pattern = /<img[^>]*src="([^"]+)"[^>]*>/;
  var match = inputString.match(pattern);
  return match !== null;
};

const DataFormateForkampong = (form) => {
  const {
    cardsData,
    question,
    hint,
    imagename,
    audio,
    template_type,
    wordToHighlight,
    container_1,
    container_2,
    container_3,
    container_4,
    instruction,
    help,
    language,
  } = form;
  if (!template_type) {
    return;
  }
  const sampleString = {
    template_type: '',
    data1: '',
    data2: '',
    data3: '',
    data4: '',
    data5: '',
    data6: '',
    data7: '',
    data8: '',
    data9: '',
    data10: '',
    data11: '',
    data12: '',
    data13: '',
    data14: '',
    data15: '',
  };

  const QuestionsStr = [];

  const HeaderTemp = { ...sampleString };
  const TitleTemp = { ...sampleString };
  const OptionsTemp = { ...sampleString };
  const HintTemp = { ...sampleString };
  const HelpTemp = { ...sampleString };
  const LanguageTemp = { ...sampleString };

  if (template_type === 'non_overlapping_classification') {
    const wordToHighlightTemp = { ...sampleString };
    HeaderTemp.template_type = form?.dual_is_enabled ? 'single_container_non_overlapping_classification' : template_type;
    HeaderTemp.data1 = 'type';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'images';
    HeaderTemp.data4 = 'audio';

    TitleTemp.data1 = 'title';
    TitleTemp.data2 = question;

    wordToHighlightTemp.data1 = 'wordToHighlight';
    wordToHighlightTemp.data2 = wordToHighlight;

    QuestionsStr.push(HeaderTemp);
    OptionsTemp.data1 = 'options';
    OptionsTemp.data2 = form?.options;

    if (form?.audio_is_enabled) {
      if (form?.container_1?.audioPath && form?.container_2?.audioPath) {
        OptionsTemp.data4 = `${form?.container_1?.audioPath},${form?.container_2?.audioPath}`;
      }
    }

    QuestionsStr.push(OptionsTemp, wordToHighlightTemp);
  } else if (template_type === 'matching') {
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'imagename';
    HeaderTemp.data4 = '';

    TitleTemp.data1 = 'title';
    TitleTemp.data2 = question;

    QuestionsStr.push(HeaderTemp, TitleTemp);
  } else if (template_type === 'mcq_short') {
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'imagename';
    HeaderTemp.data4 = 'audio';
    TitleTemp.data1 = 'title';
    TitleTemp.data2 = question;
    TitleTemp.data3 = imagename;
    TitleTemp.data4 = audio;

    QuestionsStr.push(HeaderTemp, TitleTemp);
    for (let i = 0; i < form?.cardsData.length; i++) {
      const cardData = { ...sampleString };
      cardData.data1 = `${cardsData[i].data}`;
      cardData.data2 = cardsData[i].text;
      cardData.data3 = cardsData[i].imagePath;
      cardData.data1 = `${cardsData[i].isCorrect}`;

      QuestionsStr.push(cardData);
    }

    HintTemp.data1 = 'instruction';
    HintTemp.data2 = instruction;

    HelpTemp.data1 = 'help';
    HelpTemp.data2 = help;

    QuestionsStr.push(HintTemp, HelpTemp);
  } else if (template_type === 'matching_drag_drop') {
    const wordToHighlightTemp = { ...sampleString };
    const binTemp1 = { ...sampleString };
    const binTemp2 = { ...sampleString };
    const binTemp3 = { ...sampleString };
    const binTemp4 = { ...sampleString };

    wordToHighlightTemp.data1 = 'wordToHighlight';
    wordToHighlightTemp.data2 = wordToHighlight;

    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'imagename';
    HeaderTemp.data4 = 'audio';

    binTemp1.data1 = container_1.data;
    binTemp1.data3 = container_1.imagePath;

    binTemp2.data1 = container_2.data;
    binTemp2.data3 = container_2.imagePath;

    binTemp3.data1 = container_3.data;
    binTemp3.data3 = container_3.imagePath;

    binTemp4.data1 = container_4.data;
    binTemp4.data3 = container_4.imagePath;

    QuestionsStr.push(HeaderTemp, wordToHighlightTemp, binTemp1, binTemp2, binTemp3, binTemp4);
  } else {
    HeaderTemp.template_type = template_type;
    HeaderTemp.data1 = 'order';
    HeaderTemp.data2 = 'text';
    HeaderTemp.data3 = 'imagename';
    HeaderTemp.data4 = 'audio';
    TitleTemp.data1 = 'title';
    TitleTemp.data2 = question;
    QuestionsStr.push(HeaderTemp, TitleTemp);
  }

  if (template_type !== 'mcq_short') {
    HintTemp.data1 = 'instruction';
    HintTemp.data2 = hint;
    QuestionsStr.push(HintTemp);
  }

  if (template_type !== 'mcq_short') {
    for (let i = 0; i < form?.cardsData.length; i++) {
      const cardData = { ...sampleString };
      cardData.data1 = `${cardsData[i].data}`;
      cardData.data2 = cardsData[i].text;
      cardData.data3 = cardsData[i].imagePath || '';
      cardData.data4 = cardsData[i].audioPath || '';
      QuestionsStr.push(cardData);
    }
  }

  LanguageTemp.data1 = 'urdu';
  LanguageTemp.data2 = language === 'urdu' ? 1 : 0;
  QuestionsStr.push(LanguageTemp);

  // console.log(QuestionsStr);
  const FinalString = QuestionsStr?.map((item) => JSON.stringify(item)).join(',');

  return FinalString;
};

export const GetKampongCmsQuestionData = (data) => {
  let FinalQuestionStr = '';
  for (let i = data?.questionData.length - 1; i >= 0; i--) {
    FinalQuestionStr = `${DataFormateForkampong(data?.questionData[i])}${FinalQuestionStr === '' ? '' : `,${FinalQuestionStr}`}`;
  }
  const QuestionStr = `[${FinalQuestionStr}]`;
  // console.log('QuestionStr', QuestionStr);
  return QuestionStr;
};

export const GetCmsCrosswordData = (data) => {
  const pJsonData = JSON.parse(data.json_data);
  // console.log('pJsonData', data);
  const type = data.content_type.toLowerCase();
  const _data = [];
  if (pJsonData?.files && type === 'crossword') {
    for (let i = 0; i < pJsonData?.files.length; i++) {
      _data.push({
        word: pJsonData?.files[i].word,
        hintType: pJsonData?.files[i].type,
        hint: pJsonData?.files[i]?.clue || pJsonData?.files[i]?.path,
      });
    }
    // console.log(_data);
    return _data;
  }
};

export const DataFormateForTimor_the_turtle = (form) => {
  const {
    article_id,
    question,
    correct1,
    correct2,
    correct3,
    correct4,
    option1,
    option2,
    option3,
    option4,
    feedback,
    questionTypeId,
    mastery_topic,
    taxonomy,
    skill,
    virtual_skill,
    difficulty,
    id,
    metadata1,
    metadata2,
    question_type,
  } = form;

  const sampleString = {
    ArticleID: 0,
    QuestionID: 1,
    Question: '',
    ListOptions: [
      { OptionText: '', isCorrect: false },
      { OptionText: '', isCorrect: false },
      { OptionText: '', isCorrect: false },
      { OptionText: '', isCorrect: true },
    ],
    CorrectFeedback: '',
    IncorrectFeedback: '',
    QuestionTypeId: 1,
    Taxonomy: '',
    MasteryTopic: '',
    Skill: '',
    VirtualSkill: '',
    MetaData1: '',
    MetaData2: '',
    MetaData3: '',
    MetaData4: '',
    DifficultyLevel: '',
    Category: '',
  };

  const extractContent = (s, space) => {
    const span = document.createElement('span');
    span.innerHTML = s;
    if (space) {
      const children = span.querySelectorAll('*');
      for (let i = 0; i < children.length; i++) {
        if (children[i].textContent) children[i].textContent += ' ';
        else children[i].innerText += ' ';
      }
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g, ' ');
  };

  const htmlParser = (value, key) => {
    const text = extractContent(value);
    if (value?.includes('<img')) {
      const ImgTag = value.match(/<img([\w\W]+?)>/g)[0];
      const tempValue = key === 'question' ? `${text}<br>${ImgTag}` : `${ImgTag}    ${text}`;

      return tempValue;
    }
    return text;
  };

  const getDifficulty = () => {
    if (difficulty === 1) return 'Easy';
    if (difficulty === 2) return 'Intermediate';
    if (difficulty === 3) return 'Hard';

    return difficulty.toString();
  };

  sampleString.ArticleID = article_id;
  sampleString.QuestionID = id;
  sampleString.Question = htmlParser(question, 'question');
  sampleString.CorrectFeedback = feedback !== '' ? htmlParser(feedback) : feedback;
  sampleString.IncorrectFeedback = feedback !== '' ? htmlParser(feedback) : feedback;
  sampleString.QuestionTypeId = questionTypeId || 1;
  sampleString.Taxonomy = taxonomy;
  sampleString.MasteryTopic = mastery_topic;
  sampleString.Skill = skill;
  sampleString.VirtualSkill = virtual_skill;
  sampleString.DifficultyLevel = getDifficulty();
  sampleString.MetaData1 = metadata1;
  sampleString.MetaData2 = metadata2;
  sampleString.MetaData3 = '1';
  sampleString.MetaData4 = question_type === 'mcq_long' ? 'mcq' : 'mcq';
  // sampleString.Category = category;

  for (let i = 0; i < sampleString?.ListOptions.length; i++) {
    const getOption = (index) => {
      let optionData;
      if (index === 1) {
        optionData = {
          OptionText: htmlParser(option1),
          isCorrect: correct1 === 'Y' && true,
        };
        return optionData;
      }
      if (index === 2) {
        optionData = {
          OptionText: htmlParser(option2),
          isCorrect: correct2 === 'Y' && true,
        };
        return optionData;
      }
      if (index === 3) {
        optionData = {
          OptionText: htmlParser(option3),
          isCorrect: correct3 === 'Y' && true,
        };
        return optionData;
      }
      if (index === 4) {
        optionData = {
          OptionText: htmlParser(option4),
          isCorrect: correct4 === 'Y' && true,
        };
        return optionData;
      }
      return null;
    };
    sampleString.ListOptions[i] = getOption(i + 1);
  }
  return sampleString;
};

export const GetCmsTimor_the_turtleData = (data) => {
  // console.log('GetCmsQuestionData', data);
  const FinalQuestionStr = [];
  for (let i = data?.questionData.length - 1; i >= 0; i--) {
    FinalQuestionStr.push(DataFormateForTimor_the_turtle(data?.questionData[i]));
  }
  // console.log('FinalQuestionStr', FinalQuestionStr);
  const FinalStr = FinalQuestionStr?.map((item) => JSON.stringify(item)).join(',');

  return `[${FinalStr}]`;
};

export const GetLinkSupportedCMSGames = (data) => {
  let temp = data;
  const { link } = data;
  temp = link.split('?')[1];
  return temp;
};

export const sortArrayWithOther = (schools) => {
  const sortedArray = schools.sort((a, b) => {
    if (a.name === 'Other' && b.name !== 'Other') {
      return 1; // Move "Other" to the end
    }
    if (a.name !== 'Other' && b.name === 'Other') {
      return -1; // Keep "Other" at the current position
    }
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1; // Sort a before b
    }
    if (nameA > nameB) {
      return 1; // Sort b before a
    }
    return 0; // Names are equal
  });

  return sortedArray;
};

export const isNumeric = (value) => {
  return /^\d*$/.test(value); // Regex to allow only numeric values
};

// This function returns a lighter version of the given color with a specified opacity percentage
export const lightenColor = (color, opacity) => {
  // Parse the hex color
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  // Lighten the color by increasing the RGB values
  // You can adjust the lightening factor if needed
  r = Math.min(255, r + Math.floor((255 - r) * (opacity / 100)));
  g = Math.min(255, g + Math.floor((255 - g) * (opacity / 100)));
  b = Math.min(255, b + Math.floor((255 - b) * (opacity / 100)));

  // Return the color in rgb format with specified opacity
  return `rgb(${r} ${g} ${b} / ${opacity}%)`;
};

export const friendlyDateFormat = (str, checkForCustomDayOld) => {
  const yesterday = dayjs().subtract(1, 'day');
  let format = dayjs(str).format('DD/MM/YYYY, hh:mm a'); // Default format with day first
  if (dayjs().isSame(str, 'date')) format = `Today, ${dayjs(str).format('hh:mm a')}`;
  else if (yesterday.isSame(str, 'date')) format = `Yesterday, ${dayjs(str).format('hh:mm a')}`;
  else if (dayjs().isSame(str, 'week')) format = `${dayjs(str).format('dddd')}, ${dayjs(str).format('hh:mm a')}`;
  else if (dayjs().isSame(str, 'month')) format = `${dayjs(str).format('DD/MM/YYYY')}, ${dayjs(str).format('hh:mm a')}`;
  else if (
    !yesterday.isSame(str, 'date') &&
    !dayjs().isSame(str, 'week') &&
    !dayjs().isSame(str, 'month') &&
    !dayjs().isSame(str, 'date')
  )
    format = dayjs(str).format('DD MMM, YYYY (hh:mm a)');

  return format;
};

export const formatText = (message, jsonString) => {
  const data = JSON.parse(jsonString);
  const email = data.opponent_username;
  const contentTitle = data.content_title;

  const boldEmail = `<b>${email}</b>`;
  const boldContentTitle = `<b>${contentTitle}</b>`;

  const formattedMessage = message.replace(email, boldEmail).replace(contentTitle, boldContentTitle);

  return formattedMessage;
};

export const findUrlByPathname = (pathname, landing_navigation) => {
  for (const item of landing_navigation) {
    if (item.pathname === pathname) {
      return item.ref || null;
    }

    if (item.hasSubMenu && item.subMenuItems) {
      for (const subItem of item.subMenuItems) {
        if (subItem.pathname === pathname) {
          return subItem.url;
        }
      }
    }
  }

  return null; // Return null if no match is found
};

// Checks if the provided config contains an instance with instance_id equal to 5.
export function isGreenGuardiansInstance() {
  let instance_id = 0;
  const domain = window.location.hostname;
  // const FORCE_GREEN_GUARDIANS = true;

  // Check if the domain is sprint2 or localhost
  if (domain.includes('globalclimateliteracy.org')) {
    instance_id = 5;
  }
  //  else if (domain.includes('sprint2--dev1on1quiz.netlify.app')) {
  //   instance_id = 3;
  // } else if (domain.includes('localhost')) {
  //   instance_id = 4;
  // }

  // Return true if FORCE_GREEN_GUARDIANS is true for Sprint2 or localhost
  if (instance_id === 5 || instance_id === 3 || instance_id === 4) {
    return true;
  }

  // Return true only for specific instance_id values
  return false;
}

export function isWebAndroid() {
  return /Android/i.test(navigator.userAgent);
}

export async function handleScreen(isFullScreen, orientation, IsMcdUser) {
  try {
    if (isWebAndroid() && !IsMcdUser) {
      if (isFullScreen) {
        // Request Fullscreen
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          // Firefox
          await document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          await document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          // IE/Edge
          await document.documentElement.msRequestFullscreen();
        }
      } else {
        // console.log('EXIT FULL SCREEN');
        // Exit Fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          await document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          // Chrome, Safari and Opera
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          await document.msExitFullscreen();
        }
      }

      // Lock screen orientation
      if (window.screen.orientation && window.screen.orientation.lock) {
        await window.screen.orientation.lock(orientation);
      } else if (window.screen.lockOrientation) {
        await window.screen.lockOrientation(orientation);
      } else if (window.screen.mozLockOrientation) {
        await window.screen.mozLockOrientation(orientation);
      } else if (window.screen.msLockOrientation) {
        await window.screen.msLockOrientation(orientation);
      } else {
        console.warn('Screen Orientation API is not supported on this browser.');
      }
    }
  } catch (error) {
    console.error('Error occurred while handling screen settings:', error);
  }
}

export function checkFullscreen() {
  const A =
    !!document.fullscreenElement ||
    !!document.webkitFullscreenElement || // For Safari
    !!document.mozFullScreenElement || // For Firefox
    !!document.msFullscreenElement;

  return A; // For IE/Edge
}

export function getTabIndexFromPath(pathname, landing_navigation) {
  const matchingTab = landing_navigation?.find((item) =>
    Array.isArray(item.pathname) ? item.pathname.includes(pathname) : item.pathname === pathname
  );
  return matchingTab ? matchingTab.name : null;
}

export function validatePassword(password) {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&><)(#_\-+^=`~:;'"|,{}[\]\\/])[A-Za-z\d.@$!%*?&><)(#_\-+^=`~:;'"|,{}[\]\\/]{8,}$/;
  const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Medium strength criteria

  if (strongPasswordRegex.test(password)) {
    return 'Strong password';
  } else if (mediumPasswordRegex.test(password)) {
    return 'Medium strength password';
  } else {
    return 'Weak password';
  }
}

export function validateKenyanPhoneNumber(phoneNumber) {
  // console.log('phoneNumber', phoneNumber);

  // Check if phoneNumber is exactly '+254'
  if (phoneNumber === '+254') {
    return 'empty';
  }
  // Regex for validating Kenyan phone numbers
  const pattern = /^(\+254|0)(7|1)\d{8}$/;
  return pattern.test(phoneNumber);
}

export function validOTP(otp) {
  if (!otp) {
    Toast.Show('Please enter your 5-digit OTP', ALERT.ERROR);
  } else if (otp.length > 5 || otp.length < 5) {
    Toast.Show('The OTP should contain 5 digits', ALERT.ERROR);
  } else {
    return true;
  }
}

export function getSiteConfig() {
  const host = window.location.hostname; // e.g., www.globalclimateliteracy.org or bonzo.knowledgeplatform.com

  // Remove "www" if it exists
  const cleanHost = host.startsWith('www.') ? host.slice(4) : host;

  // Special case for "app.shupavugames.com"
  if (cleanHost === 'app.shupavugames.com') {
    return 'shupavugames';
  }

  if (cleanHost === 'learningapp.shupavugames.com') {
    return 'learningshupavugames';
  }

  if (cleanHost === 'app.quotient.games') {
    return 'quotientgames';
  }
  if (cleanHost === 'games.greenguardians.com') {
    return 'singaporegreenguardians';
  }

  // Special handling for hostnames with double dashes ("--")
  const siteKey = cleanHost.includes('--')
    ? cleanHost.split('--')[0] // Take the part before the first '--'
    : cleanHost.split('.')[0]; // Otherwise, take the part before the first '.'

  return siteKey;
}

export function getInstanceType(current_instance_id, tenant_instance_id) {
  //console.log(current_instance_id, tenant_instance_id);
  if (current_instance_id === tenant_instance_id) {
    return true;
  } else {
    return false;
  }
}

export function getInstanceText(texts, id, current_instance_id) {
  var text_id = id;
  if (current_instance_id === INSTANCES_ID.BONZO_ID) {
    text_id = `${text_id}`;
  } else if (current_instance_id === INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID) {
    text_id = `GG_${text_id}`;
  } else if (current_instance_id === INSTANCES_ID.SHUPAVU_ID) {
    text_id = `SH_${text_id}`;
  } else if (current_instance_id === INSTANCES_ID.POCKET_GAMES_ID) {
    text_id = `PG_${text_id}`;
  } else if (current_instance_id === INSTANCES_ID.QUOTIENT_ID) {
    text_id = `QG_${text_id}`;
  }

  let result = texts[text_id];

  // Fallback: Check the base text ID if the prefixed ID doesn't exist
  if (result === undefined) {
    // console.log(`Text with key "${text_id}" not found. Falling back to base ID "${id}".`);
    result = texts[id];
  }

  // console.log(text_id, result);
  return result;
}

export const getTextForRole = (role, subscriptionStatus, current_stage, textObject) => {
  const defaultTexts = { text1: '', text2: '', text3: '', text4: '', text5: '', text6: '' };

  if (!textObject || !role) {
    // console.error('Invalid input: textObject or role is missing');
    return defaultTexts;
  }

  const stageTexts = textObject[`${current_stage}`];
  if (!stageTexts) {
    // console.error(`No text found for stage: ${current_stage}`);
    return defaultTexts;
  }

  // Safely destructure the role-specific properties
  const { principal = {}, paidPrincipal = {}, learner = {} } = stageTexts;

  if (subscriptionStatus === 1) {
    return {
      text1: paidPrincipal.text1,
      text2: paidPrincipal.text2,
      text3: paidPrincipal.text3,
      text4: paidPrincipal.text4,
      text5: paidPrincipal.text5,
      text6: paidPrincipal.text6,
    };
  }

  switch (role) {
    case 'principal':
      return {
        text1: principal.text1,
        text2: principal.text2,
        text3: principal.text3,
        text4: principal.text4,
        text5: principal.text5,
        text6: principal.text6,
      };
    case 'learner':
    default:
      return {
        text1: learner.text1,
        text2: learner.text2,
        text3: learner.text3,
        text4: learner.text4,
        text5: learner.text5,
        text6: learner.text6,
      };
  }
};

export function LandingPageNavigation(instance_id, callback) {
  // console.log(instance_id);
  const isShupavu = getInstanceType(instance_id, INSTANCES_ID.SHUPAVU_ID);
  const isGCLC = getInstanceType(instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);
  const isPocketGames = getInstanceType(instance_id, INSTANCES_ID.POCKET_GAMES_ID);
  const isQuotient = getInstanceType(instance_id, INSTANCES_ID.QUOTIENT_ID);
  const isSGG = getInstanceType(instance_id, INSTANCES_ID.SGG_ID);

  if (isShupavu) {
    // console.log('YAHAN');
    const targetDomain = 'https://app.shupavugames.com/';
    const targetDomain2 = 'https://learningapp.shupavugames.com/';
    if (window.location.href === targetDomain && !window.isCompLauch) {
      // Redirect if on the specific domain
      window.location.href = 'https://shupavugames.com/';
    } else if (window.location.href === targetDomain2 && !window.isCompLauch) {
      // Redirect if on the specific domain
      window.location.href = 'https://learning.shupavugames.com/';
    }
    // callback(true);
  } else if (isSGG) {
    const targetDomain = 'https://games.greenguardians.com/';
    if (window.location.href === targetDomain && !window.isCompLauch) {
      // Redirect if on the specific domain
      window.location.href = 'https://singapore.greenguardians.com/competitions';
    }
  } else if (isPocketGames) {
    //const targetDomain = 'http://localhost:3000/';
    const targetDomain = 'https://pocketgames.21c.digital/';
    if (window.location.href === targetDomain && !window.isCompLauch) {
      // window.location.href = 'https://www.21c.digital/pocketgames/';
      PageSwitch(AccountNav.SIGN_UP);
    }
  } else if (isGCLC) {
    //const targetDomain = 'http://localhost:3000/'; // Replace with your target domain
    // const targetDomain = 'https://sprint2--dev1on1quiz.netlify.app/'; // Replace with your target domain
    const targetDomain = 'https://globalclimateliteracy.org/'; // Replace with your target domain
    const targetDomain2 = 'https://www.globalclimateliteracy.org/';
    // console.log(window.location.href);
    if (window.location.href === targetDomain && !window.isCompLauch) {
      // Redirect if on the specific domain
      window.location.href = `${targetDomain}program/glc`;
    } else if (window.location.href === targetDomain2 && !window.isCompLauch) {
      // Redirect for targetDomain2, independent of isGreenGuardiansInstance result
      window.location.href = `${targetDomain2}program/glc`;
    }
  } else if (isQuotient) {
    const targetDomain = 'https://app.quotient.games/'; // Replace with your target domain
    if (window.location.href === targetDomain && !window.isCompLauch) {
      // Redirect if on the specific domain
      window.location.href = 'https://quotient.games/';
    }
  } else {
    callback(true);
  }
}

export function isTwentyFirstCTDHost(urlToCheck) {
  // Check if the provided URL exists in the TWENTY_FIRST_CTD_URLS object
  return Object.values(TWENTY_FIRST_CTD_URLS).includes(urlToCheck);
}

// Function to convert dateString to a human-readable format: dateString = '2025-02-03T10:39:37' to 'February 3, 2025'
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
