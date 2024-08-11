# Quest step properties

## `id`

- [string]
- required

A unique identifier for the quest step. Ensure that these id only exists one time only.

> __Important:__<br>
> Only `a-zA-Z0-9` and `-_` are allowed.

---

## `name`

- [string]
- required

The name of the quest step. It will be shown in the quest dialog.

---

## `description`

- [string]
- [optional]
- default `nil`

An internal description for the quest step, e.g. like notes for the quest writers.
It is currently not used and shown anywhere.

---

## `btn_text`

- [string]
- required

The text for the button in the prompt. It will be shown in the prompt.

---

## `location`

- [table]
- required

Contains the `coords` and `radius` for the quest step triggering point.

Example:

```lua
location = {
    coords = {
        x = -858.72,
        y = -1340.31,
        z = 44.43
    },
    radius = 2.0
}
```

| Attributes | Type             | Optional | Default | Description                                                                                                                                  |
|------------|------------------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `coords`   | [table]          | required | -       | A table of the `x`, `y` and `z` coordinates for the quest step triggering point.                                                             |
| `radius`   | [number] (float) | required | -       | The radius around the `coords` where the quest step should be triggered. Ensure a float (e.g. `2.0`) and not an integer (e.g. `2`) is given. |

---

## `quest_text`

- [string]
- required

The text for the quest dialog. It will be shown in the quest dialog. Can contain HTML tags.

---

## `callback`

- [function]
- [optional]
- default `nil`

A function that is called when the quest step is started/accepted. It can be used to add custom
logic like spawning a vehicle or giving weapons to the player.

> __Important:__<br>
> The callback will be executed on server side.

Example:

```lua
---@param _source number The player source (server player id)
---@param step NssQuestStep The current quest step (see configured step for possible properties)
---@param char NssQuestCharacter The character that accepted the quest
callback = function(_source, step, char)
    print("Character properties", json.encode(char))
end
```

---

## `requires`

- [table]
- [optional]
- default `nil`

A table of requirements for the quest step.

The requirements are checked before the quest step is started/accepted.

See the following attributes for more information:

