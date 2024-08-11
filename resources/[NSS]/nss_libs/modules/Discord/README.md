# nss_libs - Discord

Creates an API to send messages to a Discord channel.

----------------------------------------------------------------------------

## How to use

__Important:__ The Discord API is (for security reasons) only available on server side.

----------------------------------------------------------------------------

### Simple message example

You can decide if you want to create a Discord API object based only on a webhook url (one hook + multiple players) or
based on a specific player (one hook + one player).

#### One hook + one player

In this case an API object is created for a specific player and avatar image. This API object is used to send messages
in the name of that specific player given in API object creation.

```lua
-- Creates a reusable Discord API object. In this example for the example player "John Doe".
---@type NssLibsDiscordApi
local discord_api = exports.nss_libs:getDiscordApi(
        GetCurrentResourceName(),
        'WEBHOOK_URL',
        'USERNAME_OR_PLAYER_NAME_OR_BOT_NAME', -- E.g. as example the current player name "John Doe"
        'AVATAR_URL'
)

-- Send a message in the name of the example player "John Doe"
discord_api.message('Cheese stinks!')

Citizen.Wait(1000)

-- Send another message in the name of the example player "John Doe"
discord_api.message('Cheese still stinks!')

Citizen.Wait(1000)

-- Special case for method 'message': Alternative webhook URL
-- Send another message in the name of the example player "John Doe" to a different webhook url (but the alternate 
-- webhook url is only used for this message)
discord_api.message('Player loves stinking cheese!', 'ALTERNATE_WEBHOOK_URL')
```

----------------------------------------------------------------------------

#### One webhook + multiple players

```lua
-- Creates a reusable Discord API object.
---@type NssLibsDiscordApi
local discord_api = exports.nss_libs:getDiscordApi(
        GetCurrentResourceName(),
        'WEBHOOK_URL'
)

-- Create a function to simplify sending messages
---@param username string
---@param avatar string
---@param message string
local sendMessage = function(username, avatar, message)
    discord_api.setUsername(username)
    discord_api.setAvatarUrl(avatar)
    discord_api.message(message)
end

sendMessage('John Doe', 'https://example.com/john_doe_avatar.png', 'Cheese stinks!')

Citizen.Wait(1000)

sendMessage('John Doe', 'https://example.com/john_doe_avatar.png', 'Cheese still stinks!')

Citizen.Wait(1000)

sendMessage('Jack Blue', 'https://example.com/jack_blue_avatar.png', 'Cheese still!')
```

Alternatively you can use this code snippet (results in the same but uses request object instead of simplified `message`
method):

```lua
-- Creates a reusable Discord API object.
---@type NssLibsDiscordApi
local discord_api = exports.nss_libs:getDiscordApi(
        GetCurrentResourceName(),
        'WEBHOOK_URL'
)

-- Create a function to simplify sending messages
-- This function uses the request method instead of the simplified message method. The request object is used in later 
-- examples, e.g. for embeds.
---@param username string
---@param avatar string
---@param message string
local sendMessage = function(username, avatar, message)
    local request = discord_api.create(username, avatar, message)
    request.send()
end

sendMessage('John Doe', 'https://example.com/john_doe_avatar.png', 'Cheese stinks!')

Citizen.Wait(1000)

sendMessage('John Doe', 'https://example.com/john_doe_avatar.png', 'Cheese still stinks!')

Citizen.Wait(1000)

sendMessage('Jack Blue', 'https://example.com/jack_blue_avatar.png', 'Cheese still!')
```

----------------------------------------------------------------------------

### Example with modifiable embeds

```lua
-- Creates a reusable Discord API object. In this example for the example player "John Doe".
---@type NssLibsDiscordApi
local discord_api = exports.nss_libs:getDiscordApi(
        GetCurrentResourceName(),
        'WEBHOOK_URL',
        'USERNAME_OR_PLAYER_NAME_OR_BOT_NAME', -- E.g. as example the current player name "John Doe"
        'AVATAR_URL'
)

-- Creates a Discord request object for the example player "John Doe".
---@type NssLibsDiscordRequestApi
local request = discord_api.create()

-- Creates a Discord embed object
---@type NssLibsDiscordRequestEmbedApi
local embed = request.addEmbed()
embed.setTitle('Cheese stinks!')
embed.setColor('#000000')
embed.setDescription('Everyone loves you.')

-- Sends the request
request.send()
```

