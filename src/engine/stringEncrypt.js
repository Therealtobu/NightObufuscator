module.exports = function(ast){

  const pool = [];

  function walk(node){
    if(!node) return;

    if(node.type === "StringLiteral"){
      const index = pool.length;
      pool.push(node.value);

      node.type = "CallExpression";
      node.base = {type:"Identifier",name:"_s"};
      node.arguments=[{type:"NumericLiteral",value:index}];
    }

    for(let k in node){
      if(typeof node[k]==="object"){
        walk(node[k]);
      }
    }
  }

  walk(ast);

  if(pool.length>0){
    ast.body.unshift({
      type:"LocalStatement",
      variables:[{type:"Identifier",name:"_pool"}],
      init:[{
        type:"TableConstructorExpression",
        fields: pool.map(str=>({
          type:"TableValue",
          value:{type:"StringLiteral",value:str,raw:`"${str}"`}
        }))
      }]
    });

    ast.body.unshift({
      type:"FunctionDeclaration",
      identifier:{type:"Identifier",name:"_s"},
      isLocal:true,
      parameters:[{type:"Identifier",name:"i"}],
      body:[{
        type:"ReturnStatement",
        arguments:[{
          type:"IndexExpression",
          base:{type:"Identifier",name:"_pool"},
          index:{
            type:"BinaryExpression",
            operator:"+",
            left:{type:"Identifier",name:"i"},
            right:{type:"NumericLiteral",value:1}
          }
        }]
      }]
    });
  }
};
