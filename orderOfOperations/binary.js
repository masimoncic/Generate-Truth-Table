const { lexer } = require('../lexer/lexer');

class Node {
  constructor(type, value, tokens) {
    this.type = type,
    this.value = value,
    this.tokens = tokens,
    this.operation = null,
    this.left = null,
    this.right = null
  }
}

let str = 'abc&def&hij&klm&v&j';
let tokenArray = lexer(str);
let head = new Node('BINARY', str, tokenArray, null);


function binary(node) {
  const binaryNames = [
    'CONJUNCTION',
    'DISJUNCTION',
    'CONDITIONAL',
    'BICONDITIONAL',
  ];
  let tokens = node.tokens;
  let i = 0;
  let found = false;
  let str = node.value;
  while(found === false && i < tokens.length) {
    if (binaryNames.includes(tokens[i].name)) {
      let position = tokens[i].position;
      if (i > 0) {
        position -= tokens[i-1].position;
      }
      let leftStr = str.slice(0, position);
      let leftArr = tokens.slice(0, i);
      let left = new Node('BINARY', leftStr, leftArr, null);
      node.left = left;
      let rightStr = str.slice(position + 1);
      let rightArr = tokens.slice(i +1);
      let right = new Node('BINARY', rightStr, rightArr, null);
      node.right = right;
      node.operation = tokens[i].name;
      found = true;
    } else {
      i ++;
    }
  }
  if (found) {
    binary(node.right);
  }
}

binary(head);
console.log(head.right.right.right);