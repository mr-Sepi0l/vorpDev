# nss_libs - changelog

## 0.35.0 (_2024-08-04_)

- Update [README](README.md) to make it clearer that only developers need the `config.demo.lua` and config files in the
  modules.
- When a resource is stopped, the `AttachPropApi` only outputs a message that props are being removed if the stopped
  resource had previously been created these props with `nss_libs`.
- Add `onBankInventoryOpen()`, `onMoveToCustomInventory()`, `onMoveToBankInventory()`,
  `onTakeFromCustomInventory()` and `onTakeFromBankInventory()` to `NssLibsInventoryApi`.
- Add `addSourceToCallback()`, `doNotAddSourceToCallback()`, `getResourceName()`, `setCustomData()` and
  `getCustomData()` to `NssLibsSharedHelperEventHandlerApi`.
- Add `createCallbackApi(callback, resource_name)` to `NssLibsHelper` (client and server side) which returns an api to
  handle the callback e.g. via `api:disable()` or `api:call('hello world')`.
- Add `getNearestPlayersInRadius()` to `NssLibsClientHelper`.
- Add `priority` to notification methods in `NssLibsNotifyApi`.

### What must be considered during update?

- Nothing.

## 0.34.0 (_2024-05-22_)

- `NssLibsInventoryApi.registerUsableItem` callback now returns item id, crafted id and item label of used item.
- `NssLibsInventoryApi.subItem` now optionally considers the metadata.
- Add `setItemMetadata`and `subItemByCraftedId` to `NssLibsInventoryApi`.

### What must be considered during update?

- Nothing.

## 0.33.0 (_2024-04-15_)

- Fix "404 not found" in `NssClient` module.
- Add method `isTableEqual` to `NssLibsSharedHelper`.
- Add methods `onGroupChange`, `onJobChange`, `onJobGradeChange`, `getSourceOfChar` and `getSteamIdOfChar`
  to `NssLibsCharacter` api.
- `NssLibsCharacterApi` now uses the VORP cache instead of database for job and group information. VORP does not save
  changes of jobs and groups directly to the database. So we have to use the VORP cache.
- All instances of `char_data` form `NssLibsCharacterApi` are now singletons. If a group, job or job grade changes, then
  the singletons will be updated with the new data.

### What must be considered during update?

- Nothing.

## 0.32.0 (_2024-03-30_)

- Add `playAnimation()` and `requestAnimDict()` to `NssLibsClientHelper`.
- Fix thread id check `NssLibsSharedHelper:createThreadSafeMonitor`. Monitor now stops if `:stop()` is called.

### What must be considered during update?

- Nothing.

## 0.31.0 (_2024-03-26_)

- Add `appendTo()` to `NssButtons` ui component.
- Fix `getClientCharacterApi` so it now returns the requested character api.
- Fix `NssLibsSharedHelper:createThreadSafeMonitor` now uses the correct `getUniqueId` method considering client and
  server.
- Update arguments for `vorp_inventory:useItem` to new version `3.5` of `vorp_inventory` (use now `data` object
  with `id` and `item` instead of arguments `itemId` and `itemName`).

### What must be considered during update?

- Update `vorp_inventory` to version `3.5.0` or higher.
- Note: If you can not update `vorp_inventory` to version `3.5.0` or higher, then do not update `nss_libs` to
  version `0.31.0` or higher.

## 0.30.0 (_2024-03-02_)

- Add `setMovementDetectionSensitivity()` to `NssLibsPromptsGroupApi`.
- Add `hideOnMovement()`, `showOnMovement()` and `isHideOnMovement()` to `NssLibsPromptsPromptApi`.
- Fix issues with prompts on movement detection.
- Add special notes to `NssLibsPromptsPromptApi` group restriction documentation.

### What must be considered during update?

- Nothing.

## 0.29.0 (_2024-02-23_)

- Add `getEntitiesNearby()` to `NssLibsEntityInRangeApi`.
- Add `createResourceEventName()`, `padWithZeros()`, `dateToUnixTimestamp()` and `unixTimestampToDate()`
  to `NssLibsSharedHelper`.
- Add `getCurrentServerTimestamp()` and `getCurrentMsTimestamp()` to `NssLibsClientHelper`.
- Change `getCurrentTimestamp()` to a local way in the client.
- Add property `required_message` to `NssLibsConfigValidatorRule`.
- Extend the logic for `serverIsReady()` and `onServerReady()`. Now ships info about timeout and can ship additional
  data.
