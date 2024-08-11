# nss_libs - NssLoadingIndicator

This component provide a simple audio player to play sound fx.

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssLoadingIndicator} from "nui://nss_libs/ui/NssLoadingIndicator/NssLoadingIndicator.js";
```

### Creating loading indicator

```javascript
import {NssLoadingIndicator} from "nui://nss_libs/ui/NssLoadingIndicator/NssLoadingIndicator.js";

const target_el = document.body;

/**
 * @type {NssLoadingIndicator}
 */
const loading_indicator = new NssLoadingIndicator(target_el);

loading_indicator.show();

window.setTimeout(() => {
    loading_indicator.hide();
}, 5000);
```

__Hint:__ If you use overlapping loading indicators, then create a new instance for each loading indicator.

### Methods

- `show()` Returns a promise which is resolved when the loading indicator is fully shown.
- `hide()` Returns a promise which is resolved when the loading indicator is fully hidden (and destroyed).