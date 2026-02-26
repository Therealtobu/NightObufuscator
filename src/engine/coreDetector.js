module.exports = function(ast){

  let coreFunctions = [];

  function walk(node){
    if(!node) return;

    if(node.type === "FunctionDeclaration"){
      let score = 0;

      function scan(n){
        if(!n) return;

        if(n.type === "BinaryExpression"){
          if(["+","-","*","/","^"].includes(n.operator)){
            score++;
          }
        }

        for(let k in n){
          if(typeof n[k] === "object"){
            scan(n[k]);
          }
        }
      }

      scan(node.body);

      if(score >= 3){
        coreFunctions.push(node);
      }
    }

    for(let k in node){
      if(typeof node[k] === "object"){
        walk(node[k]);
      }
    }
  }

  walk(ast);

  return coreFunctions;
};
