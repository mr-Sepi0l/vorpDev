# Bulletin Board _by Night Shift Studio_

Visit our [Discord] / [Homepage] / [Store] !

---

## Table of contents

- [Requirements / Dependencies](#requirements--dependencies)
- [Changelog](#changelog)
- [Setup script](#setup)
- [FAQ](#faq)

---

## Requirements / Dependencies

The following resources are required for `nss_pinboard` to work:

- [Vorp Framework]

---

## Changelog

See [CHANGELOG.md] for more information.

---

## Setup

1. Ensure that the `nss_pinboard` folder is in your `resources` folder.
2. Rename [config.demo.lua] to `config.lua` and fill in the values.
    1. If you want to use prepared bulletin boards see [optional ymap] now.
3. Execute `db.sql` on your database.
4. Add `ensure nss_pinboard` to your `server.cfg`.
5. Restart your server.

---

### Optional: ymap

You can use this [bulletin_boards.ymap] to place bulletin boards to prepared locations in your map.
The [bulletin_boards_config.lua] file contains the coordinates for the bulletin boards for the script.

1. Copy and replace `Config.Posters` from [bulletin_boards_config.lua] into your `config.lua`
2. Create a new resource folder.
3. Create a `stream` folder inside the new resource folder.
4. Copy the [bulletin_boards.ymap] file into the `stream` folder.
5. Add `fxmanifest.lua` with the following content:

    ```lua
    fx_version "adamant"
    game "rdr3"
    rdr3_warning "I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships."
       
    this_is_a_map "yes"
    ```

6. Add `ensure <new_resource_name>` to your `server.cfg`.
7. Restart your server.

---

## FAQ

### Why sometimes images from discord are not available?

Discord has introduced an expiry restriction for images.

See the following links for more information:

- [New Authenticated Attachment URL Parameters](https://discord.com/channels/613425648685547541/697138785317814292/1157372186160537750)
    - [Follow up to original information](https://discord.com/channels/613425648685547541/697138785317814292/1169356818586275930)
- [Discord makes file links temporary to fight abuse](https://www.ghacks.net/2023/11/06/discord-makes-file-links-temporary-to-fight-abuse/)

As long as there is no simple solution for this, we recommend that your players refrain from using Discord links.

You can use `Config.ImageServerBlacklist` to block specific domains like `discord.com` or `cdn.discordapp.com` to
prevent the use of Discord links.

---

[optional ymap]:                 #optional-ymap

[bulletin_boards.ymap]:          ./map/bulletin_boards.ymap

[bulletin_boards_config.lua]:    ./map/bulletin_boards_config.lua

[config.demo.lua]:               ./config.lua

[CHANGELOG.md]: ./CHANGELOG.md

[Vorp Framework]: https://github.com/VORPCORE

[Discord]: https://night-shift-studio.com/discord

[Homepage]: https://night-shift-studio.com/

[Store]: https://night-shift-studio.com/store
