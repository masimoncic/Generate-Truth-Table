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


  let numProps = basic.length;
  let numRows = 2 ** numProps;
  for (i = 0; i < numRows; i++) {
    let row = [];
    for (j = 0; j < numProps; j++) {
      //fill basic propositon columns
      //get the value of each proposition
      let n = 2 ** (numProps - j);
      let r = i % n
      if (r >= n/2) {
        row[j] = false;
      } else {
        row[j] = true;
      }
    }
    //fill complex proposition columns
    for (j = 0; j < complex.length; j++) {
      //get the column numbers of the operands from topRow
      let index1 = 0;
      let index2 = 0;
      for (k = 0; k < topRow.length; k++) {
        if(topRow[k] === complex[j].operand1) {
          index1 = k;
        } else if (`(${topRow[k]})` === complex[j].operand1) {
          index1 = k;
        }
      }
      if (complex[j].operation !== 'NEGATION') {
        for (k = 0; k < topRow.length; k++) {
          if(topRow[k] === complex[j].operand2) {
            index2 = k;
          } else if (`(${topRow[k]})` === complex[j].operand2) {
            index2 = k;
          }
        }
      } 
      //evaluate
      if(complex[j].operation === 'NEGATION') {
        row[j + basic.length] = !row[index1];
      } else if (complex[j].operation === 'CONJUNCTION') {
        row[j + basic.length] = row[index1] && row[index2];
      } else if (complex[j].operation === 'DISJUNCTION') {
        row[j + basic.length] = row[index1] || row[index2];
      } else if (complex[j].operation === 'CONDITIONAL') {
        if (row[index1] === true && row[index2] === false) {
          row[j + basic.length] = false;
        } else row[j + basic.length] = true;
      } else if (complex[j].operation === 'BICONDITIONAL') {
        if (row[index1] === row[index2]) {
          row[j + basic.length] = true;
        } else {
          row[j + basic.length] = false;
        }
      }

    }
    table[i +1] = row;
  }
  console.log(table);
}

module.exports = {
  
}

//generateTruthTable('a&(b==c)')


/*
function makeTable(array) {
  var table = document.createElement('table');
  for (var i = 0; i < array.length; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < array[i].length; j++) {
          var cell = document.createElement('td');
          cell.textContent = array[i][j];
          row.appendChild(cell);
      }
      table.appendChild(row);
  }
  return table;
}
*/
