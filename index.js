function getEndPosition (startPosition, buf) {
  //loop through the string, starting at position, and find the position of the next logical symbol
  let logicalSymbolsAll = ['~', '&', '|', '(', ')', '-', '='];
  let position = startPosition;
  let endPosition = position + 1;
  while(endPosition < position + buf.length) {
    let d = buf[endPosition];
    if (logicalSymbolsAll.includes(d)) {
      //exlude cases where '-' is not followed by '>', and cases where '=' is not followed by '='
      if(!((d === '-' && buf[endPosition+1] !== '>') || (d === '=' && buf[endPosition+1] !== '='))) {
        return endPosition -1;
      } else {
        endPosition++
      }
    } 
  }
  return endPosition -1;
}

console.log(getEndPosition(0, 'ab==cd'))