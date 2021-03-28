const { orderOfOperations } = require('./orderOfOperations/orderOfOperations')

function generateTruthTable (str) {
  let order = orderOfOperations(str);
  console.log(order);
  let table = [];
  let basic = [];
  let complex = [];
  //seperate the basic propositions from complex ones
  for (i = 0; i < order.length; i ++) {
    if (order[i].operation) {
      complex.push(order[i]);
    } else {
        basic.push(order[i]);
    }
  }

  //fill out the top row with strings to be evaluated
  let topRow = [];
  for (i = 0; i < basic.length; i++) {
    topRow[i] = basic[i].value;
  }
  for(i = 0; i < complex.length; i++) {
    topRow[i + basic.length] = complex[i].value;
  }
  table[0] = topRow;

  //fill basic propositon columns
  let numProps = basic.length;
  let numRows = 2 ** numProps;
  for (i = 0; i < numRows; i++) {
    let row = [];
    for (j = 0; j < numProps; j++) {
      //get the value of each proposition
      let n = 2 ** (numProps - j);
      let r = i % n
      if (r >= n/2) {
        row[j] = false;
      } else {
        row[j] = true;
      }
    }
    table[i +1] = row;
  }
  //fill complex proposition columns

  console.log(table);
}

generateTruthTable('~a|~(b==~c)')