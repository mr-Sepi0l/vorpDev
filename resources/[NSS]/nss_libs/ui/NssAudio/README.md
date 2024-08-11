# nss_libs - NssAudio

This component provide a simple audio player to play sound fx.

-------------------------------------------------------------------------------

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssAudio} from "nui://nss_libs/ui/NssAudio/NssAudio.js";
```

-------------------------------------------------------------------------------

### Simple sound fx player

```javascript
import {NssAudio} from "nui://nss_libs/ui/NssAudio/NssAudio.js";

/**
 * @type {NssAudio}
 */
const audio_player = new NssAudio('nui://RESOURCE_NAME/PATH/TO/YOUR/SOUNDS/');
audio_player.setVolume(0.5);
audio_player.playAudio('YOUR_SOUND_FILE.mp3'); // Returns promise which is resolved if sound was ended
```

-------------------------------------------------------------------------------

### Integrated SFX commands

```javascript
import {NssAudio} from "nui://nss_libs/ui/NssAudio/NssAudio.js";

// Availabe commands:
NssAudio.playSfxBack();
NssAudio.playSfxNext();
NssAudio.playSfxUpDown();
NssAudio.playSfxShowMenu();
NssAudio.playSfxIndexOpen();
NssAudio.playSfxIndexClose();
NssAudio.playSfxIndexClose();
NssAudio.playSfxHideMenu1();
NssAudio.playSfxHideMenu2();
NssAudio.playSfxHideMenu3();

// Custom volume example
NssAudio.playSfxBack(1); // 100% volume
NssAudio.playSfxBack(0.5); // 50% volume
NssAudio.playSfxBack(0.25); // 25% volume

// Other commands
const instance = new NssAudio('nui://RESOURCE_NAME/PATH/TO/YOUR/SOUNDS/');
instance.playAudio(filename, prevent_reset, loop);
instance.loopAudio(filename);
instance.setVolume(volume);
instance.stop(force_ended_event); // fire_ended_event is optional, default is false, but fires ended event if sound file was ended
instance.isPlaying();
instance.getDurationInPercent(); // Returns false if duration is not available
instance.getCurrentTime();
instance.getDuration(); // Returns false if duration is not available
instance.setRandomPlaybackRate(min, max); // Set random playback rate between min and max. Automated pitching.
```

