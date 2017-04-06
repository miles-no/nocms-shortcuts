# NoCMS Shortcuts

Global shortcut handling for NoCMS.

## Installation
```
npm install nocms-shortcuts --save
```

## Usage

```
import shortcuts from 'nocms-shortcuts';

shortcuts.addHandler('alt-e', this.toggleSomething);
```

## API

### addHandler, (keys, function)
Add handler which triggers on keydown on document.body

### removeHandler, (keys, function)
Remove the handler
