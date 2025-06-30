// import { config } from 'Constants';

const load = (onLoad) => {
  // window.fbAsyncInit = () => {
  //   window.FB.init({
  //     appId: config.facebookLoginAppId,
  //     cookie: true, // enable cookies to allow the server to access
  //     status: false,
  //     xfbml: true,
  //     version: 'v6.0',
  //   });
  // };
  window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '3757649331221314',
      cookie     : true,
      xfbml      : true,
      version    : 'v12.0' 
    });

    window.FB.AppEvents.logPageView();
  };


  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

const fetchData = (authRes, callback) => {
  window.FB.api(
    '/me',
    (response) => {
      const res = authRes.authResponse || {};
      if (callback)
        callback({
          email: response.email,
          name: response.name,
          userId: res.userID,
          accessToken: res.accessToken,
          expiresIn: res.expiresIn,
          dataExpiryTime: res.data_access_expiration_time,
        });
    },
    {
      fields: 'id, name, email',
    }
  );
};

const login = (callback) => {
  window.FB.login(
    (response) => {
      if (response.status === 'connected') fetchData(response, callback);
    },
    { scope: 'public_profile, email' }
  );
};

const checkStatus = (callback) => {
  window.FB.getLoginStatus((response) => {
    if (response.status === 'connected') {
      fetchData(response, callback);
    } else {
      // else if (response.status === 'not_authorized');
      login(callback);
    }
  });
};

const logout = (callback) => {
  load(() => {
    window.FB.getLoginStatus((response) => {
      if (!response.authResponse) {
        if (callback) callback();
      } else {
        window.FB.logout(() => {
          if (callback) callback();
        });
      }
    });
  });
};

const FaceBookStandalone = {
  load,
  fetchData,
  login,
  checkStatus,
  logout,
};

export default FaceBookStandalone;
