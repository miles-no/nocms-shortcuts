'use strict';

var _nocmsUtils = require('nocms-utils');

var _nocmsUtils2 = _interopRequireDefault(_nocmsUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyHandlers = {};

var getShortcutHash = function getShortcutHash(shortcut) {
  var hash = '';
  if (shortcut.indexOf('ctrl') >= 0) {
    hash += 'c';
  }
  if (shortcut.indexOf('alt') >= 0) {
    hash += 'a';
  }
  if (shortcut.indexOf('cmd') >= 0) {
    hash += 'm';
  }
  if (shortcut.indexOf('shift') >= 0) {
    hash += 's';
  }
  hash += '-' + shortcut.substring(shortcut.lastIndexOf('-') + 1).toUpperCase().charCodeAt(0);
  return hash;
};

var addHandler = function addHandler(shortcut, description, handler) {
  if (typeof handler !== 'function') {
    console.error('Listener to ' + shortcut + ' is not a function', handler);
    return;
  }

  var hash = getShortcutHash(shortcut);
  if (!keyHandlers[hash]) {
    keyHandlers[hash] = [];
  }
  keyHandlers[hash].push({ shortcut: shortcut, description: description, handler: handler });
};

var removeHandler = function removeHandler(shortcut, handler) {
  var hash = getShortcutHash(shortcut);
  var index = -1;
  keyHandlers[hash].find(function (h, i) {
    if (h.handler === handler) {
      index = i;
      return true;
    }
    return false;
  });
  if (index !== -1) {
    keyHandlers[shortcut].splice(index, 1);
  }
};

var getShortcuts = function getShortcuts() {
  var results = [];
  Object.keys(keyHandlers).forEach(function (hash) {
    keyHandlers[hash].forEach(function (shortcut) {
      results.push({ shortcut: shortcut.shortcut, description: shortcut.description });
    });
  });
  return results;
};

var trigger = function trigger(event) {
  var metaKey = event.metaKey,
      altKey = event.altKey,
      ctrlKey = event.ctrlKey,
      shiftKey = event.shiftKey,
      which = event.which;


  var hash = '';
  if (ctrlKey) {
    hash += 'c';
  }
  if (altKey) {
    hash += 'a';
  }
  if (metaKey) {
    hash += 'm';
  }
  if (shiftKey) {
    hash += 's';
  }
  hash += '-' + which;
  if (!keyHandlers[hash]) {
    return;
  }
  keyHandlers[hash].forEach(function (h) {
    return h.handler(event);
  });
};

if (_nocmsUtils2.default.isBrowser()) {
  document.body.addEventListener('keydown', trigger);
}

var api = {
  addHandler: addHandler,
  removeHandler: removeHandler,
  getShortcuts: getShortcuts
};

module.exports = api;
//# sourceMappingURL=index.js.map