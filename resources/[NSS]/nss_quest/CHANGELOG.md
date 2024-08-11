# nss_quest - changelog

## 1.6.3 _(2024-07-03)_

- Add optional command to open the quest log. So you can use this command as alternative to the quest log item, e.g. in
  the nss_emotes script.
- The quest log item to open the quest log is now optional if you use the command to open the quest log.
- The quest log item and command can be used together.

### What must be considered during update?

- Update options in `config.lua` (see `New since 1.6.3` marks in `config.demo.lua`).

---

## 1.6.2 _(2024-04-15)_

- Fix nil pointer exception in `getCharData` method.
- Add listener for job changes to update job restrictions/blacklists.
- If a quest is not available after job change it will be still shown in quest log but with a hint that it is not
  available for the current job or job grade. Those quests are not clickable.

### What must be considered during update?

- Update `nss_libs` to version `0.33.0` or higher.
- Update translations and options in `config.lua` (see `New since 1.6.2` marks in `config.demo.lua`).

---

## 1.6.1 _(2024-03-02)_

- Remove unnecessary prints.
- Fix issues with prompt restrictions.
- Allow quest prompts in water.

### What must be considered during update?

- Update `nss_libs` to version `0.30.0` or higher.

---

## 1.6.0 _(2024-03-01)_

- Add time windows for quests. See `quests/quest_demo.lua` for an example and [QUEST.md](QUEST.md#in_game_time_windows)
  at `in_game_time_windows` for more information.
- Documentation of the properties of quests and quest steps moved to separate files. See [QUEST.md](QUEST.md) and
  [STEPS.md](STEPS.md).

### What must be considered during update?

- Update translations and options in `config.lua` (see `New since 1.6.0` marks in `config.demo.lua`).

---

## 1.5.0 _(2024-02-26)_

- Add blacklisted jobs that are not allowed to use the related quests. See `quests/quest_demo.lua` for an example and
  [QUEST.md](QUEST.md#quest-properties) for more information.
- Extend the documentation (README.md) to make it more clear.

### What must be considered during update?

- Nothing.

---

## 1.4.0 _(2024-02-23)_

- Add jobs as requirement for quests. See `quests/quest_demo.lua` for an example and README.md for more information.

### What must be considered during update?

- Update `nss_libs` to version `0.29.0` or higher.

---

## 1.3.0 _(2023-12-11)_

- Add gold as reward/requirement type.
- Add weapons as reward type.
- Fix requirements check for money.

### What must be considered during update?

- Compare your `config.lua` with `config.demo.lua` (see `new since 1.3.0` marks).
- Update `nss_libs` to version `0.28.0` or higher.

---

## 1.2.1 _(2023-10-28)_

- Add optional quest property `show_previous_step_in_quest_log`. See `quests/quest_demo.lua` for an example and
  README.md for more information.
- Add a delay to wait for vorp inventory to be loaded. Delay can be changed in config
  via `Config.CheckInventoryAfterCharSelectedDelayInSeconds`. Default is 10 seconds.
- Ensure that only one quest log item is in the inventory on char loaded (duplicates will now be removed automatically).

### What must be considered during update?

- Compare your `config.lua` with `config.demo.lua` (see `new since 1.2.1` marks).

---

## 1.2.0 _(2023-08-03)_

- Add optional marker for quest steps. See `quests/quest_demo.lua` for an example.
- Add optional blip for quest steps. See `quests/quest_demo.lua` for an example.
- Add optional radius blip for quest steps. See `quests/quest_demo.lua` for an example.
- Switch from hardcoded prompts to `nss_libs` prompts.
- Add configuration validation (it tells you if something is wrong in the config and/or quests).
- Add config file existence check (it tells you if config file does not exist).
- Add quest log.

### What must be considered during update?

- Update `nss_libs` to version `0.26.0` or higher.
- Create quest log inventory item, see [Setup quest log item](README.md#setup-quest-log-item).
- Update translations and options in `config.lua` (see `New since 1.2.0` marks in `config.demo.lua`).

---

## 1.1.1

- Remove unnecessary event variable.
- Quests with only one step each now store the number of completions correctly in the database, so that `max_solved` is
  considered correctly.

---

## 1.1.0

- Add "daily quests" to the quest system
- Remove unnecessary `QuestLoadingIndicator.css` from `index.html`.
- Move some sensitive config vars to `internal_cfg.lua`.

---

## 1.0.15

- __Important:__ `nss_libs` version `0.17.0` or higher is required.
- Switch to `nss_libs` `NssButton` ui component.
- Move loading indicator to `nss_libs` `NssLoadingIndicator` ui component.
- Add "Quest completed" sound.
- Fix ERR_FAILED on NUI requests.

---

## 1.0.14

- Code refactoring.
- Move changelog from README.md to CHANGELOG.md.

---

## 1.0.13

- Switch to `nss_libs` `NssConfirm` ui component.
- Remove dev files for local browser testing.

---

## 1.0.11 / 1.0.12

- Internal improvements based on nss_libs changes.

---

## 1.0.10

- Update demo files.

---

## 1.0.9

- Use item images from `nss_libs` item api.

---

## 1.0.8

- Use new `nss_libs` point-in-range api.

---

## 1.0.7

- Use new `nss_libs` character api.
- Prepare item images for future use.

---

## 1.0.6

- Use new `nss_libs` inventory api.
- Add some typedefs.
- Add new "callback" function if a quest step gets done.

---

## 1.0.5

- Use new `nss_libs` DB api.

---

## 1.0.4

- Switch to new `nss_libs` ui api instead of including the needed files directly.

---

## 1.0.3

- Add version check.
- Add `nss_libs` ui modules as dependencies.

---

## 1.0.2

- Prevent nil pointer exception in method getVorpCharData for characters without lastname.

---

## 1.0.1

- Create README.md
- Consider optional server event `vorp:SelectedCharacter` to update the char and quest data on player selection.
- Add item labels as hover to requirements/rewards icon table.

---

## 1.0.0

* Initial release.