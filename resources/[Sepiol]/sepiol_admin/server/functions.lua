local VORPcore = exports.vorp_core:GetCore()
Utils = {}

Utils.checkPermissions = function(source, callback)
    local Character = VORPcore.getUser(source).getUsedCharacter
    local UserGroup = Character.group

    if not Character then
        return
    end

    if UserGroup then
        if Config.Groups[UserGroup] then
            if Config.Groups[UserGroup] >= 1 then
                callback(source, UserGroup, Character)
            else
                TriggerClientEvent('vorp:TipBottom', _source, "Tu n'as pas la permission d'utiliser cette commande", 3000)
            end
        end
    end
end

exports("checkPermissions", Utils.checkPermissions);
AddEventHandler('sepiol_admin:checkPermissions',  Utils.checkPermissions)
