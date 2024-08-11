---@class NssLibsInventoryItem
---@field id number
---@field internal_name string
---@field label string
---@field limit number
---@field can_remove boolean
---@field type string
---@field usable boolean
---@field desc string
---@field metadata table
---@field image string

---@class NssLibsInventoryUserInventoryItem
---@field type string
---@field limit number
---@field label string
---@field count number
---@field id number
---@field usable boolean
---@field metadata table<string,any>
---@field internal_name string
---@field image string

---@class NssLibsInventoryUserWeapon
---@field id number
---@field name string
---@field propietary string
---@field ammo table<string,number>
---@field used boolean
---@field image string
---@field internal_id string

---@class NssLibsExistItemItem
---@field name string
---@field qty number
---@field metadata table|nil

---@class NssLibsItemMoveToCustomInvData
---@field number number
---@field type string
---@field item NssLibsInventoryItem
---@field id string

---@class NssLibsItemMoveToBankInvData
---@field number number
---@field type string
---@field item NssLibsInventoryItem
---@field bank string

---@alias NssLibsInventoryVorpMoveToCustomInvCallback fun(source:number, data:NssLibsItemMoveToCustomInvData):void
---@alias NssLibsInventoryVorpMoveToBankInvCallback fun(source:number, data:NssLibsItemMoveToBankInvData):void

---@alias NssLibsInventoryVorpTakeFromCustomInvCallback fun(source:number, data:NssLibsItemMoveToCustomInvData):void
---@alias NssLibsInventoryVorpTakeFromBankInvCallback fun(source:number, data:NssLibsItemMoveToBankInvData):void

---@alias NssLibsInventoryVorpOpenCustomInvCallback fun(source:number, custom_inv_name:string, custom_inv_id:number , custom_inv_capacity:number):void
---@alias NssLibsInventoryVorpOpenBankInvCallback fun(source:number, bank_name:string):void

---@alias NssLibsInventoryNamedItemList table<string, NssLibsInventoryItem>

---@alias NssLibsInventoryNamedUserInventoryItemList table<string, NssLibsInventoryUserInventoryItem>

---@alias NssLibsInventoryNamedUserWeaponList table<string, NssLibsInventoryUserWeapon>

---@alias NssLibsInventoryUsableItemCallback fun(source:number, item_name:string, metadata:table|nil, item_id:number|nil, crafted_item_id:number|nil, label:string|nil):void

---@alias NssLibsInventoryOnChangeCallback fun(_source:number):void

---@alias NssLibsInventoryAllWeaponImageList table<string, string>

---@class NssLibsInventoryApi
---@field setResourceName fun(resourceName:string):void
---@field existsItem fun(_source:number, item_name:string, required_qty:number|nil):boolean
---@field existsItems fun(_source:number, item_list:NssLibsExistItemItem[]):boolean
---@field getItemCount fun(_source:number, item_name:string):number
---@field subItem fun(_source:number, item_name:string, qty:string, metadata:table|nil):void
---@field subItems fun(_source:number, item_list:NssLibsExistItemItem[]):void
---@field subItemByCraftedId fun(_source:number, crafted_id:number):boolean
---@field addItem fun(_source:number, item_name:string, qty:string, metadata:table|nil):number
---@field addItems fun(_source:number, item_list:NssLibsExistItemItem[]):void
---@field setItemMetadata fun(_source:number, crafted_id:number, metadata:table|nil, amount:number|nil):void
---@field canCarryAdditionalItem fun(_source:number, item_name:string, qty:string):boolean
---@field canCarryAdditionalItems fun(_source:number, item_list:NssLibsExistItemItem[]):boolean
---@field getItemsFromDb fun(_source:number, item_names:string|string[]):NssLibsInventoryNamedItemList
---@field getUserInventory fun(_source:number):NssLibsInventoryNamedUserInventoryItemList|nil
---@field getUserWeapons fun(_source:number):NssLibsInventoryNamedUserInventoryItemList|nil
---@field registerUsableItem fun(item_name:string, callback:NssLibsInventoryUsableItemCallback):void
---@field listenInventoryChange fun(callback:NssLibsInventoryOnChangeCallback):void
---@field existsItemInDb fun(item_name:string):boolean
---@field requireItemsInDb fun(resource_name:string, item_names:string|string[], additional_error_message:string|nil, silent:boolean|nil):boolean
---@field getMoneyImage fun():string
---@field getGoldImage fun():string
---@field getWeaponImage fun(weapon_name:string):string
---@field canCarryWeapon fun(_source:number, weapon_name:string, amount:number):boolean
---@field createWeapon fun(_source:number, weapon_name:string, ammo:table<string, number>|nil, custom_serial:string|nil, custom_label:string|nil, custom_desc:string|nil):void
---@field getWeaponImages fun(weapon_names:string|string[]):NssLibsInventoryAllWeaponImageList
---@field closeInventory fun(player:number):void
---@field onCustomInventoryOpen fun(callback:NssLibsInventoryVorpOpenCustomInvCallback):NssLibsSharedHelperEventHandlerApi
---@field onBankInventoryOpen fun(callback:NssLibsInventoryVorpOpenBankInvCallback):NssLibsSharedHelperEventHandlerApi
---@field onMoveToCustomInventory fun(callback:NssLibsInventoryVorpMoveToCustomInvCallback):NssLibsSharedHelperEventHandlerApi
---@field onMoveToBankInventory fun(callback:NssLibsInventoryVorpMoveToBankInvCallback):NssLibsSharedHelperEventHandlerApi
---@field onTakeFromCustomInventory fun(callback:NssLibsInventoryVorpTakeFromCustomInvCallback):NssLibsSharedHelperEventHandlerApi
---@field onTakeFromBankInventory fun(callback:NssLibsInventoryVorpTakeFromBankInvCallback):NssLibsSharedHelperEventHandlerApi
---@field destroy fun():void
