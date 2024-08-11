# nss_libs - NssPadLock

Provides an user interface that emulates a padlock. The padlock can be opened by entering a pin code.

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssPadLock} from "nui://nss_libs/ui/NssPadLock/NssPadLock.js";
```

### Create simple padlock

```javascript
import {NssPadLock} from "nui://nss_libs/ui/NssPadLock/NssPadLock.js";

const dummy_code = '0042'; // The code is variable of length, currently 4 digits

const padlock = new NssPadLock(dummy_code);

const on_open = (/**NssPadLock*/opened_padlock) => {
    // Do your stuff here...
};

padlock
    .setTimePenalty(3000)
    .setTranslationUnlock('Unlock')
    .setTranslationLock('Lock')
    .onOpen(on_open)
    .show();
```

### Create custom padlock

```javascript
import {NssPadLock} from "nui://nss_libs/ui/NssPadLock/NssPadLock.js";

const dummy_code = '000006'; // The code is variable of length, currently 6 digits

const padlock = new NssPadLock(dummy_code);

const on_new_code_callback = (/**string*/code) => {
    console.log('New entered code', code);

    if (code === dummy_code) {
        padlock.unlock();

        // Do your stuff here...

    } else {
        padlock.lock();
    }
};

padlock
    .setTimePenalty(3000)
    .setTranslationUnlock('Unlock')
    .setTranslationLock('Lock')
    .disableAutomation()
    .setNotClosable()
    .onNewCode(on_new_code_callback)
    .show();
```

### Create padlock with "cache"

If the padlock is opened successfully, the code is cached for a certain time. If the padlock is opened again within this
time, the padlock sets the cached code and simulates the click on the "unlock" button..

```javascript
import {NssPadLock} from "nui://nss_libs/ui/NssPadLock/NssPadLock.js";

const dummy_code = '0042'; // The code is variable of length, currently 4 digits

const padlock = new NssPadLock(dummy_code);

const on_open = (/**NssPadLock*/opened_padlock) => {
    // Do your stuff here...
};

padlock
    .setTimePenalty(3000)
    .setTranslationUnlock('Unlock')
    .setTranslationLock('Lock')
    .onOpen(on_open)
    .enableCache('unique_cache_id', 60000) // 1 minute
    .show();
```