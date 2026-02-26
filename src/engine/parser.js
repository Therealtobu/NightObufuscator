const luaparse = require("luaparse");

module.exports = function(code){
  return luaparse.parse(code, {
    luaVersion: "5.1"
  });
};