----------------------------------------------------------------------------

## Commands / Objects

### `exports.nss_libs:getDiscordApi(resource_name, webhook_url, username, avatar_url):NssLibsDiscordApi`

- `resource_name` - The name of the resource that uses the Discord API. This is used to identify the resource in the
  console.
- `webhook_url` - The webhook url of the Discord channel.
- `username` (optional) - The username of the Discord bot or the name of the player that sends the message.
- `avatar_url` (optional) - The avatar url of the Discord bot or the avatar url of the player that sends the message.

Returns a Discord API object `NssLibsDiscordApi`.

----------------------------------------------------------------------------

### `NssLibsDiscordApi`

#### `create(username, avatar_url, message):NssLibsDiscordRequestApi`

- `username` (optional) - The username of the Discord bot or the name of the player that sends the message (overrides
  the username given in `exports.nss_libs:getDiscordApi`).
- `avatar_url` (optional) - The avatar url of the Discord bot or the avatar url of the player that sends the message (
  overrides the avatar url given in `exports.nss_libs:getDiscordApi`).
- `message` (optional) - The message that is later shown in the default message body of the Discord message. Could
  be `nil` if you want to use embeds only.

Returns a request API object `NssLibsDiscordRequestApi`.

#### `message(message, temporary_webhook_url)`

- `message` - The message that is shown in the default message body of the Discord message.
- `temporary_webhook_url` (optional) - The webhook url of the Discord channel (overrides the webhook url given in
  `exports.nss_libs:getDiscordApi`).

#### `setUsername(username)`

- `username` - The username of the Discord bot or the name of the player that sends the message.

#### `setAvatarUrl(avatar_url)`

- `avatar_url` - The avatar url of the Discord bot or the avatar url of the player that sends the message.

#### `setWebhookUrl(webhook_url)`

- `webhook_url` - The webhook url of the Discord channel.

----------------------------------------------------------------------------

### `NssLibsDiscordRequestApi`

#### `setUsername(username)`

- `username` - The username of the Discord bot or the name of the player for that specific request.

#### `setAvatarUrl(avatar_url)`

- `avatar_url` - The avatar url of the Discord bot or the avatar url of the player for that specific request.

#### `setContent(message)`

- `message` - The message that is shown in the default message body of the Discord message for that specific request.

#### `enableTextToSpeech()`

Enables text to speech for that specific request.

#### `addEmbed():NssLibsDiscordRequestEmbedApi`

Adds an embed object to the request and returns it api `NssLibsDiscordRequestEmbedApi`.

#### `send()`

Sends the request.

----------------------------------------------------------------------------

### `NssLibsDiscordRequestEmbedApi`

See [Discord webhook documentation] for more information about the Discord message
embeds.

#### `setTitle(title)`

- `title` - The title of the embed.

#### `setAuthor(name, url, icon_url)`

- `name` - The name of the author.
- `url` (optional) - The url of the author. If name was used, it becomes a hyperlink. 
- `icon_url` (optional) - The icon url of the author.

#### `setDescription(description)`

- `description` - The description (content) of the embed.

#### `setUrl(url)`

- `url` - The url of the embed.

#### `setColor(color)`

- `color` - The color of the embed. Can be a hex color code or a decimal color code.

#### `setImage(url)`

- `url` - The url of the image.

#### `setThumbnail(url)`

- `url` - The url of the thumbnail.

#### `setFooter(text, icon_url)`

- `text` - The text of the footer.
- `icon_url` (optional) - The icon url of the footer.

#### `setTimestamp()`

Sets the timestamp of the embed to the current time.

#### `addField(name, value, inline)`

- `name` - The name of the field.
- `value` - The value of the field.
- `inline` (optional) - If the field should be inline.

----------------------------------------------------------------------------

[Discord webhook documentation]: https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html