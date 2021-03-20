
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


function getEndPosition(positon, buf) {
  //loop through the string, starting at position, and find the position of the next logical symbol
  let logicalSymbolsAll = ['~', '&', '|', '(', ')', '-', '='];
  let endPosition = position + 1;
  while(endPosition < buf.length) {
    let d = buf[endPosition];
    if (logicalSyms.includes(d)) {
      //exlude cases where '-' is not followed by '>', and cases where '=' is not followed by '='
      if(!((c === '-' && buf[endPosition+1] !== '>') || (c === '=' && buf[endPosition+1] !== '='))) {
        return endPosition;
      } else {
        endPosition++
      }
    } 
  }
  return endPos;
}

lexer('->ab(@s-d=a==3||->a~b&2d')