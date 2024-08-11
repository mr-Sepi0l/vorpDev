---@alias NssLibsServerConfigValidatorResult boolean
---@alias NssLibsServerConfigValidatorFieldName string
---@alias NssLibsServerConfigValidatorRuleSet table<NssLibsServerConfigValidatorFieldName, NssLibsServerConfigValidatorRule>
---@alias NssLibsServerConfigValidatorRuleName string
---@alias NssLibsServerConfigValidatorCustomValidationFunction fun(value: any, rule:NssLibsServerConfigValidatorRule, error_cb:fun(message:string)): NssLibsServerConfigValidatorResult
---@alias NssLibsServerConfigValidatorContains NssLibsServerConfigValidatorRuleName|NssLibsServerConfigValidatorRuleSet|nil
---@alias NssLibsServerConfigValidatorWeaponsRaw string[]
---@alias NssLibsServerConfigValidatorWeapons table<string, boolean>
---
---@class NssLibsServerConfigValidator
---@field rules NssLibsServerConfigValidatorRuleSet
---@field resource_name string
---@field inventory NssLibsInventoryApi
---@field items_cache table<string, boolean>
---@field self_validation_rules NssLibsServerConfigValidatorRuleSet
---@field suppressed_errors string[]
---@field suppressed_depth number

---@class NssLibsServerConfigValidatorRule
---@field _value any
---@field pre_check_rule nil|fun(value: any, rule: NssLibsServerConfigValidatorRule, parent_rule: NssLibsServerConfigValidatorRule): NssLibsServerConfigValidatorRule
---@field type string
---@field required boolean|nil
---@field array boolean|nil
---@field associative_array boolean|nil
---@field contains NssLibsServerConfigValidatorContains
---@field min number|nil
---@field max number|nil
---@field linked_with_properties NssLibsServerConfigValidatorLinkedWithProperties|nil
---@field higher_as_number_properties NssLibsServerConfigValidatorHigherAsNumberProperties|nil
---@field higher_or_equal_as_number_properties NssLibsServerConfigValidatorHigherOrEqualAsNumberProperties|nil
---@field does_not_exists boolean|nil
---@field custom_validation NssLibsServerConfigValidatorCustomValidationFunction|nil

---@class NssLibsServerConfigValidatorApi
---@field createInstance fun(ruleset: NssLibsServerConfigValidatorRuleSet): NssLibsServerConfigValidatorInstanceApi

---@class NssLibsServerConfigValidatorInstanceApi
---@field isValid fun(value: any, rule: NssLibsServerConfigValidatorRule, path: string): NssLibsServerConfigValidatorResult
---@field destroy fun(): void

---@class ServerConfigValidatorWeapons
---@field private _weapons_prepared boolean
---@field private _formatWeaponName fun(weapon_name:string): string
---@field prepareWeapons fun(): void
---@field existsWeapon fun(weapon_name:string): boolean

---@alias NssLibsServerConfigValidatorLinkedWithProperty string
---@alias NssLibsServerConfigValidatorLinkedWithProperties NssLibsServerConfigValidatorLinkedWithProperty[]|NssLibsServerConfigValidatorLinkedWithProperty|nil

---@alias NssLibsServerConfigValidatorHigherAsNumberProperty string
---@alias NssLibsServerConfigValidatorHigherOrEqualAsNumberProperty string
---@alias NssLibsServerConfigValidatorHigherAsNumberProperties NssLibsServerConfigValidatorHigherAsNumberProperty[]|NssLibsServerConfigValidatorHigherAsNumberProperty|nil
---@alias NssLibsServerConfigValidatorHigherOrEqualAsNumberProperties NssLibsServerConfigValidatorHigherOrEqualAsNumberProperty[]|NssLibsServerConfigValidatorHigherOrEqualAsNumberProperty|nil
