local CharakterSelected = false
local IsLoadingScreenStartet = false
local SaltyChatStatus = 0

-- Event Handler
RegisterNetEvent('vorp:SelectedCharacter')
AddEventHandler('vorp:SelectedCharacter', function()
    Citizen.Wait(Config.CharSelected)
    CharakterSelected = true
end)

-- Main thread
Citizen.CreateThread(function()
    -- Wait for CharacterSelected to be set to true
    while not CharakterSelected do
        Citizen.Wait(Config.WaitBeforeCheck)
    end

    -- Main loop
    while CharakterSelected do
        SaltyChatStatus = exports.saltychat:GetPluginState()
        if SaltyChatStatus == Config.IngameSaltyStatus then
            if Citizen.InvokeNative(0xB54ADBE65D528FCB) then
                ShutdownLoadingScreen()
                IsLoadingScreenStartet = false
            end
        else
            if not IsLoadingScreenStartet then
                print("You are not in the Teamspeak InGame Channel")
                Citizen.InvokeNative(0x1E5B70E53DB661E5, 0, 0, 0, Config.ScreenText1, Config.ScreenText2, Config.ScreenText3)
                IsLoadingScreenStartet = true
            end
        end
        Citizen.Wait(Config.LoopWaitTime)
    end
end)
