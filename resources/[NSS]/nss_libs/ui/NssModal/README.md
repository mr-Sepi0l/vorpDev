# nss_libs - NssModal

Provides an animated modal with customizable content. The modal considers if the user currently typing in an editable
element (like input or textarea) and prevents the modal from closing if a close key was pressed during typing.

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssModal} from "nui://nss_libs/ui/NssModal/NssModal.js";
```

### Create instance

```javascript
import {NssModal} from "nui://nss_libs/ui/NssModal/NssModal.js";

const content_el = document.createElement("div");
content_el.innerHTML = "Hello World!";

/**
 * @type {NssModal}
 */
const nss_modal = new NssModal();

nss_modal
    .closeOnModal()
    .closeOnEscape()
    .closeOnBackspace()
    .setContent(content_el)
    .onClose(() => {
        // Do your stuff here...
    })
    .show();

// Example: Close modal after 3 seconds automatically
window.setTimeout(() => {
    nss_modal.hide();
}, 3000);
```