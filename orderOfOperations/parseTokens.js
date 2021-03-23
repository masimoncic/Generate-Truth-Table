const { lexer } = require('../lexer/lexer');
const { pairParentheses } = require('../pairParentheses/pairParentheses');

function parse (str) {
  const tokenArray = lexer(str);
  const parenthesisPairs = pairParentheses(str);

  
}