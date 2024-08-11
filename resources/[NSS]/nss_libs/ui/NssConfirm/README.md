# nss_libs - NssConfirm

This component provide a simple confirm dialog with a title, a message and two buttons. Optionally you can use it
as alert dialog with only one button.

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssConfirm} from "nui://nss_libs/ui/NssConfirm/NssConfirm.js";
```

### Create confirm dialog

```javascript
import {NssConfirm} from "nui://nss_libs/ui/NssConfirm/NssConfirm.js";

NssConfirm.confirm('Confirm message', 'Confirm', 'Cancel')
    .then(() => {
        // Answer was "Confirm", do your stuff here...
    })
    .catch(() => {
        // Answer was "Cancel", do your stuff here...
    });
```

This dialog has a fourth argument `danger` which is set to true a specific version of the dialog is shown.

### Create alert dialog

```javascript
import {NssConfirm} from "nui://nss_libs/ui/NssConfirm/NssConfirm.js";

NssConfirm.alert('Alert Messege', 'Confirm')
    .then(() => {
        // Answer was "Confirm", do your stuff here...
    });
```

This dialog has a fourth argument `danger` which is set to true a specific version of the dialog is shown.