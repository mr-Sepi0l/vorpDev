local ShowVoiceRange = false -- Whether or not the range indicator is shown
local HideAt = -1 -- POSIX timestamp

RegisterNetEvent('SaltyChat_VoiceRangeChanged')
AddEventHandler('SaltyChat_VoiceRangeChanged', function()
    ShowVoiceRange = true
    HideAt = GetCloudTimeAsInt() + SaltyRange.ShowRangeDuration
    Citizen.CreateThread(function()
        while ShowVoiceRange do
            local VoiceRange = exports['saltychat']:GetVoiceRange()
            local CloudTime = GetCloudTimeAsInt();
            local value = GetEntityCoords(PlayerPedId())

            Citizen.InvokeNative(0x2A32FAA57B937173, -1795314153, value.x, value.y, value.z - 1, 0, 0, 0, 0, 0, 0, VoiceRange * 2, VoiceRange * 2, 0.4, SaltyRange.RangeColor.R, SaltyRange.RangeColor.G, SaltyRange.RangeColor.B, SaltyRange.RangeColor.A, 0, 0, 2, 0, 0, 0, 0)

            if CloudTime >= HideAt then
                ShowVoiceRange = false
                HideAt = -1
            end
            
            Wait(0)
        end
    end)
end)