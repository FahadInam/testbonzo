const loadScript = (src, callback) => {
  let r;
  let t;
  r = false;
  const s = document.createElement('script');

  //console.log('s', s);
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function () {
    //console.log(this.readyState); // uncomment this line to see which ready states are called.
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true;
      if (callback) {
        callback();
        // console.log('CALLBACK');
      }
    }
  };
  // console.log(document.getElementsByTagName('script'));
  t = document.getElementsByTagName('script')[0];
  // console.log('t', t);
  t.parentNode.insertBefore(s, t);
};

const AddLoginAction = {
  loadScript,
};

export default AddLoginAction;
