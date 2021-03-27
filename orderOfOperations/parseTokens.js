const { lexer } = require('../lexer/lexer');
const { pairParentheses } = require('../pairParentheses/pairParentheses');

//test!
class Node {
  constructor(type, tokens) {
    this.type = type,
    //this.value = value,
    this.tokens = tokens,
    this.operation = null,
    this.left = null,
    this.right = null
  }
}

function parseTokens (str) {
  let tokenArray = lexer(str);
  let head = new Node('BINARY', tokenArray);
  let pairs = pairParentheses(str);
  binary(head, pairs);
  return head;
}
    

function binary(node, pairs) {
  //need to ignore parens
  const binaryNames = [
    'CONJUNCTION',
    'DISJUNCTION',
    'CONDITIONAL',
    'BICONDITIONAL',
  ];
  let tokens = node.tokens;
  let i = tokens.length -1;
  let found = false;
  while(found === false && i > -1) {

    //skip over parentheses
    if(tokens[i].name === 'R_PARENTHESIS') {
      let rightPosition = tokens[i].position;
      let leftPosition = 0;
      let leftToken = 0;
      for(j = 0; j < pairs.length; j ++) {
        if(pairs[j][1] === rightPosition) {
          leftPosition = pairs[j][0];
          for (k = 0; k < tokens.length; k++) {
            if (tokens[k].position === leftPosition) {
              leftToken = k;
            }
          }
        }
      }
      i = leftToken -1;
    }
    if (i > -1) {
      if (binaryNames.includes(tokens[i].name)) {
        let leftArr = tokens.slice(0, i);
        let left = new Node('BINARY', leftArr);
        node.left = left;
        let rightArr = tokens.slice(i + 1);
        let right = new Node('BINARY', rightArr);
        node.right = right;
        node.operation = tokens[i].name;
        found = true;
      } else {
        i --;
      }
    }
  }
  if (found) {
    binary(node.left, pairs);
    binary(node.right, pairs);
    //console.log(node)
  }
  else {
    unary(node, pairs);
  }
  return node;
}

function unary(node, pairs) {
  if (node.tokens[0].name === 'NEGATION'){
    let right = new Node('UNARY', node.tokens.slice(1));
    node.operation = 'NEGATION';
    node.right = right;
    node.type = 'UNARY';
    unary(right, pairs);
  } else {
    grouping(node, pairs);
  }
  return node;
}

function grouping(node, pairs) {
  console.log(node);
  if (node.tokens.length === 1) {
    node.type = "PROPOSITION";
    return node;
  } else if (node.tokens[0].name === 'L_PARENTHESIS') {
    let startPosition = node.tokens[0].position;
    let endPosition = 0;
    let endToken = 0;
    for (i = 0; i < pairs.length; i++) {
      if (pairs[i][0] === startPosition) {
        endPosition = pairs[i][1];
        for (j = 0; j < node.tokens.length; j ++) {
          if (node.tokens[j].position === endPosition) {
            endToken = j;
          }
        }
      }
    }
    let right = new Node('GROUPING', node.tokens.slice(1, endToken));
    node.right = right;
    node.type = 'GROUPING';
    node.operation = 'PARENTHESES';
    grouping(right, pairs);
  } else {
    node.type = "BINARY";
    binary(node, pairs);
  }
  return node;
}

/*
function eval (root) {
  let order = [];
  function traverse (node) {
    if(node.left) {
      traverse(node.left);
    }
    if(node.right) {
      traverse(node.right);
    }
    let e = [node.tokens, node.operation]; 
    if (!order.includes(e)) {
      order.push(e);
    }
  }

  traverse(root)
  return order;
}

*/

let finish = parseTokens('~(~a&~(b|c))');
console.log(finish);