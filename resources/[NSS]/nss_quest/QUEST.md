# Quest properties

## `id`

- [string]
- required

A unique identifier for the quest. Ensure that these id only exists one time only. The id is used to
identify the quest in the config file and for internal programming things.

> __Important:__ Only `a-zA-Z0-9` and `-_` are allowed.

---

## `name`

- [string]
- required

The name of the quest. It will be shown in the prompt and quest dialog.

---

## `description`

- [string]
- [optional]
- default `nil`

An internal description for the quest, e.g. like notes for the quest writers. It is currently not used and shown
anywhere.

---

## `max_solves`

- [number]
  -required

A positive number limits the times a quest can be solved. A value of `0` means that the quest can be solved infinite
times.

---

## `restart_delay_in_seconds`

- [number]
- [optional]
- default `nil`

A positive number (in seconds) adds a delay until the next start of the quest. A value of `0` means no delay.

> Note: Set `max_solves` to `0` to allow infinite solves for daily quests.

---

## `steps`

- [list] of step [table]s
- required

A list of all steps for the quest. The steps are executed in the order they are defined in the list.
See [quest steps properties] for more information.

---

## `show_previous_step_in_quest_log`

- [boolean]
- [optional]
- default `false`

Defines if not the current step of the quest should be shown in the quest dialog, but the step before.

---

## `restricted_to_jobs`

- [table]
- [optional]
- default `nil`
- New since version 1.4.0

Defines if the current quest is only available for the given jobs. The job names must be the same as in
the `vorp_inventory.jobs` table (case-sensitive).

Example:

```lua
MyDemoQuest = {
    -- ... other properties
    restricted_to_jobs = {
        ["hunter"] = 1, -- Job "hunter" of minimum grade 1 or higher is allowed to use this quest.
        ["farmer"] = 3, -- Job "farmer" of minimum grade 3 or higher is allowed to use this quest.
        ["driver"] = 0, -- Job "driver" of all grades is allowed to use this quest.
    },

}
```

> __Important:__<br>
> If the `blacklisted_jobs` property is set then ensure that there are no conflicts with
> the `restricted_to_jobs`. The `restricted_to_jobs` is better used if there are no `blacklisted_jobs` set.

---

## `blacklisted_jobs`

- [table]
- [optional]
- default `nil`
- New since version 1.5.0

Defines if the current quest is available for all jobs except the given ones. The job names must be the same as in
the `vorp_inventory.jobs` table (case-sensitive).

Example:

```lua
MyDemoQuest = {
    -- ... other properties
    blacklisted_jobs = {
        ["hunter"] = 1, -- Job "hunter" of minimum grade 1 or higher is NOT allowed to use this quest.
        ["farmer"] = 3, -- Job "farmer" of minimum grade 3 or higher is NOT allowed to use this quest.
        ["driver"] = 0, -- Job "driver" of all grades is NOT allowed to use this quest.
    },
    -- ... other properties
}
```

> __Important:__<br>
> If the `restricted_to_jobs` property is set then ensure that there are no conflicts with
> the `blacklisted_jobs`. The `blacklisted_jobs` is better used if there are no `restricted_to_jobs` set.

---

## `in_game_time_windows`

- [table]
- [optional]
- default `nil`
- New since version 1.6.0

Defines time windows for the availability of quests.

> __Note:__<br />
> The time windows are based on the in-game time and not the real time.

> __Note:__<br />
> The time windows of a quest apply to each step. Example: If a quest is available from 8:00 to 12:00 then each
> step of the quest is only available (can be started/finished) in this time window.

Example of multiple time windows each day:

```lua
MyDemoQuest = {
    -- ... other properties

    -- From 8:00 to 12:00 on Monday and Wednesday
    -- From 14:00 to 18:00 on Monday, Tuesday, Wednesday and Thursday
    in_game_time_windows = {
        {
            start_hour = 14,
            start_minute = 0,
            end_hour = 18,
            end_minute = 0,
            days = {
                tuesday = true,
                thursday = true,
            },
        },

        {
            start_hour = 8,
            start_minute = 0,
            end_hour = 12,
            end_minute = 0,
            days = {
                monday = true,
                wednesday = true,
            },
        },

        {
            start_hour = 14,
            start_minute = 0,
            end_hour = 18,
            end_minute = 0,
            days = {
                monday = true,
                wednesday = true,
            },
        },
    },

    -- ... other properties
}
```

Example of specific days:

```lua
MyDemoQuest = {
    -- ... other properties

    -- Only on Tuesday and Thursday the whole day
    in_game_time_windows = {
        {
            start_hour = 0,
            start_minute = 0,
            end_hour = 0,
            end_minute = 0,
            days = {
                tuesday = true,
                thursday = true,
            },
        },
    },

    -- ... other properties
}
```

| Attributes     | Type     | Optional   | Default | Description                                                                                                                                                                                                                              |
|----------------|----------|------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `start_hour`   | [number] | required   | -       | The start hour of the time window.                                                                                                                                                                                                       |
| `start_minute` | [number] | required   | -       | The start minute of the time window.                                                                                                                                                                                                     |
| `end_hour`     | [number] | required   | -       | The end hour of the time window.                                                                                                                                                                                                         |
| `end_minute`   | [number] | required   | -       | The end minute of the time window.                                                                                                                                                                                                       |
| `days`         | [table]  | [optional] | `nil`   | A table of days when the time window should be applied. If the table is empty or not set then the time window applies to all days.<br/><br/>Available days: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday` |

> __Important:__<br>
> In contrast to the times (e.g. `start_hour`), the days of the week are in real time and not in in-game time.<br><br>
> The reason for this is firstly that otherwise the script would have to use _weathersync_, and secondly that players
> would otherwise get completely confused if the days of the week in-game were suddenly different from those in the real
> world. The time, on the other hand, is bound in-game, as some servers run the time in-game many times faster than in
> reality.

Example of simple time window:

```lua
in_game_time_windows = {
    {
        start_hour = 8,
        start_minute = 0,
        end_hour = 12,
        end_minute = 0,
    },
}
```

Example of time window with specific days:

```lua
in_game_time_windows = {
    {
        start_hour = 8,
        start_minute = 0,
        end_hour = 12,
        end_minute = 0,
        days = {
            monday = true,
            wednesday = true,
        },
    },
}
```

---

[quest steps properties]: STEPS.md

[optional]: README.md#what-means-optional-for-attributes

[table]: README.md#table

[string]: README.md#string

[number]: README.md#number

[boolean]: README.md#boolean

[list]: README.md#list

[function]: README.md#function