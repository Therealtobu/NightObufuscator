-- modules/watermark.lua
local Watermark = {}

function Watermark.process(code)
    return "[Night]" .. code
end

return Watermark
