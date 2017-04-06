import utils from 'nocms-utils';

const keyHandlers = {};

const getShortcutHash = (shortcut) => {
  let hash = '';
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
  hash += `-${shortcut.substring(shortcut.lastIndexOf('-') + 1).toUpperCase().charCodeAt(0)}`;
  return hash;
};

const addHandler = (shortcut, description, handler) => {
  if (typeof handler !== 'function') {
    console.error(`Listener to ${shortcut} is not a function`, handler);
    return;
  }

  const hash = getShortcutHash(shortcut);
  if (!keyHandlers[hash]) {
    keyHandlers[hash] = [];
  }
  keyHandlers[hash].push({ shortcut, description, handler });
};

const removeHandler = (shortcut, handler) => {
  const hash = getShortcutHash(shortcut);
  let index = -1;
  keyHandlers[hash].find((h, i) => {
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

const getShortcuts = () => {
  const results = [];
  Object.keys(keyHandlers).forEach((hash) => {
    keyHandlers[hash].forEach((shortcut) => {
      results.push({ shortcut: shortcut.shortcut, description: shortcut.description });
    });
  });
  return results;
};

const trigger = (event) => {
  const {
    metaKey,
    altKey,
    ctrlKey,
    shiftKey,
    which,
  } = event;

  let hash = '';
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
  hash += `-${which}`;
  if (!keyHandlers[hash]) {
    return;
  }
  keyHandlers[hash].forEach(h => h.handler(event));
};

if (utils.isBrowser()) {
  document.body.addEventListener('keydown', trigger);
}

const api = {
  addHandler,
  removeHandler,
  getShortcuts,
};

module.exports = api;
