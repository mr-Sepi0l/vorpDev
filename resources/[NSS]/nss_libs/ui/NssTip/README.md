# nss_libs - NssTip

This component creates a tip with a title and a description. The tip is placeable at specific positions.

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssTip} from "nui://nss_libs/ui/NssTip/NssTip.js";
```

### Create tip

```javascript
import {NssTip} from "nui://nss_libs/ui/NssTip/NssTip.js";

/**
 * @type {NssTip}
 */
const tip = new NssTip('YOUR TEXT HERE');

tip
    .setDuration(5000) // After 5 seconds the tip will be hidden, default is 4000
    .setBottomRight() // Default is bottom center
    .show()
```

### Available positions

- `setBottomCenter()`
- `setBottomLeft()`
- `setBottomRight()`
- `setCenterCenter()`
- `setCenterLeft()`
- `setCenterRight()`
- `setTopCenter()`
- `setTopLeft()`
- `setTopRight()`