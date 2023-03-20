function Clicksign(key) {
  "use strict";

  var iframe, target,
      endpoint = 'https://app.clicksign.com',
      origin = window.location.protocol + '//' + window.location.host,
      listen = {};

  var mount = function (id) {
    var path = '/sign/' + key,
        params = '?embedded=true&origin=' + this.origin,
        src = this.endpoint + path + params;

    target = document.getElementById(id);

    iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('style', 'width: 100%; height: 100%;');
    iframe.setAttribute('allow', 'camera;geolocation');

    window.addEventListener('message', handle);

    return target.appendChild(iframe);
  };

  var eventName = function (ev) {
    return ev.name || ev;
  }

  var on = function (ev, fn) {
    if (!listen[ev]) { listen[ev] = []; }
    return listen[ev].push(fn);
  };

  var trigger = function (ev) {
    (listen[eventName(ev)] || []).forEach(function(fn) { fn(ev.data); });
  };

  var handle = function (ev) {
    trigger(ev.data);
  };

  var unmount = function () {
    if (iframe) {
      target.removeChild(iframe);

      target = null;
      iframe = null;

      window.removeEventListener('message', handle);
    }

    return true;
  };

  return {
    endpoint: endpoint,
    origin: origin,
    mount: mount,
    unmount: unmount,
    on: on,
    trigger: trigger
  };
}
