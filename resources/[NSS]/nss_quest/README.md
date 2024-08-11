# nss_quest _by Night Shift Studio_

Visit our [Discord] / [Homepage] / [Store] !

---

## Table of contents

- [Requirements / Dependencies](#requirements--dependencies)
- [Changelog](#changelog)
- [Setup script](#setup-script)
- [Setup quests](#setup-quests)
- [Setup quest log item](#setup-quest-log-item)
- [Known issues / bugs](#known-issues--bugs)
- [FAQ](#faq)
- [Type definitions](#type-definitions)

---

## Requirements / Dependencies

The following resources are required for `nss_quest` to work:

- [nss_libs]
- [Vorp Framework]

---

## Changelog

See [CHANGELOG.md] for more information.

---

## Setup script

1. Ensure that the `nss_quest` folder is in your `resources` folder.
2. Rename [config.demo.lua] to `config.lua` and fill in the values.
3. Ensure that the quest log item exists (see [Setup quest log item](#setup-quest-log-item))
4. Execute `db.sql` on your database.
5. Add `ensure nss_quest` to your `server.cfg`.
6. Restart your server.

---

## Setup quests

> __Important:__<br>
> See [Quest properties](QUEST.md) and [Quest step properties](STEPS.md) for more information.

1. Create a new file with the name of your quest, e.g. `my_quest.lua`, in [quests](./quests) folder.

2. Copy the following blueprint code into the file to create the basic quest. Adjust it to your needs.

    ```lua
    local step1 = {
        id = "start", -- Unique quest id, only "a-zA-Z0-9_-" are allowed
        name = "Helping hand...", -- Step name, will be shown in the quest dialog
        btn_text = "Pickup the letter", -- Button text for the prompt
   
        location = {
            coords = { x = 0, y = 0, z = 0 }, -- Location where the step should be triggered
            radius = 2.0 -- Radius around the location where the step should be triggered
        },
   
        quest_text = "You found a letter on the floor.\n\n"
                .. "The letter reads:\n\n"
                .. "<em>Dear Sir,\n\n"
                .. "I am in need of your help. I am hungry and I need you to help me.\n\n"
                .. "Please meet me at the bank in Strawberry and bring 3 red berries.</em>\n\n",
   
        -- Blips are optional, if you don't want a blib, remove the whole section.
        blip = {
            color = 'BLIP_MODIFIER_PICKUP_WEAPON_RARE', -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers for blip colors.
            title = "Strange footsteps",
            icon = "blip_ambient_king", -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips_mp or https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips for blip icons.
        },
   
        -- Rewards are optional, if you don't want rewards, remove the complete section.
        rewards = { -- In this case the rewards is used to give quest item
            items = {
                { name = "quest_letter", count = 1 }, -- Ensure that the item exists in your database
            }
        },
    }
   
    local step2 = {
        id = "end", -- Important: Do not use the same id as in step1. Ids must be unique.
        name = "Your letter...",
        btn_text = "Deliver red berries",
   
        location = {
            coords = { x = 0, y = 0, z = 0 },
            radius = 2.0
        },
   
        quest_text = "You deliver the letter and the red berries to an old man.\n\n"
                .. "He says:\n\n"
                .. "<em>Thank you Sir,\n\n"
                .. "The red berries are delicious. Here is a little something from me.</em>\n\n",
   
        -- Requirements are optional, if you don't want requirements, remove the complete section.
        requires = { -- In this case we require the player to have the quest item from previous step and 3 red berries
            items = {
                {
                    name = "quest_letter",
                    count = 1,
                    remove = true -- Remove the item from the player inventory if the step is completed 
                },
                {
                    name = "red_berries",
                    count = 3,
                    remove = true-- Remove the item from the player inventory if the step is completed 
                }
            },
        },
    
        -- Rewards are optional, if you don't want rewards, remove the complete section.
        rewards = {
            items = {
                { name = "coal", count = 1 }, -- Gives the player 1 coal if the step is completed
            },
            money = {
                amount = 5, -- Gives the player 5$ in cash if the step is completed
            },
        },
    }
   
    MyQuest = { -- Do not use "local MyQuest" because the variable should be accessible in the config file. 
        id = "my_quest", -- Unique quest id, only "a-zA-Z0-9_-" are allowed
        name = "My Quest", -- Quest name, will be shown in the prompt
        max_solves = 1, -- How many times can the quest be solved, 0 = infinity
        steps = { step1, step2 } -- The steps of the quest
    }
    ```

3. Go into `config.lua` file and add your new quest `MyQuest` to the `Config.Quests` table.

    ```lua
    -- Example for only one quest
    Config.Quests = { MyQuest }
    
    -- Example for more quests
    Config.Quests = {
        MyQuest,
        OtherQuest,
        AnotherQuest
    }
    ```

4. Restart your server and test your quest.<br>
   <br>
   _Tip:_ You can use `refresh` in the console to reload the resources without restarting the server. And after that
   use `restart nss_quest` to reload the quest data.

---

## Setup quest log item

_New since version 1.2.0._

1. Add quest log item (see example below) to your inventory database:
   ```mysql
   INSERT INTO ingame01.items (item, label, `limit`, can_remove, type, usable, `desc`, metadata)
   VALUES ('YOUR_QUEST_LOG_ITEM_NAME', 'Questlog', 1, 0, 'item_standard', 1, '', '{}');
   ```
   Important: Item should be configured as non-removable, usable and with a limit of 1.
2. Add `YOUR_QUEST_LOG_ITEM_NAME` to `Config.QuestLogItemName` property in the config file.
3. Copy `html_quest/img/quest_log_item.png` to `vorp_inventory/html/img/items/YOUR_QUEST_LOG_ITEM_NAME.png` (or use your
   own image).
4. Note: `YOUR_QUEST_LOG_ITEM_NAME` is a placeholder, you can choose any name you want.

---

## Known issues / bugs

No known issues/bugs at the moment.

---

## FAQ

### Can I give weapons to the player as reward?

Yes (since version 1.3.0), see the `rewards` section in the [Quest step properties] for more information.

---

### How many steps can a quest have?

Unlimited.

---

### How many quests can be configured?

Unlimited.

---

### What means "optional" for attributes?

If an attribute like `blip`, `requirements`, `markers` or `rewards` is optional, it means that you can leave out the
complete attribute section or set the attribute to `nil` if you don't want to use it.

Example __with__ blip:

```lua
local demo_step = {
    id = "demo_start_id",
    name = "Demo step name",
    btn_text = "Demo button text",

    location = {
        coords = { x = 0, y = 0, z = 0 },
        radius = 2.0
    },

    quest_text = "Some demo quest text",

    blip = {
        color = 'BLIP_MODIFIER_PICKUP_WEAPON_RARE', -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers for blip colors.
        title = "Strange footsteps",
        icon = "blip_ambient_king", -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips_mp or https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips for blip icons.
    },
}
```

Example __without__ blip:

```lua
local demo_step = {
    id = "demo_start_id",
    name = "Demo step name",
    btn_text = "Demo button text",

    location = {
        coords = { x = 0, y = 0, z = 0 },
        radius = 2.0
    },

    quest_text = "Some demo quest text",
}
```

Another example __without__ blip:

```lua
local demo_step = {
    id = "demo_start_id",
    name = "Demo step name",
    btn_text = "Demo button text",

    location = {
        coords = { x = 0, y = 0, z = 0 },
        radius = 2.0
    },

    quest_text = "Some demo quest text",

    blip = nil, -- This is the same as leaving out the complete blip section
}
```

---

## Type definitions

### `table`

A table is a collection of values or key-value pairs. In this script we use key-value pairs as tables.

_Note:_ Tables are often named as objects (or confusing as lists).

Example:

```lua
local mey_table = {
    key1 = "value1",
    key2 = true,
    key3 = 99
}

print(mey_table.key1) -- Output: value1
print(mey_table.key2) -- Output: true
print(mey_table.key3) -- Output: 99
```

---

### `list`

A list is a collection of values.

Example:

```lua
local my_list_of_strings = { "value1", "value2", "value3" }
print(json.encode(my_list_of_strings)) -- Output: ["value1","value2","value3"]

local my_list_of_numbers = { 1, 2, 3 }
print(json.encode(my_list_of_numbers)) -- Output: [1,2,3]

local object_1 = { key1 = "value1" }
local object_2 = { key2 = "value2" }
local my_list_of_objects = { object_1, object_2 }
print(json.encode(my_list_of_objects)) -- Output: [{"key1":"value1"},{"key2":"value2"}]
```

---

### `string`

A string is a sequence of characters wrapped by double or single quotes. In this script we often use strings for texts.

Example for a string:

```lua
local my_string = "Hello World!"

print(my_string) -- Output: Hello World!
```

---

### `boolean`

A boolean is a logical value. In this script we often use booleans for true/false checks.

Example for a boolean:

```lua
local my_boolean = true
print(my_boolean) -- Output: true

local my_other_boolean = false
print(my_other_boolean) -- Output: false
```

---

### `number`

A number is a numeric value. In this script we often use numbers for coordinates, radius, amount, etc.

Example for a number:

```lua
local my_number = 99 -- This is a number as integer (most common)
print(my_number) -- Output: 99

local my_floated_number = 99.99 -- This is a number as float
print(my_floated_number) -- Output: 99.99
```

---

### `function`

A function is a block of code that can be called by name. In this script we often use functions for callbacks.

Example for a simple named function:

```lua
local my_function = function(from_person)
    print("Hello from my function! Sincerely yours " .. from_person)
end

my_function('systemNEO') -- Output: Hello from my function! Sincerely yours systemNEO
```

Example for usage of a function as callback:

```lua
local demo_step = {
    id = "demo_start_id",
    name = "Demo step name",
    btn_text = "Demo button text",

    location = {
        coords = { x = 0, y = 0, z = 0 },
        radius = 2.0
    },

    quest_text = "Some demo quest text",

    callback = function(_source, step, char)
        print("Hello from my function!", json.encode(char))
    end
}
```

---

[config.demo.lua]: ./config.lua

[Vorp Framework]: https://github.com/VORPCORE

[nss_libs]: https://night-shift-studio.com/nss_libs

[Discord]: https://night-shift-studio.com/discord

[Homepage]: https://night-shift-studio.com/

[Store]: https://night-shift-studio.com/store

[CHANGELOG.md]: ./CHANGELOG.md

[optional]: #what-means-optional-for-attributes

[table]: #table

[string]: #string

[number]: #number

[boolean]: #boolean

[list]: #list

[function]: #function

[Quest step properties]: #quest-step-properties
