const { getEndPosition } = require('./getEndPosition');


function getToken (startPosition, buf) {
  let logicalSymbolsSingle = {
    '~' : 'NEGATION',
    '&' : 'CONJUNCTION',
    '|' : 'DISJUNCTION',
    '(' : 'L_PAREN',
    ')' : 'R_PAREN',
  }
  let logicalSymbolsDouble = {
    '->' : 'CONDITIONAL',
    '==' : 'BICONDITIONAL',
  }
  let c = buf[startPosition];
  let symbol = logicalSymbolsSingle[c];
  let cDouble= buf.slice(startPosition, startPosition + 2);
  let symbolDouble = logicalSymbolsDouble[cDouble];

  let token;

  if (symbol) {
    let token = {
      name: symbol,
      value: c,
      position: startPosition
    }
    endPosition = startPosition + 1;
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
    endPosition = getEndPosition(startPosition, buf)
    let prop = buf.slice(startPosition, endPosition);
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