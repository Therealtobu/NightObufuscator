const rename = require("./rename");
const stringEncrypt = require("./stringEncrypt");
const vmCompiler = require("./vmCompiler");
const coreDetector = require("./coreDetector");

module.exports = function(code){

  const ast = require("./parser")(code);

  const core = coreDetector(ast);

  if(core){
    vmCompiler(ast, core);
  }

  rename(ast);
  stringEncrypt(ast);

  const luacodegen = require("luacodegen");
  return "-- Obfuscated\n" + luacodegen.generate(ast);
};
