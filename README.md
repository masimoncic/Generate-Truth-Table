# generate truth table

Accepts an array of strings and returns an array representing a truth table.  
Symbols: 
'~': negation,
'&': conjunction,
'|': disjunction,
'->': conditional,
'==': biconditional

All other values are read as a basic proposition.  For example 'a==b' is read as basic propositions  'a' and 'b', joined by '=='.  But 'a=b' is read as a single basic proposition.
Order of operations is assumed left-to-right unless parentheses are used.

The function outputs a 2 dimensional array.  Elements of the main array represent rows, and indices of the subarray correspond to columns.  The top row has the string values of the propositions to be evaluated; all other rows contain truth values. 

