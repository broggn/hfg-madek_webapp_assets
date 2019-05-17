(function() {
  var app, buildUrl, each, parseUrl, present, ujs;

  require('./env');

  window.jQuery = window.$ = require('jquery');

  each = require('active-lodash').each;

  present = require('active-lodash').present;

  parseUrl = require('url').parse;

  buildUrl = require('url').format;

  app = require('ampersand-app');

  if (!present(APP_CONFIG)) {
    throw new Error('No `APP_CONFIG`!');
  }

  app.extend({
    config: require('global').APP_CONFIG
  });

  ujs = [
    require('./ujs/hashviz.coffee'), require('./ujs/react.coffee'), (function() {
      return Array.prototype.slice.call(document.querySelectorAll('[data-confirm]')).map(function(node) {
        return node.onclick = function() {
          return confirm(node.dataset.confirm || 'Sind sie sicher?');
        };
      });
    })
  ];

  $(document).ready(function() {
    return each(ujs, function(init) {
      return init();
    });
  });

  $(function() {
    return $('#lang_switcher').on('change', function(e) {
      var parsedUrl;
      parsedUrl = parseUrl(location.href, true);
      parsedUrl.query['lang'] = $(e.currentTarget).val();
      delete parsedUrl.search;
      return window.location.href = buildUrl(parsedUrl);
    });
  });

}).call(this);
