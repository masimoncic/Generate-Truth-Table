const { lexer } = require('../lexer/lexer');
const { pairParentheses } = require('../pairParentheses/pairParentheses');


//grammar:
/* 
B (U "s" U) *
U ("~" U
   | P)
P prop | "(" 
*/


class Node {
  constructor(value, tokens, operation) {
    this.value = value,
    this.tokens = tokens,
    this.operation = operation,
    this.right = null,
    this.left = null
  }
}


function parse (str) {
  const tokenArray = lexer(str);
  const pairs = pairParentheses(str);

  let binarySymbol = [
    'CONJUNCTION',
    'DISJUNCTION',
    'CONDITIONAL',
    'BICONDITIONAL',
  ];

  let unarySymbol = 'NEGATION';

  let parentheses = [
    'L_PARENTHESIS',
    'R_PARENTHESIS',
  ]

  //grouping

  //head
  head = {
    type: 'BINARY',
    value: str,
    tokens: tokenArray,
    leftChild: null,
    middleChild: null,
    rightChild: null
  }

}

function binary(node) {
  found = false;
  for (i = 0; i < node.tokenArray.length; i++) {
    if(binarySymbols.includes(node.tokenArray[i])) {
      let middle = 
    }
  }
}


function grouping(node, pairs) {
  found = false;
  for (i = 0; i < node.tokenArray.length; i++) {
    if (node.tokenArray[i].value === 'L_PARENTHESIS') {
      let leftPosition = node.tokenArray[i].position;
      let rightPoisition = 0;
      for (i = 0; i < pairs.length; i++) {
        if (pairs[i][0] = leftPosition) {
          rightPoisition = pairs[i][1];
        }
      }
      //make a node
      right = {
        type: 'PARENTHESES',
        value: str.slice(leftPosition, rightPosition + 1),
        leftChild: null,
        middleChild: null,
        rightChild: null,
      }
      left = {
        type: 'GROUPING',
        value: str.slice(leftPosition + 1, rightPosition),
        leftChild: null,
        middleChild: null,
        rightChild: null,
      }
        node.leftChild = left;
        node.rightChild = right;
        found = true;
        grouping(left);
    }
  }
  //if found = false, there were no parentheses, so we call the next function
  if (!found) {
    node.type = 'BINARY';
    binary(node);
  }
}

//oops, grouping needs to be below unary

function findPair(n, pairs) {
  for (i = 0; i < pairs.length; i++) {
    if (pairs[i][0] = n) {
      return pairs[i][1];
    }
  }
}


