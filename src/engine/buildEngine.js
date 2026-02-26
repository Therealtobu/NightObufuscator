const parse = require("./parser");
const detect = require("./coreDetector");
const vmCompile = require("./vmCompiler");
const vmRuntime = require("./vmRuntime");
const rename = require("./rename");
const stringEncrypt = require("./stringEncrypt");
const luacodegen = require("luacodegen");

module.exports = function(code){

  const ast = parse(code);

  const cores = detect(ast);

  if(cores.length>0){
    vmCompile(ast, cores);
    vmRuntime(ast);
  }

  rename(ast);
  stringEncrypt(ast);

  return "-- OBFUSCATED\n" + luacodegen.generate(ast);
};
