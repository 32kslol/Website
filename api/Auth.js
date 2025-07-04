// Simple key-to-HWID mapping

const script = `
if not game.PlaceId == 70671905624144 then return error("This script is only for Steal a Brainrot (70671905624144)") end

if game.IsLoaded then
    print("Please Reexecute before everything loads.")
end



-- // Bypass
local Old;
Old = hookfunction(coroutine.wrap, function(...) -- this hooks the function coroutine.wrap which i know the anticheat is using with GCViewer
    if not checkcaller() then
        return task.wait(9e9) -- here we checked caller, if the caller isnt the executor we will return task.wait(9e9) which will force the anticheat to wait preveting kicks
    end

    return Old(...) -- if its called by executor we return normal function
end)

local Old; Old = hookfunction(getrenv().getfenv, function(...) -- this is the same but with getfenv, the anticheat uses getfenv and setfenv to hide it self so we just break it so its visible allowing us to do more debug on it
    local Arguments = {...};

    if (not checkcaller()) then
        return task.wait(9e9)
    end;

    return Old(...)
end);
--[[
local OldNameCall;
OldNameCall = hookmetamethod(game, "__namecall", newcclosure(function(self, ...)
    local caller, callmethod, args = checkcaller(), getnamecallmethod(), { ... }
    if getcallingscript() and getcallingscript().ClassName == 'LocalScript' and callmethod == "GetFullName" then
        return nil -- and this is the same the script uses getfullname method so we just break it
    end
    return OldNameCall(self, ...)
end))]]


warn("ran ")
for i,v in pairs(game:GetService("ReplicatedFirst"):GetChildren()) do
    if v:IsA("LocalScript") then
        warn(i,v.Name)
    end
end 


-- // UI
local repo = 'https://raw.githubusercontent.com/violin-suzutsuki/LinoriaLib/main/'
local Library = loadstring(game:HttpGet(repo .. 'Library.lua'))()
local ThemeManager = loadstring(game:HttpGet(repo .. 'addons/ThemeManager.lua'))()
local SaveManager = loadstring(game:HttpGet(repo .. 'addons/SaveManager.lua'))()

local Window = Library:CreateWindow({
    Title = 'Velocity',
    Center = true,
    AutoShow = true,
    TabPadding = 8,
    MenuFadeTime = 0.2
})

-- // Optimization globals
local rgb = Color3.fromRGB
local GetService = game.GetService
local FindFirstChild = game.FindFirstChild
local FindFirstChildOfClass = game.FindFirstChildOfClass
local WaitForChild = game.WaitForChild
local PlaceVersion = game.PlaceVersion

-- // Service
local RunService = cloneref(GetService(game, 'RunService'))
local Players = cloneref(GetService(game, 'Players'))
local LocalPlayer = cloneref(GetService(game, 'Players')).LocalPlayer
local VirtualUser = cloneref(GetService(game, 'VirtualUser'))
local ReplicatedFirst = cloneref(GetService(game, 'ReplicatedFirst'))
local ReplicatedStorage = cloneref(GetService(game, 'ReplicatedStorage'))
local Workspace = cloneref(GetService(game, 'Workspace'))
local Net = FindFirstChild(FindFirstChild(ReplicatedStorage,"Packages"),"Net")
local Camera = FindFirstChild(Workspace,"CurrentCamera") or FindFirstChild(Workspace,"Camera")


-- // Anti-Afk
GetService(game, 'Players').LocalPlayer.Idled:Connect(function()
    VirtualUser:CaptureController()
    VirtualUser:ClickButton2(Vector2.new())
end)


-- // Settings
local ESPSettings = {
    Color = rgb(255, 0, 0),
    NameColor = rgb(255, 255, 255),

}

-- // tables
local ESP = {}



-- // Normal-Globals
local Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait();
local TargetPlayer;
local TargetPlayerBase;
local SpeedConnection;
local SpeedFlag;

local Tabs = {
    Main = Window:AddTab('Main'),
    ['UI Settings'] = Window:AddTab('UI Settings'),
}


local LeftGroupBox = Tabs.Main:AddLeftGroupbox('Main')
local RightGroupBox = Tabs.Main:AddRightGroupbox('Exploits')


-- // Function

















LeftGroupBox:AddSlider('NaN', {
    Text = 'NotUsed',
    Default = 0,
    Min = 0,
    Max = 5,
    Rounding = 1,
    Compact = false,

    Callback = function(Value)
        SpeedFlag = Value
        warn(SpeedFlag)
    end
})


LeftGroupBox:AddToggle('Speed', {
    Text = 'WalkSpeed',
    Default = false, -- Default value (true / false)
    Tooltip = 'Changes your walkspeed ', -- Information shown when you hover over the toggle

    Callback = function(Value)
        print(SpeedFlag)
        if Value and not SpeedConnection then
            SpeedConnection = RunService.RenderStepped:Connect(function()
                if LocalPlayer.Character.Humanoid.MoveDirection.Magnitude > 0 then
                    LocalPlayer.Character.HumanoidRootPart.CFrame = LocalPlayer.Character.HumanoidRootPart.CFrame + LocalPlayer.Character.Humanoid.MoveDirection * SpeedFlag or 0.5
                end
            end)        
        elseif not Value and SpeedConnection then
            SpeedConnection:Disconnect()
            SpeedConnection = nil
        end
        print(Value)
        print(SpeedConnection)
    end
})

--[[
LeftGroupBox:AddToggle('ESP', {
    Text = 'ESP',
    Default = false, -- Default value (true / false)
    Tooltip = 'its just a esp what do u expect', -- Information shown when you hover over the toggle

    Callback = function(Value)
        if Value and not ESPConnection then
            ESPConnection = RunService.RenderStepped:Connect(function()

                for i,v in next, Players:GetPlayers() do
                    if v ~= LocalPlayer and v.Character and FindFirstChild(v.Character,"Humanoid") > 1 and FindFirstChild(v.Character,"HumanoidRootPart") and not ESP[v] then
                        




                    end
                end

            end)        
        elseif not Value and ESPConnection then
            ESPConnection:Disconnect()
            ESPConnection = nil
        end
    end
})
]]

local MyButton = LeftGroupBox:AddButton({
    Text = 'Reset',
    Func = function()
        replicatesignal(LocalPlayer.Kill);
    end,
    DoubleClick = false,
    Tooltip = 'This will kill your character'
})

local MyButton2 = MyButton:AddButton({
    Text = 'NotUsed',
    Func = function()
        print('You clicked a sub button!')
    end,
    DoubleClick = true,
    Tooltip = ''
})



LeftGroupBox:AddDropdown('MyDropdown', {
    Values = { "Iron Slap", "Paintball Gun", "Boogie Bomb", "Slap", "Quantum Cloner", "Rage Table", "Body Swap Potion", "Gold Slap", "Diamond Slap", "Grapple Hook", "Bee Launcher", "Laser Cape", "Flame Slap", "All Seeing Sentry", "Galaxy Slap", "Medusa's Head", "Splatter Slap", "Gravity Coil", "Invisibility Cloak", "Speed Coil", "Rainbowrath Sword", "Nuclear Slap", "Trap", "Glitched Slap", "Taser Gun", "Ruby Slap", "Emerald Slap", "Dark Matter Slap", "Web Slinger", "Coil Combo" },
    Default = 1, 
    Multi = true,

    Text = 'Buy Items',
    Tooltip = 'This will buy items if you have them unlocked',

    Callback = function(Value)
        warn(Value)
        for i,v in pairs(Value) do
            warn(Value)
        end
        if typeof(Value) == 'table' then
            for i,v in pairs(Value) do
                if not FindFirstChild(LocalPlayer.Backpack,v) then
                    game:GetService("ReplicatedStorage"):WaitForChild("Packages"):WaitForChild("Net"):WaitForChild("RF/CoinsShopService/RequestBuy"):InvokeServer(v)
                    --print(v)
                end
            end
        else
            if not FindFirstChild(LocalPlayer.Backpack,Value) then
                game:GetService("ReplicatedStorage"):WaitForChild("Packages"):WaitForChild("Net"):WaitForChild("RF/CoinsShopService/RequestBuy"):InvokeServer(Value)
                --print(Value)
            end
        end
    end
})


RightGroupBox:AddDropdown('TargetDropdown', {
    SpecialType = 'Player',
    Text = 'Target',
    Tooltip = 'This is will select your target.',

    Callback = function(Value)
        print(Value)
        TargetPlayer = Players:FindFirstChild(Value)
    end
})


local VoidButton = RightGroupBox:AddButton({
    Text = 'Void Grapple Exploit',
    Func = function()
        if not TargetPlayer then return end

        LocalPlayer.Character.Humanoid:UnequipTools()
        task.wait(0.1)

        LocalPlayer.Character.Humanoid:EquipTool(FindFirstChild(LocalPlayer.Backpack,"Web Slinger"))
        if (TargetPlayer.Character.HumanoidRootPart) then
            print("blah something about magnitude")

            ReplicatedStorage.Packages.Net["RE/WebSlinger/ShotWeb"]:FireServer(
                CFrame.new(),
                TargetPlayer.Character.HumanoidRootPart,
                LocalPlayer.Character["Web Slinger"].Handle
            )

            LocalPlayer.Character.HumanoidRootPart:WaitForChild("WebAttch", 5)
            task.wait()

            TargetPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(0,-9e25+69,0)
            task.wait(0.215)
            replicatesignal(LocalPlayer.Kill) --
        else
            warn("Something went wrong")
        end
    end,
    DoubleClick = false,
    Tooltip = 'This will trap your target, may trap you too'
})


local StealButton = RightGroupBox:AddButton({
    Text = 'Steal Grapple Exploit',
    Func = function()
        if not TargetPlayer then return end
        print("Searching for friends base.")

        for i,v in next, FindFirstChild(Workspace,"Plots"):GetChildren() do
            if string.find(string.lower(FindFirstChild(v.PlotSign.SurfaceGui.Frame, "TextLabel").Text),string.lower(TargetPlayer.DisplayName)) then
                warn("Found")
                TargetPlayerBase = v;
                print(TargetPlayerBase)
            end
        end

        
        LocalPlayer.Character.Humanoid:UnequipTools()
        task.wait(0.1)

        LocalPlayer.Character.Humanoid:EquipTool(FindFirstChild(LocalPlayer.Backpack,"Web Slinger"))
        if (TargetPlayer.Character.HumanoidRootPart) then

            ReplicatedStorage.Packages.Net["RE/WebSlinger/ShotWeb"]:FireServer(
                CFrame.new(),
                TargetPlayer.Character.HumanoidRootPart,
                LocalPlayer.Character["Web Slinger"].Handle
            )

            LocalPlayer.Character.HumanoidRootPart:WaitForChild("WebAttch", 5)

        
            if TargetPlayer.Character.Humanoid.WalkSpeed > 21 then
                repeat 
                    task.wait()
                    print("Waiting for walkspeed <= 21")

                until TargetPlayer.Character.Humanoid.WalkSpeed <= 21 or not LocalPlayer.Character:FindFirstChild("Web Slinger") or not TargetPlayer or Local
            end

            print("Player most likely stole a brainrot, continuing the script.")


            repeat
                print(TargetPlayerBase)
                TargetPlayer.Character.HumanoidRootPart.CFrame = FindFirstChild(TargetPlayerBase,"DeliveryHitbox").CFrame
                task.wait(0.1)
            until TargetPlayer.Character.Humanoid.WalkSpeed > 21
        else
            warn("Something went wrong")
        end
    end,
    DoubleClick = false,
    Tooltip = 'This will help you steal'
})


local BoogieButton = RightGroupBox:AddButton({
    Text = 'Boogie Exploit',
    Func = function()
        if not TargetPlayer then return end
        
        LocalPlayer.Character.Humanoid:UnequipTools()
        task.wait(0.1)

        LocalPlayer.Character.Humanoid:EquipTool(FindFirstChild(LocalPlayer.Backpack,"Boogie Bomb"))
        FindFirstChild(Net,"RE/BoogieBomb/Throw"):FireServer()
        
        repeat task.wait() until FindFirstChild(Workspace,"Handle") and isnetworkowner(FindFirstChild(Workspace,"Handle"))
        repeat
        FindFirstChild(Workspace,"Handle").CFrame = TargetPlayer.Character.HumanoidRootPart.CFrame
        FindFirstChild(Workspace,"Handle").Velocity = Vector3.new(16000,16000,16000)
        task.wait()
        until not FindFirstChild(Workspace,"Handle")
        
    end,
    DoubleClick = false,
    Tooltip = 'This will help you steal'
})

local TableButton = RightGroupBox:AddButton({
    Text = 'Table Exploit',
    Func = function()
        if not TargetPlayer then return end
        
        LocalPlayer.Character.Humanoid:UnequipTools()
        task.wait(0.1)

        LocalPlayer.Character.Humanoid:EquipTool(FindFirstChild(LocalPlayer.Backpack,"Rage Table"))
        FindFirstChild(Net,"RE/Table/LaunchTable"):FireServer()
        
        repeat task.wait() until FindFirstChild(Workspace,"TableModel") and isnetworkowner(FindFirstChild(Workspace,"TableModel"))
        repeat
        FindFirstChild(Workspace,"TableModel").CFrame = TargetPlayer.Character.HumanoidRootPart.CFrame
        FindFirstChild(Workspace,"TableModel").Velocity = Vector3.new(16000,16000,16000)
        task.wait()
        until not FindFirstChild(Workspace,"TableModel")

    end,
    DoubleClick = false,
    Tooltip = 'This will help you steal'
})


-- // print(isnetworkowner(workspace.Handle))
-- // Table + Boogie bomb exp












local FrameTimer = tick()
local FrameCounter = 0;
local FPS = 60;

local WatermarkConnection = game:GetService('RunService').RenderStepped:Connect(function()
    FrameCounter += 1;

    if (tick() - FrameTimer) >= 1 then
        FPS = FrameCounter;
        FrameTimer = tick();
        FrameCounter = 0;
    end;

    Library:SetWatermark(('Velocity.gg | %s fps | %s'):format(
        math.floor(FPS),
        PlaceVersion

    ));
end);


Library:OnUnload(function()
    WatermarkConnection:Disconnect()

    print('Unloaded!')
    Library.Unloaded = true
end)


local MenuGroup = Tabs['UI Settings']:AddLeftGroupbox('Menu')

MenuGroup:AddButton('Unload', function() Library:Unload() end)
MenuGroup:AddLabel('Menu bind'):AddKeyPicker('MenuKeybind', { Default = 'End', NoUI = true, Text = 'Menu keybind' })
MenuGroup:AddToggle('WatermarkT', {
    Text = 'Watermark',
    Default = true, -- Default value (true / false)
    Tooltip = 'Toggles the watermark', -- Information shown when you hover over the toggle

    Callback = function(Value)
        Library.Watermark.Visible = Value;
    end
})

MenuGroup:AddToggle('KeybindFrameT', {
    Text = 'Keybind',
    Default = false, -- Default value (true / false)
    Tooltip = 'Toggles the KeybindFrame', -- Information shown when you hover over the toggle

    Callback = function(Value)
        Library.KeybindFrame.Visible = Value;
    end
})

Library.ToggleKeybind = Options.MenuKeybind
ThemeManager:SetLibrary(Library)
SaveManager:SetLibrary(Library)
SaveManager:IgnoreThemeSettings()
SaveManager:SetIgnoreIndexes({ 'MenuKeybind' })
ThemeManager:SetFolder('Velocity')
SaveManager:SetFolder('Velocity/SABR')
SaveManager:BuildConfigSection(Tabs['UI Settings'])
ThemeManager:ApplyToTab(Tabs['UI Settings'])
SaveManager:LoadAutoloadConfig()



--[[
for i,v in next, game:GetService("Workspace").MovingAnimals:GetChildren() do
    if v:IsA("Model") and v:GetAttribute("Index") == 'Noobini Pizzanini' then
        error("Found Target")
    end
end
]]
`;









const keyDatabase = {
  'aP7xK9vRqT2mF1Hz': 'HWID-1111',
  'KEY-5678': 'HWID-2222',
  'KEY-ABCD': 'HWID-3333'
};

export default function handler(req, res) {
  const { key, hwid } = req.query;

  // Check if key and hwid were provided
  if (!key || !hwid) {
    return res.status(400).json({
      success: false,
      message: 'Missing key or hwid'
    });
  }

  // Check if key exists
  const expectedHWID = keyDatabase[key];
  if (!expectedHWID) {
     return res.status(403).send('error("32ks.lol -> Invalid Key!")'); 
  }

  // Check if HWID matches
  if (expectedHWID !== hwid) {
    return res.status(403).send('error("32ks.lol -> Hwid Mismatch!")');
  }

  // ✅ Valid
  return res.status(200).send(script);
}
