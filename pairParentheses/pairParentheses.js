function pairParentheses (str) {
  let pairs = [];
  let leftIndices = [];
  let rightIndices = [];
  //create arrays storing the indices of all right and left parenthesis 
  for (let i = 0; i < str.length; i++) {
    if(str[i] === '(') {
      leftIndices.push(i);
    }
    if(str[i] === ')') {
      rightIndices.push(i);
    }
  }
  //if there are not equal numbers of right and left parenthesis, the input is invalid
  if(leftIndices.length !== rightIndices.length) {
    return null;
  }
  //create arrays to keep track of which parentheses have been paired
  let leftPaired  = new Array(leftIndices.length).fill(false);
  let rightPaired = new Array(rightIndices.length).fill(false);
  //group the pairs
  for(let i = 0; i < rightIndices.length; i++) {
    for (let j = leftIndices.length-1; j >= 0; j--) {
      if((leftIndices[j] < rightIndices[i]) && !rightPaired[i] && !leftPaired[j]) {
        pairs.push([leftIndices[j], rightIndices[i]]);
        rightPaired[i] = true;
        leftPaired[j] = true;
      }
    }
  }
  return pairs;
};

module.exports = {
  pairParentheses
}