module.exports = function(ast){

  const map = {};

  function rand(){
    return "_" + Math.random().toString(36).slice(2,8);
  }

  function walk(node){
    if(!node) return;

    if(node.type === "LocalStatement"){
      node.variables.forEach(v=>{
        const n = rand();
        map[v.name] = n;
        v.name = n;
      });
    }

    if(node.type === "Identifier" && map[node.name]){
      node.name = map[node.name];
    }

    for(let k in node){
      if(typeof node[k] === "object"){
        walk(node[k]);
      }
    }
  }

  walk(ast);
};
