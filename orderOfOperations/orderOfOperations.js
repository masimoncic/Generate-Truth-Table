const { parseTokens } = require('./parseTokens');

function orderOfOperations (str) {
  let head = parseTokens(str);
  let order = [];

  //helper functions
  //concatenate the values of each token into one string;
  function concatTokenValues(arr) {
    let str = '';
    for (i = 0; i < arr.length; i++) {
      str += arr[i].value;
    }
    return str;
  }

  //to remove unwanted parentheses, we skip over nodes of type "GROUPING" before calling concatTokenValues
  function removeParentheses(node) {
    let newNode = node;
    while(newNode.type === 'GROUPING') {
      newNode = newNode.right;
    }
    return newNode;
  }


  let strs = [];
  //read each node of the tree and add an object { operation, operand1, operand2 } to the list
  //operand1 and operand2 are the strings which the operation will be performed on (only binary nodes will have operand2);
  function traverse (node) {
    //store string values to filter out repeats

    if(node.left) {
      traverse(node.left);
    }
    if(node.right) {
      traverse(node.right);
    }
    if (node.type !== 'GROUPING') {
      let e = {
        operation: null,
        operand1: null,
        operand2: null
      };
      if (node.type === 'BINARY') {
        e.operation = node.operation;
        e.operand1 = concatTokenValues(node.left.tokens)
        e.operand2 = concatTokenValues(node.right.tokens);
      } else if(node.type === 'UNARY') {
        e.operation = 'NEGATION';
        e.operand1 = concatTokenValues(node.right.tokens);
      } else if(node.type === 'PROPOSITION') {
        e.operand1 = node.tokens[0].value;
      } 
      

      //get the string value
      let str;
      if (e.operation === 'CONJUNCTION') {
        str = `${e.operand1}&${e.operand2}`;
      } else if (e.operation === 'DISJUNCTION') {
        str = `${e.operand1}|${e.operand2}`;
      } else if (e.operation === 'CONDITIONAL') {
        str = `${e.operand1}->${e.operand2}`;
      } else if (e.operation === 'BICONDITIONAL') {
        str = `${e.operand1}==${e.operand2}`;
      } else if (e.operation === 'NEGATION') {
        str = `~${e.operand1}`;
      } else {
        str = e.operand1;
      }

      e.value = str;
      
      //filter out repeat strings
      let found = false;
      if(strs.length) {
        for (i = 0; i < strs.length; i++) {
          if (strs[i] === str) {
            found = true;
          }
        }
      }
      if (!found) {
        strs.push(str);
        order.push(e);
      }
    }
  }
  traverse(head)
  return order;
}
module.exports = {
  orderOfOperations
}