- Make `serverIsReady()` and `onServerReady()` silent in server console.
- Add `getHandle()` to `NssLibsParticleFxPlayerApi`.
- Add `closeInventory()` to `NssLibsInventoryApi`.
- Add `NssLibsClientCharacterApi` for the client and prepare a demo bridge to VORP for it.
- Rename `allowDuringDuringHogtied`, `forbidDuringDuringHogtied`, `allowDuringDuringMovement`
  and `forbidDuringDuringMovement` to `allowDuringHogtied`, `forbidDuringHogtied`, `allowDuringMovement`
  and `forbidDuringMovement` in `NssLibsPromptsPromptApi` (remove double `during` in name).
- `NssLibsServerHelper:addEventHandler()` now returns an api to handle the event handler e.g. via `api:destroy()`.
- `NssLibsClientHelper:addEventHandler()` now returns an api to handle the event handler e.g. via `api:destroy()`.
- Extend the documentation of the `NssLibsHelper` module.
- Extend the documentation of the `NssLibsCharacter` module.
- Add more details to error messages in `NssLibsPrompts` module if the given key for a prompt is not valid.
- Add `higher_or_equal_as_number_properties`, `pre_check_rule` and `does_not_exists` rules to `NssLibsConfigValidator`.
- Add `hasOneOfTheJobs()`, `hasJob()`, `hasJobGrade()` and `isEmployed()` to `NssLibsCharacterItem`.
- Fix `_isEntityValid()` of `NssLibsSharedHelper` now recognizes custom filter function correctly.
- Fix `createThreadSafeMonitor()` of `NssLibsSharedHelper` now returns a monitor object.
- Fix missing array of strings in `contains` rule self test of `NssLibsConfigValidator`.

### What must be considered during update?

- Ensure that `allowDuringHogtied`, `forbidDuringHogtied`, `allowDuringMovement` and `forbidDuringMovement`
  of `NssLibsPromptsPromptApi` is used correctly in your own developed resources.

## 0.28.1 (_2023-12-12_)

- Add rules `max`, `higher_as_number_properties` and `linked_with_properties` to rule set of `NssLibsConfigValidator`.

## 0.28.0 (_2023-12-11_)

- Add `addGold`, `hasGold` and `subGold` to `NssLibsCharacter` module.
- Add `getGoldImage`, `getWeaponImage`, `getWeaponImages`, `canCarryWeapon` and `createWeapon` to `NssLibsInventory`
  module.
- Add type `weapon` to `ConfigValidator` module.
- Ensure prints containing only strings to prevent `SCRIPT ERROR: error object is not a string`.

## 0.27.1 (_2023-11-24_)

- Fix endless while loop in `InventoryClient:getUsedFramework()`, thx to @Valko.
- Add `createThreadSafeMonitor()` to `NssLibsSharedHelper` module.
- Make file name more detailed in `NssLibsServerHelper:requireFiles()` error message (white spaces are now visible).
- Fix and remove some print outputs.

## 0.27.0 (_2023-10-09_)

- Add `NssLibsAttachProp` module.
- `NssLibsSharedHelper:hasTableEntries()` initially checks for `nil` before checking for entries.
- Add `fireToAll(event_name, ...)` to `ClientEventApi` module.
- Add `getPlayersInRadius()`, `getPlayerClientIdsInRadius()` and `getPlayerServerIdsInRadius()` to `NssLibsClientHelper`
  module.
- Add named keys to `NssLibsPromptsApi` so you can give "E" instead of hash as key value.

## 0.26.0 (_2023-08-03_)

- Add `NssLibsNotify` module/api.
- Add `NssLibsConfigValidator` module/api.
- Add `waitUntilLoadingsScreenEnds()` to `NssLibsClientHelper` module.
- Add `isFloat()`, `isFunction()`, `isTableArray()` and `isTable()` to `NssLibsSharedHelper` module.
- Add `setRadius()` and `createRadiusAtCoords()` to `NssLibsBlip` module.
- Add `getCharacterByCharId()` to `NssLibsCharacterApi` module.
- Add `serverIsReady()` to `NssLibsServerListenerApi` module.
- Add `onServerReady()` to `NssLibsServerEventApi` module.
- Add `getRandomArrayElement()` to `NssHelper` ui module.
- Title of blips are now shown.

