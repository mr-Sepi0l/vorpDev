# nss_libs - Config Validator

The _config validator_ interface helps you to easily validate your config files by given rule sets.

---

## Example

### server.lua

```lua
-- A demo config
local demo_config = {
    Title = 'Demo Config',
    Description = 'This is a demo config.',
    DemoCount = 12,
    DemoMoney = 100.10,
    DemoObject = {
        a = 1,
        b = 2,
    },
    DemoList = {
        'a',
        'b',
        'c',
    },
    DemoItem = 'coal',
    DemoRadius = 10.2,
    DemoObjectWithChildren = {
        {
            a = 1,
            b = 2,
        },
        {
            a = 1,
            b = 2,
        },
        {
            a = 1,
            b = 2,
        },
    }
}

-- A demo rule set
---@type NssLibsServerConfigValidatorRuleSet
local demo_rule_set = {

    demo_object_rule = {
        type = 'table',
        required = true,
        contains = {
            a = {
                type = 'integer',
                required = true,
            },
            b = {
                type = 'integer',
                required = true,
            },
        }
    },

    config_rule = {

        Title = {
            type = 'string',
            required = true,
            custom_validation = function(value, rule, error_cb)

                if not value and value ~= 'SOMETHING' then
                    error_cb('The value does not contain something.')
                    return false
                end

                return true
            end
        },

        Description = {
            type = 'string',
            required = true,
        },

        DemoCount = {
            type = 'integer',
            required = true,
        },

        DemoMoney = {
            type = 'number',
            required = true,
        },

        DemoObject = {
            type = 'table',
            required = true,
            contains = 'demo_object_rule',
        },

        DemoList = {
            type = 'table',
            required = true,
            array = true,
        },

        DemoItem = {
            type = 'item',
            required = true,
        },

        DemoRadius = {
            type = 'float',
            required = true,
        },

        DemoObjectWithChildren = {
            type = 'table',
            required = true,
            array = true,
            contains = 'demo_object_rule',
        },
    }
}

-- Getting the api
---@type NssLibsServerConfigValidatorApi
local config_validator_api = exports.nss_libs:getConfigValidatorApi(GetCurrentResourceName())

-- Creating an instance
---@type NssLibsServerConfigValidatorInstanceApi
local config_validator_api_instance = config_validator_api.create(demo_rule_set)

-- Name of the starting value
local path = 'Config'

local result = config_validator_api_instance:isValid(
        demo_config,
        demo_rule_set.config_rule,
        path
)

print('Result', result)
```

---

## Public interface methods (`NssLibsServerConfigValidatorApi`)

### `.create(rule_set)`

Creates a resource related instance of its api `NssLibsServerConfigValidatorInstanceApi`.

- `rule_set` (_NssLibsServerConfigValidatorRuleSet_) - The rule set for the validator.

Returns `NssLibsServerConfigValidatorInstanceApi` on success otherwise `nil` on invalid rule set.

---

## Public interface methods (`NssLibsServerConfigValidatorApi`)

### `.isValid(value, rule, path)`

Checks the given value (recursive) by the given starting rule and returns `true` if the value is valid.

- `value` (_any_) - The value to check.
- `rule` (_NssLibsServerConfigValidatorRule_) - The (starting) rule to be applied to the value.
- `path` (_string_) - The path to the value (used for error messages), e.g. the name of the value.

Returns `boolean`.

### `.destroy()`

Destroys the instance of the `NssLibsServerConfigValidatorApi` api.

Returns nothing.

---

## Rules in details

### Basic rule object

