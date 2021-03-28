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

//we will read tokens to create a tree structure representing the operations to be performed
//for binary operations, the right and left nodes will represent the first and second operands
//for unary operations(negation), the right node will be the negated proposition, the left will be null
//'GROUPING' is used for intermediary nodes in which we need to remove the outermost parentheses

function parseTokens (str) {
  let tokenArray = lexer(str);
  let head = new Node('BINARY', tokenArray);
  let pairs = pairParentheses(str);
  binary(head, pairs);
  return head;
}
    

function binary(node, pairs) {
  //recursively loop over the tokens, find all of type "BINARY", and create a node to represent the binary operation
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
      //find the index of the token corresponding to the left parenthesis that pairs with the current token
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
      //if the token's name is a binary operation, create left and right nodes
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
    //if found, then nodes have been created; we recursively call binary on them
    binary(node.left, pairs);
    binary(node.right, pairs);
  }
  else {
    //if not found, the operation is not binary, so we pass it to the next function
    unary(node, pairs);
  }
  return node;
}

function unary(node, pairs) {
  //check if the first token is NEGATION; if so, create a right node and recursively call unary on it
  if (node.tokens[0].name === 'NEGATION'){
    let right = new Node('UNARY', node.tokens.slice(1));
    node.operation = 'NEGATION';
    node.right = right;
    node.type = 'UNARY';
    unary(right, pairs);
  } else {
    //if not, then the operation is not negation, so we pass it to the next function
    grouping(node, pairs);
  }
  return node;
}

function grouping(node, pairs) {
  if (node.tokens.length === 1) {
    //if there is only one token, it must be a proposition, so we end the recursive call
    node.type = "PROPOSITION";
    return node;
  } else if (node.tokens[0].name === 'L_PARENTHESIS') {
    //check if the node is a parenthesis; if so, find the corresponding right parenthesis and make a node with the contents between the two parentheses
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
    //if the token is neither a grouping or proposition, pass it back in to binary
    node.type = "BINARY";
    binary(node, pairs);
  }
  return node;
}




module.exports = {
  parseTokens
}
