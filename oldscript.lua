--[[
				roblox image bypasser
	https://github.com/infinixius/robloximagebypasser

		follow the instructions on the website:
		http://infinixi.us/robloximagebypasser/

		generate an image, and paste the output
		into the INPUT variable below, then run
		the script. make sure to set the output
		to a SurfaceGui or any other gui object
]]--

-- CONFIGURATION

local INPUT = "" -- The exported string from the website
local OUTPUT = script.Parent.SurfaceGui --  The output location
local PRINTWHENDONE = true -- Whether to print debug information when done

-- BEGIN SCRIPT

if INPUT == "" then
	error("Please provide an input.")
end

if not OUTPUT then
	error("Please provide an output.")
end

local blocks = INPUT:split(";")
local imagename
local imagewidth
local imageheight
local imageoffset
local starttime = os.clock()

for i, block in ipairs(blocks) do
	local data = block:split(",")

	if block == "OUTPUTDATA1.0" then continue end
	if block == "END" then return end
	if block:len() == 0 then return end

	if string.sub(block, 1, 5) == "NAME:" then imagename = string.sub(block, 6) continue end
	if string.sub(block, 1, 6) == "WIDTH:" then imagewidth = string.sub(block, 7) continue end
	if string.sub(block, 1, 7) == "HEIGHT:" then imageheight = string.sub(block, 8) continue end
	if string.sub(block, 1, 7) == "OFFSET:" then imageoffset = string.sub(block, 8) continue end

	local x = data[1]
	local y = data[2]

	local width = data[3]
	local height = data[4]

	local r = data[5]
	local g = data[6]
	local b = data[7]
	local a = data[8]

	local pixel = Instance.new("Frame", OUTPUT)
	pixel.Position = UDim2.fromScale(x / imagewidth, y / imageheight)
	pixel.Size = UDim2.fromScale(
		(width / imagewidth) + imageoffset,
		(height / imageheight) + imageoffset
	) -- this really shouldn't work but it does so ¯\_(ツ)_/¯
	pixel.BorderSizePixel = 0
	pixel.BackgroundColor3 = Color3.fromRGB(r, g, b)
	pixel.BackgroundTransparency = (255 - a) / 255
	pixel.ZIndex = 1
end

if PRINTWHENDONE then
	print("FINISHED " .. imagename)
	print("TIME ELAPSED: " .. os.clock() - starttime)
	print("DIMENSIONS: ".. imagewidth .. "x" .. imageheight .. " (" .. imagewidth * imageheight .. " PIXELS)")
	print("FRAMES USED: " .. #OUTPUT:GetChildren())
end