```lua
local rule = {
    
    -- Optional if `contains` references to another rule name otherwise required.
    --
    -- Possible values:
    -- string - Checks for valid string type.
    -- integer - Checks for valid integer type, e.g. 1 (not 1.0)
    -- float - Checks for valid float type, e.g. 1.0 (not 1)
    -- number - Checks for valid number type, e.g. 1 or 1.0
    -- boolean - Checks for valid boolean type, e.g. true or false
    -- table - Checks for valid table type.
    -- item - Checks if item is a string and exists in database
    -- weapon - Checks if weapon is a string and exists.
    -- function - Checks for valid function type.
    type = 'string',

    -- Optional, works only with `type` set to number, integer and float.
    -- If set checks if the value is greater or equal to the given value.
    min = 1,
    
    -- Optional, works only with `type` set to number, integer and float.
    -- If set checks if the value is less or equal to the given value.
    max = 2,
    
    -- Optional, if set checks if the value is not nil and set to its related `type`.
    required = true,

    -- Optional, if set and the required check fails the validator will use the given message.
    required_message = 'The value is required.',

    -- Optional, if `true` the validator try to walk the related value as an array.
    -- Can not be used together with `associative_array`.
    -- Needs `type` set to `table`.
    array = true,

    -- Optional, if `true` the validator try to walk the related value as an associative array.
    -- Can not be used together with `array`.
    -- Needs `type` set to `table`.
    associative_array = true,
    
    -- Optional.
    -- Only usable if `array` is set to `true` and the items of the array are tables with the related property name.
    -- Shows the content of the property of the array item in the error message instead of the array index.
    -- Helps to identify the error in the config file.
    label = 'PROPERTY_NAME_OF_OBJECT_IN_LIST',
    
    -- Optional, has two different use cases:
    -- 
    -- NAMED RULE
    -- If you it as string with the name of another rule, the validator will apply the named rule to the value, too.
    -- If the `type`of the rule is `table` and `array` is set to `true` the validator will apply the named rule to each item of the array.
    -- This is useful if a rule is applicable to multiple properties and defined only once for reusability.
    contains = 'NAME_OF_ANOTHER_RULE',

    -- PROPERTY RULES
    -- If the `type` of the rule is `table` and `array` is set to `false` the validator will apply the rules to its related
    -- named properties.
    -- You can nest the rules as deep as you want.
    contains = {
        PROPERTY_NAME = {
            -- Rule object
        },
        
        NAME_OF_ANOTHER_RULE = {
            -- Rule object
        },
    },

    -- "OR" RULES
    -- A list of named rules and/or property rules.
    -- If one of the rules validates positive the related value is valid.
    contains = { 'NAME_OF_ANOTHER_RULE', 'NAME_OF_ANOTHER_RULE', PROPERTY_RULES_OBJECT, PROPERTY_RULES_OBJECT },

    -- Optional.
    -- The linked property name(s) that have to be set if the value is set.
    -- Works only on the same level of the rule object.
    linked_with_properties = 'PROPERTY_NAME',
    linked_with_properties = { 'PROPERTY_NAME_A', 'PROPERTY_NAME_B' },

    -- Optional.
    -- The property name(s) of properties that has to be lower as the current value.
    -- E.g. if the current value is 10 and the `higher_as_number_properties` properties has to be lower as 10.
    -- Works only on the same level of the rule object.
    higher_as_number_properties = 'PROPERTY_NAME',
    higher_as_number_properties = { 'PROPERTY_NAME_A', 'PROPERTY_NAME_B' },

    -- Optional.
    -- The property name(s) of properties that has to be lower or equal as the current value.
    -- E.g. if the current value is 10 and the `higher_or_equal_as_number_properties` properties has to be lower as or equal 10.
    -- Works only on the same level of the rule object.
    higher_or_equal_as_number_properties = 'PROPERTY_NAME',
    higher_or_equal_as_number_properties = { 'PROPERTY_NAME_A', 'PROPERTY_NAME_B' },
    
    -- Optional.
    -- If set the validator will call the given function with the `value`, the `rule` and an error message callback 
    -- function as arguments.
    -- The validator expects a boolean as return value. If the function returns `false` the validator marks the value 
    -- as invalid.
    custom_validation = function(value, rule, error_cb, parent_rule)

        if not value and value ~= 'SOMETHING' then
            error_cb('The value does not contain something.')
            return false
        end

        return true
    end,

    -- Optional.
    -- If set to true the validator checks if there is no property. This helps to prevent the usage of old properties. 
    does_not_exists = true,
    
    -- Optional.
    -- If set this callback is called before the rule is applied to the value. So it is possible to change the rule
    -- before the validation starts the related value.
    pre_check_rule = function(value, rule, parent_rule)

        if value.type == "money" then
            rule.contains.min.type = 'number'
            rule.contains.max.type = 'number'
            rule.contains.item.required = false
            rule.contains.item.does_not_exists = true
        end

        if value.type == "item" then
            rule.contains.min.type = 'integer'
            rule.contains.max.type = 'integer'
            rule.contains.item.does_not_exists = false
        end

        return rule
    end
}
```

---

## Dev notes

- Nothing ;)