- [items](#items-of-requires)
- [money](#money-of-requires)
- [gold](#gold-of-requires)
- [completed_quests](#completed_quests-of-requires)

---

### `items` of `requires`

- [table]
- [optional]
- default `nil`

A table of items that are required for the quest step.

If `remove` is set to `true`, the item will be removed from the player inventory if the quest step starts/ends.

`label` is optional and can be used to overwrite the item label in the quest dialog.

> __Important:__ The item must exists in the database of the supported framework.

Example:

```lua
items = {
    {
        name = "red_berries",
        count = 3,
        remove = true,
        label = "Custom label for item",
    },
}
```

---

### `money` of `requires`

- [table]
- [optional]
- default `nil`

A table of money that are required for the quest step.

If `remove` is set to `true`, the money will be removed from the player inventory if the quest step starts/ends.

Example:

```lua
money = { amount = 5, remove = true }
```

---

### `gold` of `requires`

- [table]
- [optional]
- default `nil`

A table of gold that are required for the quest step.

If `remove` is set to `true`, the gold will be removed from the player inventory if the quest step starts/ends.

Example:

```lua
gold = { amount = 5, remove = true }
```

---

### `completed_quests` of `requires`

- [list] of quest id [string]s
- [optional]
- default `nil`

A list of quests that are required for the quest step.

Example:

```lua
completed_quests = { "quest_id1", "quest_id99" }
```

---

## `rewards`

- [table]
- [optional]
- default `nil`

A table of rewards for the quest step.

See the following attributes for more information:

- [items](#items-of-rewards)
- [weapons](#weapons-of-rewards)
- [money](#money-of-rewards)
- [gold](#gold-of-rewards)

---

### `items` of `rewards`

- [table]
- [optional]
- default `nil`

A table of rewards for the quest step.

`label` is optional and can be used to overwrite the item label in the quest dialog.

> __Important:__ The item must exists in the database of the supported framework.

Example:

```lua
items = {
    {
        name = "red_berries",
        count = 3,
        label = "Custom label for item"
    },
}
```

---

### `weapons` of `rewards`

- [table]
- [optional]
- default `nil`

A table of rewards for the quest step.

`label`, `desc` and `serial` are optional and can be used to overwrite the weapon defaults.

> __Important:__ The weapon must exist in the game,
> see [weapon list](https://github.com/femga/rdr3_discoveries/blob/f729ba03f75a591ce5c841642dc873345242f612/weapons/weapons.lua).

Example:

```lua
weapons = {
    {
        name = "WEAPON_REVOLVER_CATTLEMAN",
        amount = 1,
        label = "Custom label for weapon",
        desc = "Custom description for weapon",
        serial = "Custom serial for weapon",
    }
}
```

---

### `money` of `rewards`

- [table]
- [optional]
- default `nil`

A table of money as rewards for the quest step.

Example:

```lua
money = { amount = 5 }
```

---

### `gold` of `rewards`

- [table]
- [optional]
- default `nil`

A table of gold as rewards for the quest step.

Example:

```lua
gold = { amount = 5 }
```

---

## `background_filename`

- [string]
- [optional]
- default `nil`

The filename of the background image for the quest dialog. The image must be located in
the `html_quest/img` folder.

---

## `padding_left`, `padding_top`, `padding_right`, `padding_bottom`

- [number]
- [optional]
- default `nil`

The padding for the quest dialog. The padding is used to move the quest content inside the quest dialog, e.g. if you
use your own background image.

---

## `title_color`

- [string]
- [optional]
- default is black

The color for the quest title in the quest dialog. The color must be a valid CSS color,
like `#ff0000` or `red`.

---

## `text_color`

- [string]
- [optional]
- default is black

The color for the quest text in the quest dialog. The color must be a valid CSS color,
like `#ff0000` or `red`.

---

## `shadow_color`

- [string]
- [optional]
- default is `nil`

The color for the quest text shadow in the quest dialog. The color must be a valid CSS color,
like `#ff0000` or `red`.

---

## `marker`

- [table]
- [optional]
- default `nil`
- new since 1.2.0

Defines if a special symbol is shown at the given coordinates so the player can see the location before
he arrives.

Example:

```lua
marker = {
    coords = {
        x = -858.72,
        y = -1340.31,
        z = 44.43
    },
    radius = 10.0,
    type = 0x94FDAE17,
    color = {
        r = 102,
        g = 0,
        b = 255
    },
}
```

| Attributes | Type             | Optional | Default | Description                                                                                                                                       |
|------------|------------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `coords`   | [table]          | required | -       | A table of the `x`, `y` and `z` coordinates for the marker triggering point.                                                                      |
| `radius`   | [number] (float) | required | -       | The radius around the `coords` where the marker should be triggered.<br><br>Ensure a float (e.g. `10.0`) and not an integer (e.g. `10`) is given. |
| `type`     | [number]         | required | -       | The visible type of the marker. See [Marker Types] for available types.                                                                           |
| `color`    | [table]          | required | -       | A table of the `r` (red), `g` (green) and `b` (blue) color values for the marker.                                                                 |

---

## `blip`

- [table]
- [optional]
- default `nil`
- new since 1.2.0

Allows to show a blip on the map for the quest step coordinates.

Example:

```lua
blip = {
    color = 'BLIP_MODIFIER_PICKUP_WEAPON_RARE',
    title = "Example title",
    icon = "blip_ambient_king",
}
```

| Attributes | Type     | Optional | Default | Description                                                                                             |
|------------|----------|----------|---------|---------------------------------------------------------------------------------------------------------|
| `color`    | [string] | required | -       | The `color` of the blip. See [Blip Colors] for available colors.                                        |
| `title`    | [string] | required | -       | The `title` of the blip.                                                                                |
| `icon`     | [number] | required | -       | The `icon` of the blip. See [Blip Multiplayer Icons] and [Blip Singleplayer Icons] for available icons. |

---

## `radius_blip`

- [table]
- [optional]
- default `nil`
- new since 1.2.0

Allows to show a radius blip with a defined radius on the map for the quest step coordinates.

Example:

```lua
radius_blip = {
    color = 'BLIP_MODIFIER_PICKUP_WEAPON_RARE',
    radius = 200.0,
}
```

| Attributes | Type             | Optional | Default | Description                                                      |
|------------|------------------|----------|---------|------------------------------------------------------------------|
| `color`    | [string]         | required | -       | The `color` of the blip. See [Blip Colors] for available colors. |
| `radius`   | [number] (float) | required | -       | The `radius` in meters of the blip.                              |

---

[Marker Types]: https://github.com/femga/rdr3_discoveries/blob/master/graphics/markers/marker_types.lua

[Blip Colors]: https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers

[Blip Multiplayer Icons]: https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips_mp

[Blip Singleplayer Icons]: https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips

[optional]: README.md#what-means-optional-for-attributes

[table]: README.md#table

[string]: README.md#string

[number]: README.md#number

[boolean]: README.md#boolean

[list]: README.md#list

[function]: README.md#function