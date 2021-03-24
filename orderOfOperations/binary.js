const { lexer } = require('../lexer/lexer');


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

let str = 'abc&def&hij&klm&v&j';
let tokenArray = lexer(str);
let head = new Node('BINARY', tokenArray, null);


function binary(node) {
  const binaryNames = [
    'CONJUNCTION',
    'DISJUNCTION',
    'CONDITIONAL',
    'BICONDITIONAL',
  ];
  let tokens = node.tokens;
  let i = tokens.length -1;
  let found = false;
  while(found === false && i >= 0) {
    if (binaryNames.includes(tokens[i].name)) {
      //let leftStr = tokens[i+1].value;
      let leftArr = tokens.slice(0, i);
      let left = new Node('BINARY', leftArr, null);
      node.left = left;
      //let rightStr = str.slice(position + 1);
      let rightArr = tokens.slice(i + 1);
      let right = new Node('BINARY', rightArr, null);
      node.right = right;
      node.operation = tokens[i].name;
      found = true;
    } else {
      i --;
    }
  }
  if (found) {
    binary(node.left);
  }
}

binary(head);
console.log(head.left.left.left.left);