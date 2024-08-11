# nss_libs - UI components

This directory contains the UI components for the NSS libraries.

### Simple: ES6 module import

In this example we import the NssAudio component directly via ES6 module import.

```javascript
import {NssAudio} from "nui://nss_libs/ui/NssAudio/NssAudio.js";
```

This is the easiest way to import a component.

## Load components via api

Alternatively you can load ui components via the `NssUiApi` component. This enables you to load multiple ui components
at once, waiting for all components to be loaded and/or loading components dynamically.

```javascript
import {NssUiApi} from "nui://nss_libs/ui/NssUiApi.js";

/**
 * @type {NssUiApi}
 */
const nss_ui_api = new NssUiApi('[YOUR_RESCOURCE_NAME]');

const component_names = [
   NssUiApi.NssResponsive,
   NssUiApi.NssSvgReplacer,
   NssUiApi.NssTextBox
];

nss_ui_api.load(component_names).then((components) => {

    new components.NssResponsive();
    new components.NssSvgReplacer();

    // Do your stuff here...
});
```

### Alternative for local development

Only for developers who want to test the components locally in the browser (e.g. Chrome) without running a REDM server.

1. Create a file called `nss_ui_api.js` into the root of your html script folder. This file will be a wrapper
   to decide automatically if the CFX browser is available (we are in a RedM client) or not (we are in a normal
   browser).
2. Add the following code to the wrapper file:

   ```javascript
   // noinspection JSFileReferences
   
   const is_cfx_browser = navigator.userAgent.indexOf("CitizenFX") > -1;
   
   let imp_obj;
   
   if (is_cfx_browser) {
       imp_obj = await import("nui://nss_libs/ui/NssUiApi.js");
   } else {
       // Adapt relative path to your needs, please if you want to use it locally in your web browser.
       imp_obj = await import("../../../../../[nss]/nss_libs/ui/NssUiApi.js");
   }
   
   const NssUiApi = imp_obj.NssUiApi;
   
   export {NssUiApi};
   ```

3. Replace all `[YOUR_RELATIVE_PATH_TO]` placeholders with the relative paths to the `nss_libs` folder.
4. Go into your main javascript file (e.g. `app.js` or `index.js`) and add the following code to import the `NssUiApi`:

   ```javascript
   import {NssUiApi} from "./nss_ui_api.js";
   
   /**
    * @type {NssUiApi}
    */
   const nss_ui_api = new NssUiApi('[YOUR_RESCOURCE_NAME]');
   
   const component_names = [
       nss_ui_api.NssResponsive,
       nss_ui_api.NssSvgReplacer,
       nss_ui_api.NssTextBox
   ];
   
   nss_ui_api.load(component_names).then((components) => {
   
       new components.NssResponsive();
       new components.NssSvgReplacer();
   
       // Do your stuff here...
   });
   ```

5. Replace the placeholders with the related values.
    - `[YOUR_RESCOURCE_NAME]` is the name of your resource.
