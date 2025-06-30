export function InAppBrowser(_url, _callback, _title, _target, _options, _allowOffline, _beforeLoadCallback) {
  this.version = '1.2.0';
  this.url = encodeURI(_url);
  this.title = _title || '';
  this.title = this.title.replace(',', '');
  this.target = _target || '_blank';
  this.options =
    _options ||
    'location=yas,hidenavigationbuttons=yes,hideurlbar=yes,toolbarcolor=#131313,lefttoright=yes,hidden=yes,closebuttoncolor=#ffffff,zoom=no,statusbarstyle=light,closebuttonicon=www/images/back.png';
  this.options += `,titlecolor=#fefefe,title=${_title}`;
  this.beforeLoadCallback = null;
  if (_beforeLoadCallback) {
    this.beforeLoadCallback = _beforeLoadCallback;
    this.options += ',beforeload=yes';
  }
  this.previousPage = null;
  this.callback = function (a, p) {
    if (typeof _callback === 'function') {
      _callback(a, p);
    }
  };
  this.ref = null;
  this.loadingTimer = null;
  this._allowOffline = _allowOffline || false;

  this.EVENTS = {
    START: 'loadstart',
    LOADED: 'loadstop',
    ERROR: 'loaderror',
    NO_INTERNET: 'nointernet',
    EXIT: 'exit',
    BEFORE_LOAD: 'beforeload',
  };

  if (window.cordova && window.cordova.ThemeableBrowser) {
    this.options = {
      beforeload: true,
      hidden: true,
      statusbar: {
        color: '#ffffff',
      },
      toolbar: {
        height: 44,
        color: '#ffffff',
      },
      title: {
        color: '#f88808',
        showPageTitle: true,
        staticText: _title,
      },
      closeButton: {
        wwwImage: 'images/back.png',
        wwwImagePressed: 'images/back_pressed.png',
        align: 'left',
        wwwImageDensity: 2,
        event: 'closePressed',
      },
      backButtonCanClose: true,
    };
  }

  this.launch();
}

InAppBrowser.prototype.launch = function () {
  this.ref = window.open(this.url, this.target, this.options);

  // Event binding
  this.ref.addEventListener(this.EVENTS.START, this.onLoadStart.bind(this));
  this.ref.addEventListener(this.EVENTS.LOADED, this.onLoadStop.bind(this));
  this.ref.addEventListener(this.EVENTS.ERROR, this.onLoadError.bind(this));
  this.ref.addEventListener(this.EVENTS.EXIT, this.onExit.bind(this));
  if (this.beforeLoadCallback) this.ref.addEventListener(this.EVENTS.BEFORE_LOAD, this.onBeforeLoad.bind(this));
};

InAppBrowser.prototype.onLoadStart = function (e) {
  this.callback(this.EVENTS.START, e);
};

InAppBrowser.prototype.onLoadStop = function (e) {
  this.ref.show();
  // store.dispatch(LoaderAction.Show(false, true));
  this.callback(this.EVENTS.LOADED, e);
};

InAppBrowser.prototype.onLoadError = function (e) {
  this.callback(this.EVENTS.ERROR, e);
  if (this.ref) {
    this.close();
    this.ref = undefined;
  }
};

InAppBrowser.prototype.onExit = function (e) {
  this.callback(this.EVENTS.EXIT, e);
  if (this.ref) this.ref = undefined;
};

InAppBrowser.prototype.close = function () {
  if (this.ref) this.ref.close();
};

InAppBrowser.prototype.onBeforeLoad = function (a, callback) {
  this.beforeLoadCallback(a, callback);
};

window.InAppBrowser = InAppBrowser;
