local VORPcore = exports.vorp_core:GetCore()

RegisterServerEvent('sepiol_admin:checkPermissions')
AddEventHandler('sepiol_admin:checkPermissions', function()
    local _source = source
    local Character = VORPcore.getUser(_source).getUsedCharacter
    local UserGroup = Character.group

    if not Character then return end

    if Config.Groups[usergroup] then
        if Config.Groups[usergroup] >= 1 then
            TriggerClientEvent("sepiol_admin:OpenMenu", _source, UserGroup)

            TriggerEvent("chat:addSuggestion", "/gm", "Permet de te teleporter à Guarma.", {})
            TriggerEvent("chat:addSuggestion", "/sd", "Permet de te teleporter à Saint-Denis.", {})
        else
            TriggerClientEvent('vorp:TipBottom', _source, "Tu n'as pas la permission d'utiliser cette commande", 3000)
        end
    end
end)
