---@class NssLibsDiscordRequestData
---@field public username string
---@field public avatar_url string
---@field public content string
---@field public tts boolean
---@field public embeds NssLibsDiscordRequestEmbedData[]

---@class NssLibsDiscordRequestEmbedDataAuthor
---@field public name string
---@field public url string|nil
---@field public icon_url string|nil

---@class NssLibsDiscordRequestEmbedDataImage
---@field public url string

---@class NssLibsDiscordRequestEmbedDataThumbnail
---@field public url string

---@class NssLibsDiscordRequestEmbedDataField
---@field public name string
---@field public value string
---@field public inline boolean|nil

---@class NssLibsDiscordRequestEmbedDataFooter
---@field public text string
---@field public icon_url string|nil

---@class NssLibsDiscordRequestEmbedData
---@field public title string|nil
---@field public author NssLibsDiscordRequestEmbedDataAuthor|nil
---@field public description string|nil
---@field public color number|nil
---@field public url string|nil
---@field public image NssLibsDiscordRequestEmbedDataImage|nil
---@field public thumbnail NssLibsDiscordRequestEmbedDataThumbnail|nil
---@field public footer NssLibsDiscordRequestEmbedDataFooter|nil
---@field public fields NssLibsDiscordRequestEmbedDataField[]|nil
---@field public timestamp string|nil

---@class NssLibsDiscordRequestApi
---@field public setUsername fun(new_username: string)
---@field public setAvatarUrl fun(new_avatar_url: string)
---@field public setContent fun(new_content: string|nil)
---@field public enableTextToSpeech fun()
---@field public send fun(on_response: fun(err:number, text:string, headers:table)|nil)
---@field public addEmbed fun():NssLibsDiscordRequestEmbedApi

---@class NssLibsDiscordRequestEmbedApi
---@field public setTitle fun(new_title: string|nil)
---@field public setAuthor fun(new_name: string, new_url: string|nil, new_icon_url: string|nil)
---@field public setDescription fun(new_description: string|nil)
---@field public setColor fun(new_color: number|nil)
---@field public setUrl fun(new_url: string|nil)
---@field public setImage fun(new_url: string|nil)
---@field public setThumbnail fun(new_url: string|nil)
---@field public setFooter fun(new_text: string, new_icon_url: string|nil)
---@field public addField fun(new_name: string, new_value: string, new_inline: boolean|nil)
---@field public setTimestamp fun(new_timestamp: string|nil)

---@class NssLibsDiscordApi
---@field public create fun(username:string|nil, avatar_url:string|nil, content:string|nil):NssLibsDiscordRequestApi
---@field public setWebhookUrl fun(new_webhook_url:string):void
---@field public setUsername fun(new_username:string):void
---@field public setAvatarUrl fun(new_avatar_url:string):void
---@field public message fun(content:string, alternative_webhook_url:string|nil):void


