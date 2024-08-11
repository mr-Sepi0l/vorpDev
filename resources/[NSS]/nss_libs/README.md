# `nss_libs` _by Night Shift Studio_

`nss_libs` is a collection of helpers for REDM scripts. This library is designed for

- **ease of use**
- **high performance**
- **reusability** (_Instead of writing duplicate code each script!_)

It offers a wide range of so-called LUA modules and UI components.

The current state of the library is **alpha**. This means that the library is not yet feature complete and there may be
bugs. Use the library on our own risk.

Visit our [Discord] / [Homepage] / [Store] / [Docs]!

--------------------------------------------------------------------------------

## Support

- Visit [Discord] to open a ticket.

--------------------------------------------------------------------------------

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for more information.

--------------------------------------------------------------------------------

## Setup script for customers

1. Ensure that the `nss_libs` folder is in your `resources` folder.
2. Ignore `config.demo.lua` and other config files in `nss_libs` because they are only for developers,
   see [Additional setup script for developers](#additional-setup-script-for-developers) for more information.
3. Add `ensure nss_libs` to your `server.cfg`.
   Note: Place it on top of all resources that uses `nss_libs`.
4. Restart your server.

--------------------------------------------------------------------------------

## Additional setup script for developers

If you are a developer and create scripts using `nss_libs` then you can optionally do the following:

- Rename [config.demo.lua] to `config.lua` and fill in the values (currently there are no values).
- Modules can have their own config files, check the modules for `config.lua` or `config.demo.lua` files.
  Note: This is not necessary for all modules and depends on your use cases (e.g. as developer to enable debug modes).

--------------------------------------------------------------------------------

## TODOs

- Countless ;)

--------------------------------------------------------------------------------

## Dev hints

- [PHPStorm LUA Annotations](https://emmylua.github.io/annotation.html)

[Discord]: https://night-shift-studio.com/discord

[Homepage]: https://night-shift-studio.com/

[Store]: https://night-shift-studio.com/store

[Docs]: https://night-shift-studio.com/docs
