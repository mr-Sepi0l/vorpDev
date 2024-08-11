# nss_pinboard - changelog

## 1.3.1 (_2024-03-13_)

- Add `Config.ImageServerBlacklist` to block specific image servers. See `config.demo.lua` for more information.
- Add FAQ to `README.md`.

### What must be considered during update?

- New language keys added (see `New since 1.3.1` marks). Please add it to your language file(s).
- Compare your `config.demo.lua` with your `config.lua` to consider new options (see `New since 1.3.1` marks).

## 1.3.0 (_2024-03-07_)

- Extend comments of `config.demo.lua` for more clarity.
- Add some debug prints to `actions.lua` because in newer versions of `vorp_core` sometimes (especially on many players)
  no char data available if should.
- Add torn sheet for broken image (e.g. that can no longer be found).
- Add alternative style of bulletin board. See examples in `config.demo.lua` with new poster configuration
  attribute `alternative_style`.
- Add new optional "close bulletin board on damage or combat" feature. See `Config.HideOnCombatOrDamage`
  in `config.demo.lua`.

### What must be considered during update?

- New language keys added (see `New since 1.3.0` marks). Please add it to your language file(s).
- Compare your `config.demo.lua` with your `config.lua` to consider new options (see `New since 1.3.0` marks).

## 1.2.2 (_2024-02-07_)

- Image urls with search params like `https://example.com/image.jpg?xyz=123` are now supported, too.

## 1.2.1 (_2024-01-18_)

- Update example `map/bulletin_boards_config.lua` and add missing `group` property.

## 1.2.0 (_2023-07-13_)

- Add option to disable creation of text or image posts (globally or per board).
- Add prev/next buttons to poster details for better navigation.
- Add "pinboard service". Players can pay a fee to post everywhere at once in a pinboard group.

### What must be considered during update?

- New language keys added (see `New since 1.2.0` marks). Please add it to your language file(s).
- Compare your `config.demo.lua` with your `config.lua` to consider new options.

## 1.1.9 (_2023-07-05_)

- Fix `jpeg` support for images (currently `jpg`, `jpeg`, `png` and `webm` are supported).

## 1.1.8 (_2023-03-23_)

- Add new __required__ board property `group`. Restricts "post to all" feature to specific board groups.
- Add new optional board property `restrict_view_by_jobs`. Restricts the access to view a board (and blip) to one or
  more specific jobs.

## 1.1.7 (_2023-03-17_)

- Webhooks can now optionally configured each board.

## 1.1.6

- `Config.JobRemovePermissions` now checks correctly if job grade is equal or higher than the required grade.

## 1.1.5

- Add new `restrict_create_by_jobs` in `Config.Posters` to restrict the creation of new posters to one or more specific
  jobs. See [config.demo.lua] for more information.

## 1.1.4

- Remove unnecessary print output.

## 1.1.3

- Add __optional__ new config attribute `Config.DiscordWebhook.webhook_url_new` for only new pinboard notifications.
- Add __optional__ new config attribute `Config.DiscordWebhook.anonymous_new` which hides the character name
  for `webhook_url_new` notifications. _This have no effect to `webhook_url` notifications._
- Add __optional__ new config attribute `Config.DiscordWebhook.webhook_url_removed` for only removed pinboard
  notifications.
- Add __optional__ new config attribute `Config.DiscordWebhook.anonymous_remover` which hides the character name
  for `webhook_url_removed` notifications. _This have no effect to `webhook_url` notifications._
- Change config attribute `Config.DiscordWebhook.webhook_url` to be _optional_. It still sends all types of
  notifications to the same webhook but all authors and removers are __not__ anonymous.
- Add new translation `discord_anonymous_user` for anonymous characters for `webhook_url_new` and `webhook_url_removed`
  notifications.
- Moved changelog from `README.md` to `CHANGELOG.md`.

## 1.1.2

- Add `hide_blip` property for `Config.Posters`. If set to `true` no blip is shown on the map for the related pinboard.

## 1.1.1

- Order of text sections are now correct if inserted between two existing sections.

## 1.1.0

- Add possibility to pin a new note everywhere at once.
- Permissions of new feature is configurable for groups and character names (full names).
- Add new language keys `discord_location_everywhere`, `post_everywhere_at_once`, `post_everywhere_at_once_every_where`
  and `post_everywhere_at_once_only_here`.
- Update discord webhook to show as location "everwhere" if someone uses the new feature.
- Admins always have the permission to use the new feature.

## 1.0.2

- Results of automated processes are shown in discord more clear, e.g. "System" instead of character name.
- Results of console commands are shown in discord more clear, e.g. "Marti McFly (via Console)".
- Add `Config.DiscordWebhook.system_user_alias` to config file, see example in `config.demo.lua`.
- Add key `discord_console_command` to languages.
- Fix to many linebreaks in poster text.

## 1.0.1

- Add sorting for notice order on bulletin boards.

## 1.0.0

Initial release.

[config.demo.lua]: config.lua
