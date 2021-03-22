function getPropLength (buf) {
  //loop through the string, starting at position, and find the position of the next logical symbol
  let logicalSymbolsSingle = ['~', '&', '|', '(', ')'];
  let logicalSymbolsDouble = ['-', '='];
  let propLength = 1
  while(propLength < buf.length) {
    //console.log(propLength, buf[propLength], buf[propLength + 1])
    if (logicalSymbolsSingle.includes(buf[propLength])) {
      return propLength -1;
    } else if (logicalSymbolsDouble.includes(buf[propLength])) {
      if(buf[propLength] === '=') {
        if(buf[propLength + 1] === '=') {
          return propLength -1;
        } else {
          propLength ++;
        }
      } else {
        //must === -
        if(buf[propLength +1] === '>') {
          return propLength -1;
        } else {
          propLength ++;
        }
      }
    } else {
      propLength ++;
    }
  }
  return propLength -1;
}

module.exports = {
  getPropLength
}