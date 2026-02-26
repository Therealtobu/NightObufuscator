module.exports = function(ast){

  const runtimeCode = `
local function runVM(code)
  local stack = {}
  local ip = 1

  while ip <= #code do
    local ins = code[ip]
    local op = ins[1]

    if op == 1 then
      table.insert(stack, ins[2])
    elseif op == 2 then
      local b = table.remove(stack)
      local a = table.remove(stack)
      table.insert(stack, a + b)
    elseif op == 3 then
      local b = table.remove(stack)
      local a = table.remove(stack)
      table.insert(stack, a * b)
    elseif op == 4 then
      return table.remove(stack)
    end

    ip += 1
  end
end
`;

  const luaparse = require("luaparse");
  const parsed = luaparse.parse(runtimeCode);

  ast.body = parsed.body.concat(ast.body);
};
