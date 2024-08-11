---@class NssLibsSharedHelper
---@field copyThisTo fun(table:table):void
---@field getHashKey fun(name_or_hash:string|number):number
---@field hasTableEntries fun(obj:table):boolean
---@field toFloat fun(value:number):number
---@field toInt fun(value:number):number
---@field round fun(num:number, decimals:number):number
---@field getDecimalCount fun(num:number):number
---@field inlineError fun(message:string, traceback:string|nil)):void
---@field inlineWarning fun(message:string, traceback:string|nil)):void
---@field getEmptyFunction fun():function
---@field strTrim fun(str:string|number):string
---@field strSplit fun(str:string, separator:string, max_times:number):table<string>
---@field isSteamWebApiKeyAvailable fun():boolean
---@field getKeysFromTable fun(tbl:table<string|number, any>):table<string|number>
---@field cleanFunctions fun(obj:any):any
---@field getDayMonthYearFromString fun(str:string, format:string):NssLibsSharedHelperDateObject
---@field escapeMagicChars fun(str:string):string
---@field debouncedClock fun(delay_in_ms:number, cb:function):function
---@field debounced fun(delay_in_ms:number, cb:function):function
---@field isFloat fun(value:any):boolean
---@field isFunction fun(value:any):boolean
---@field isTable fun(value:any):boolean
---@field isTableArray fun(value:any, prevent_cache:boolean|nil):boolean
---@field createThreadSafeMonitor fun(interval_in_ms:number, cb_function:NssLibsSharedHelperMonitorCallback):NssLibsSharedHelperMonitor
---@field unixTimestampToDate fun(unix_timestamp:number):number,number,number,number,number,number (year, month, day, hour, minute, second)
---@field dateToUnixTimestamp fun(year:number, month:number, day:number, hour:number, minute:number, second:number):number
---@field padWithZeros fun(number:number, length:number):string
---@field createResourceEventName fun(resource_name:string, event_name:string):string
---@field isTableEqual fun(a:any, b:any, deep:boolean|nil):boolean
---@field createCallbackApi fun(callback:NssLibsSharedHelperCallbackHandlerCb):NssLibsSharedHelperCallbackHandlerCbApi

---@class NssLibsSharedHelperArray
---@field TYPE_TABLE string
---@field TYPE_ARRAY string
---@field RETURN_IS_ARRAY boolean
---@field RETURN_NO_ARRAY boolean

---@class NssLibsSharedHelperDateObject
---@field year number
---@field month number
---@field day number

---@alias NssLibsSharedHelperMonitorCallback fun():void

---@class NssLibsSharedHelperMonitor
---@field current_thread_id number|nil
---@field interval_in_ms number
---@field cb_function NssLibsSharedHelperMonitorCallback
---@field isRunning fun():boolean
---@field start fun():self
---@field stop fun():self

