const { getPropLength } = require('./getPropLength');

//input full string, and position of the first character of the token
//returns a token with keys name, value, and position; also returns position of the last character of the token

function getToken (startPosition, str) {
  let logicalSymbolsSingle = {
    '~' : 'NEGATION',
    '&' : 'CONJUNCTION',
    '|' : 'DISJUNCTION',
    '(' : 'L_PARENTHESIS',
    ')' : 'R_PARENTHESIS',
  }
  let logicalSymbolsDouble = {
    '->' : 'CONDITIONAL',
    '==' : 'BICONDITIONAL',
  }
  let c = str[startPosition];
  let symbol = logicalSymbolsSingle[c];
  let cDouble= str.slice(startPosition, startPosition + 2);
  let symbolDouble = logicalSymbolsDouble[cDouble];

  if (symbol) {
    let token = {
      name: symbol,
      value: c,
      position: startPosition
    }
    endPosition = startPosition;
    return({ token, endPosition })
  } else if (symbolDouble) {
    let token = {
      name: symbolDouble,
      value: cDouble,
      position: startPosition
    }
    endPosition = startPosition + 1;
    return({ token, endPosition })
  } else {
    let buf = str.slice(startPosition, str.length + 1)
    propLength = getPropLength(buf)
    endPosition = startPosition + propLength
    let prop = str.slice(startPosition, endPosition + 1);
    let token = {
      name: 'PROPOSITION',
      value: prop,
      position: startPosition,
    }
    return({ token, endPosition })
  }
}




module.exports = {
  getToken
}