## 0.25.3 (_2023-07-13_)

- Add `requireFiles()` to `NssLibsServerHelper` module.
- Add `existsItemInDb()` and `requireItemsInDb()` to `NssLibsInventoryApi` module.
- Add `onConnected()` and `isStarted()` to `NssLibsDatabase` module.

## 0.25.2 (_2023-06-30_)

- Fix null pointer exception in `NssTip` ui module.
- Add more meaningful error messages for database errors in `NssLibsDatabase` module.
- Add more meaningful documentation for `NssLibsDatabase` module.

## 0.25.1 (_2023-06-29_)

- `config.demo.lua` is not encrypted anymore. README.md is updated.

## 0.25.0 (_2023-06-28_)

- `getFirstFoundWrapper` of `NssLibsServerHelper` now returns additionally the resource name.
- Extend `Inventory` module by client side, e.g. to use items and weapons.
- Add `debounce` to `NssHelper` ui module.
- Add `hide` to `NssTip` ui module.
- Add `debounced` to `NssLibsSharedHelper` module.
- Inventory change listener is now debounced to prevent multiple calls of same cause/reason.
- `ClientEvent` module now checks correctly if no callbacks are available.
- `listenInventoryChange` of `NssLibsInventoryApi` listen now to more Vorp Inventory events.
- If multiple sounds are start playing at same time the master volume is now used correctly in `NssAudio` ui module.
- `NssHelper.debounce` and `Nsshelper.debounceClock` now considering arguments for debounced function.

## 0.24.0 (_2023-05-06_)

- Add mock for `NssClient` UI module to simulate LUA client calls and NUI calls in your local browser during
  development.
- Add `getHelper()` to `NssUiComponentInterface` UI module.
- Add new font to `NssResponsive` UI module.
- Add pitching to `NssAudio` UI module.
- Add `SVG to CSS mask-image` feature to `NssSvgReplacer` UI module.
- Prevent duplicated mouse events for `NssPadLock`.
- Add code caching to `NssPadLock`.
- Add `getUserInventory` and `listenInventoryChange` to `NssLibsInventoryApi` module.
- Add `debouncedClock` to `NssLibsSharedHelper` module.
- Add `addEventHandler` to `NssLibsClientHelper` and `NssLibsServerHelper` modules.
- XHR loading indicator now works as expected in `NssClient` ui module.
- Move GIF animation to CSS for `NssLoadingIndicator` ui module.
- Add `setMasterVolumeInPercent` and `resetMasterVolumeInPercent` to `NssAudio` ui module.
- Steam profile url in `NssLibsCharacterApi` is now correctly formatted.
- Add `createObjectClone`to `NssHelper` ui module.

## 0.23.0 (_2023-04-03_)

- Encapsulate `NssLibsPromptsPromptApi` callbacks in separate threads to prevent blocking the main thread.
- `NPC` module uses new `NssLibsChunk` module instead of `PointInRange` for better performance. The size of the chunks
  in the `NssLibsChunk` module is adjustable. The `NPC`module has high radius of 100 meters and more which causes in
  extreme high counts of chunks in the `PointOfRange` module. In the `NssLibsChunk` module with higher chunk size the
  count of chunks are reduced. That saves CPU and memory usage.
- The `PointInRange` module now has a limit to prevent too much CPU and memory usage at high radius.
- Add "buffer" chunks to `NssLibsChunk` to ensure that a coordinate directly on the border of a chunk is still
  recognized.
- Add restrictions to `Prompts` module, like allow or forbid prompt enabled on mount.
- Fix press/release events for prompts with multiple keys.

## 0.22.0 (_2023-03-30_)

- Add new module `NssLibsChunk`.
- Add new methods to `NssLibsPromptsGroupApi`:
    - `linkToCoords` - Links prompt group to specific coordinates.
    - `linkToEntity` - Links prompt group to specific entity.
    - `linkToPlayer` - Links prompt group to specific player.
    - `linkToEntityModels` - Links prompt group to specific entity models.
- Add new methods to `NssLibsPromptsPromptApi`:
    - `disableOnMoveOn` - Disables prompt if player moves.
    - `disableOnMoveOff` - Do not disable prompt if player moves.
