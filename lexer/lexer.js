getEndPosition = require('./getPropLength');

function lexer(str) {

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

  let tokenArray = [];

  let position = 0;
  let buf = str;
  let bufLen = str.length;
  let endposition = 0;

  let c = buf[position];
  let symbol = logicalSymbolsSingle[c];
  let cDouble= buf.slice(position, position + 2);
  let symbolDouble = logicalSymbolsDouble[cPlus];

  if (symbol) {
    let token = {
      name: symbol,
      value: c,
      position: position
    }
  } else if (symbolDouble) {
    let token = {
      name: symbolDouble,
      value: cDouble,
      position: position + 1
    }
  } else {
    endPosition = getEndPosition(position, buf)
    let prop = buf.slice(position, endPosition);
    let token = {
      name: 'PROPOSITION',
      value: prop,
      position: position++,
    }
    let position = endPosition;




    //
    token = {
      name: 'PROPOSITION',
    }
  }

  //tokenArray.push(token);

}




exports.getEndPosition = getEndPosition;
