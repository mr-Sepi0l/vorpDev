# nss_libs - NssButtons

This component provide a simple button component with callback functionality and styles.

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssButtons} from "nui://nss_libs/ui/NssButtons/NssButtons.js";
```

### Simple button

```javascript
import {NssButtons} from "nui://nss_libs/ui/NssButtons/NssButtons.js";

/**
 * @type {NssButtons}
 */
const buttons = new NssButtons();

/**
 * @type {NssButton}
 */
const btn = buttons.create('Button text');

btn
    .setGrey()
    .setEnabled()
    .setSizeLarge()
    .onClick(() => {
        // Do your stuff here...
    })
    .appendTo(document.body);
```

## `NssButton` methods

### Glowing

- `enableGlowing()`
- `disableGlowing()`
- `setGlowGreen()`
- `setGlowDanger()`
- `setGlowGold()`

### Colors

- `setGold()`
- `setDanger()`
- `setSuccess()`
- `setWhite()`
- `setGrey()`

### Sizes

- `setSizeVerySmall()`
- `setSizeSmall()`
- `setSizeNormal()`
- `setSizeLarge()`

### Other

- `setDisabled()`
- `setEnabled()`
- `setBorderless()` Removes inner button padding.
- `unsetBorderless()`
- `setIcon()` Change styles of button to support icon.
- `unsetIcon()`
- `setLabel(new_label)` Change label of button. Supports HTML. 
- `getEl()` Returns the button element.
- `getWrapperEl()` Returns the button wrapper element. Use this to add as child of other elements.
- `onClick(callback)` Register a callback function which is called when the button is clicked.
- `appendTo(target_el)` Append the button to the end of the element. (New since version 0.31.0)
