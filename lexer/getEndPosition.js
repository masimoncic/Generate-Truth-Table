function getEndPosition (position, buf) {
  //loop through the string, starting at position, and find the position of the next logical symbol
  let logicalSymbolsSingle = ['~', '&', '|', '(', ')'];
  let logicalSymbolsDouble = ['-', '='];
  let endPosition = 1
  while(endPosition < buf.length) {
    //console.log(endPosition, buf[endPosition], buf[endPosition + 1])
    if (logicalSymbolsSingle.includes(buf[endPosition])) {
      return endPosition -1 + position;
    } else if (logicalSymbolsDouble.includes(buf[endPosition])) {
      if(buf[endPosition] === '=') {
        if(buf[endPosition + 1] === '=') {
          return endPosition -1 + position;
        } else {
          endPosition ++;
        }
      } else {
        //must === -
        if(buf[endPosition +1] === '>') {
          return endPosition -1 + position;
        } else {
          endPosition ++;
        }
      }
    } else {
      endPosition ++;
    }
  }
  return endPosition -1 + position;
}

module.exports = {
  getEndPosition
}