- Extend `NssLibsPromptsPromptApi` to add on-press/on-release mode.
- Add new methods `getDecimalCount`, `inlineError` and `inlineWarning` to `NssLibsSharedHelper`.
- Add new method `getUid` to `NssLibsClass`.
- Add new method `disablePlaceOnGround`, `enablePlaceOnGround` and `getEntity` to `NssLibsNpcEntityApi`.
- Optimize system messages if a resource stops. Only messages from modules that have related dependencies to the stopped
  resource will be shown.
- Add dependency check to `VersionCheck` module.

## 0.21.2

- Properties now inheriting correctly from child classes in `NssLibsClass`.
- Refactor `Class` to use `NssLibsClass` internally.
- Remove `NssLibsClass` from exports because "deeper" functions are not shareable in exports.
- Add new optional argument `entity_type` to `getNearestObjectEntity` in `EntityInRangeApi`.
- Add new static constants `ENTITY_TYPE_OBJECT`, `ENTITY_TYPE_PLAYER` and `ENTITY_TYPE_VEHICLE` to `EntityInRangeApi`.
- `NssLibsCharacterApi:getCharacterByName()` now checks the steam id correctly.
- Replace `config.lua` with `config.demo.lua` to prevent overwriting the config file on update.
- Add `config.demo.lua` to `NssLibsCharacterApi` to offer new debug option (create copy named `config.lua` in that
  folder to use it).

## 0.21.1

- `Blip` color now overwrites other blip modifiers.
- `NPC` has new methods `onShow`, `onHide`, `onTimeWindowChange`, `onTimeWindowChange`, `hasTimeWindows` and
  `isInTimeWindow`.

## 0.21.0

- Refactor whole `NssLibsBlip` module.

## 0.20.1

- `NssLibsPointInRangeApi` now optionally ignores the nearest check for a point.
- Performance improvement for `NssLibsNpcApi`. Only NPCs in range will be checked if they are visible by time window.

## 0.20.0

- Add new `NPC` api. Easy to create Non-Player-Character (NPC) for your REDM resource.
- Optimize `NssLibsSharedHelper:toFloat` method to prevent nil pointer exception.
- Add `NssLibsSharedHelper:toInt` method.
- `NssLibsPointInRange:unListen` now consider empty chunks correctly.
- Add more delay to automatic restart of resources by `DependencyAutoRestart` if `nss_libs` restarts to prevent crashes.

## 0.19.0

- Add new `Prompts` api.
- Add new `ParticleFxPlayer` api.
- Fix null pointer exception in `EntityInRange` api.
- Fix wrong return value in `NssLibsSharedHelper:getHashKey`
- Add `send` to `NssClientApi` to send a message to the client.
- `playAudio` of `NssAudio` now returns a promise which resolves when the audio is ended.
- Add `getId()` to `NssLibsPointInRangeListenerApi`.
- Fix null pointer exception in `PointInRange` if no "on leave" callback is set.
- Fix calling init on source class instead of child class on inherited classes.
- Fix wrong `getModelHash` (to `getHashKey`) method in `NssLibsEntityInRangeApi`.
- `getNearestObjectEntity` in `NssLibsEntityInRangeApi` ignores now listener check.
- Add new method `getNearestObjectEntity` to `NssLibsEntityInRangeApi`.
- Add new methods `stop`, `loopAudio`, `getDurationInPercent`, `getCurrentTime`, `getDuration` to `NssAudio` ui
  component.
- Fix wrong admin group name in `NssLibsCharacterApi`.

## 0.18.1

- Add new method `setWebhookUrl`, `setUsername`, `setAvatarUrl` and `message` to Discord API (`NssLibsDiscordApi`).
- Extend Discord API documentation.

## 0.18.0

- Add integrated sound fx to `NssAudio` ui component.
- Update `NssModal` ui component with new integrated sound fx.
- Add server player id to character data if available.
- Add date and timestamp methods to helper modules.
- Loading indicator now hides correctly on `NssClient` requests with callbacks.
- Add events to call "nss_libs loaded and started".
- Add `getDate(format)` to `NssLibsClientHelper` module.
- Move some sensitive config vars to `internal_cfg.lua`.
- Add "Last allowed version" feature to version check.
- Prevent loading version urls from cache.
- Refactor `Helper` module into separate server and client helper modules.
- Fix wrong argument name in `NssLibsSharedHelper:getHashKey()`.
- Refactor `EntityInRangeApi` (clear instead destroy item sets).
- Add loading indicator to `NssClient` ui component if a callback is given to `post` method.
- Add `getUniqueId()` method to `NssHelper` class.
- Fix missing fade animation for `NssLoadingIndicator` ui component.

