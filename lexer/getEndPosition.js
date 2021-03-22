function getEndPosition (startPosition, buf) {
  //loop through the string, starting at position, and find the position of the next logical symbol
  let logicalSymbolsSingle = ['~', '&', '|', '(', ')'];
  let logicalSymbolsDouble = ['-', '='];
  let position = startPosition;
  let endPosition = position + 1;
  while(endPosition < position + buf.length) {
    if (logicalSymbolsSingle.includes(buf[endPosition])) {
      return endPosition -1;
    } else if (logicalSymbolsDouble.includes(buf[endPosition])) {
      if (buf[endPosition + 1] === '>') {
        return endPosition - 1;
      } else {
        endPosition ++;
      }
    } else {
        if(buf[endPosition + 1] === '=') {
          return endPosition -1;
        }
        else {
          endPosition ++;
        }
      }

    
  }
  return endPosition -1;
}

module.exports = {
  getEndPosition
}