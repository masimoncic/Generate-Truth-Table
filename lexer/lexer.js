const { getToken } = require('./getToken');

function lexer(str) {
  let tokenArray = [];
  let position = 0;
  while (position < str.length) {
    let tokenAndLength = getToken(position, str);
    let { token, endPosition } = tokenAndLength;
    position = endPosition + 1;
    tokenArray.push(token);
  }
  return tokenArray;
}

module.exports = {
  lexer
}