## 0.17.0

- Added `NssLoadingIndicator` ui component.
- Added `NssAudio` ui component.
- Switch all ui components to new base class.
- Fix "editable" method in `NssModal` ui component.

## 0.16.5

- `NssModal` now consider if the user currently typing in an editable element (like input or textarea) and prevents the
  modal from closing if a close key was pressed during typing.
- Add some content to some readme files ;)

## 0.16.4

- Add method `strTrim` to `NssLibsHelper`.
- Add method `getCharacterByName` to `NssLibsCharacter` module.
- Add sounds to `NssButtons` ui component.
- Add `NssButtons` to `NssConfirm` ui component.
- Add `Character:getCharacterByName`.

## 0.16.3

- Rename `Helper` to `NssLibsHelper` to avoid namespace conflicts.
- Remove deprecated custom `Promises` class.
- Add `NssClient` LUA module to `NssClient` ui component.
- Fix method name in `Inventory` module.
- Add timeout to `ServerEvent.await` method.
- Add README.md for `Discord` module.
- Add `NssModal` ui component.

## 0.16.2

- Extend `Helper` module with `createWrapperFinder`, `getKeysFromTable`, `getCurrentTimestamp`, `waitUntilFirstStarted`,
  `waitUntilStarted` and `doUntilTimeout` functions.
- `Character` module now waits/searches for first loaded character framework.
- `Inventory` module now waits/searches for first loaded inventory framework.

## 0.16.1

- Add `RegisterUsableItem` to `Inventory` module.

## 0.16.0

- Add `DatabaseUpdater` module: Automatic database updater for resources based on the `VersionCheck` module.
- Extend `VersionCheck` module: Add `getCurrentVersion` function.

## 0.15.2

- Fix entry check in `EntityInRangeController`.
- Add possibility to create `config.lua` file each LUA module.
- Refactor `Keyboard` module to new requirements.

## 0.15.1

- Replace error messages in VorpCore wrapper of `Character` module with `print` calls.
- Extend `Character` module with new methods
  like `getIdentifiers`, `getSteamId`, `getSteamProfileUrl`, `getDiscordId`, `getDiscordProfileUrl`, `getRedmCharacterName`
  and more.
- Extend `Helper` module with new methods `isSteamWebApiKeyAvailable` and `strSplit`.

## 0.15.0

- Refactor `EntityInRange` module to new api style.
- Add `onResourceStop` logic to remove listeners from stopped resources automatically.
- See [README.md](./modules/EntityInRange/README.md) for more information.

## 0.14.3

- Add new helper method `round`and `getEmptyFunction` to `Helper`.
- Mark `Promise` as deprecated.

## 0.14.2

- Prevent `DependencyAutoRestart` from restarting resources that never was started before.

## 0.14.1

- Prevent `DependencyAutoRestart` from restarting resources on server startup.

## 0.14.0

- Add new `DependencyAutoRestart` module. See [README.md](./modules/DependencyAutoRestart/README.md) for more
  information.
- `nss_libs` now using `DependencyAutoRestart` module to auto-restart resources that have `nss_libs` as dependency.

## 0.13.1

- Switch to more readable front for NssPadLock.

## 0.13.0

- Add new ui component `NssClient`. See [README.md](./ui/NssClient/README.md) for more information.
- Add some README.md files to ui components.

## 0.12.2

- Fix wrong path to sound files in NssPadLock.
- Add new `DisableAutomatic` mode in NssPadLock.
- Change behaviour of `onNewCode` listener in NssPadLock.

## 0.12.1

- Add translations support for NssPadLock.

## 0.12.0

- NssUiComponentInterface now automatically load styles of component if instance is created and imported directly.
- New component NssLockPad

## 0.11.3

- Use new css module loader instead of relative paths.

## 0.11.2

- NssSimpleTextEditor
    - Order of text sections are now correct if inserted between two existing sections.