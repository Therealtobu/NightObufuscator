const encryptBytecode = (bc)=>{
  const KEY = Math.floor(Math.random()*200)+50;
  const encrypted = bc.map(ins => ins.map(x=>x^KEY));
  return { encrypted, KEY };
};

module.exports = function(ast, coreFns){

  coreFns.forEach(fn=>{

    let bytecode = [];

    function walkExpr(node){
      if(node.type === "NumericLiteral"){
        bytecode.push([1,node.value]);
      }

      if(node.type === "BinaryExpression"){
        walkExpr(node.left);
        walkExpr(node.right);

        if(node.operator === "+")
          bytecode.push([2]);
        if(node.operator === "*")
          bytecode.push([3]);
      }
    }

    fn.body.body.forEach(stmt=>{
      if(stmt.type === "ReturnStatement"){
        walkExpr(stmt.arguments[0]);
        bytecode.push([4]); // RETURN
      }
    });

    const {encrypted, KEY} = encryptBytecode(bytecode);

    // Replace function body
    fn.body.body = [{
      type:"ReturnStatement",
      arguments:[{
        type:"CallExpression",
        base:{ type:"Identifier", name:"runVM"},
        arguments:[
          {
            type:"Identifier",
            name: `__BYTECODE_${KEY}`
          }
        ]
      }]
    }];

    // Inject bytecode table at top-level
    ast.body.unshift({
      type:"LocalStatement",
      variables:[{type:"Identifier",name:`__BYTECODE_${KEY}`}],
      init:[{
        type:"TableConstructorExpression",
        fields: encrypted.map(ins=>({
          type:"TableValue",
          value:{
            type:"TableConstructorExpression",
            fields: ins.map(v=>({
              type:"TableValue",
              value:{type:"NumericLiteral",value:v}
            }))
          }
        }))
      }]
    });
  });
};
