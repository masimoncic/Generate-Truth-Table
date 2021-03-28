const assert = require('assert');
const { getPropLength } = require('../lexer/getPropLength');
const { getToken } = require('../lexer/getToken');
const { lexer } = require('../lexer/lexer');
const { pairParentheses } = require('../pairParentheses/pairParentheses');
const { orderOfOperations } = require('../orderOfOperations/orderOfOperations')

describe('lexer and helper functions', function () {
  describe('getPropLength', function() {
    it('(0, "ab&cd")', function () {
      assert.strictEqual(getPropLength('ab&cd'), 1)
    })
    it('(0, "ab->cd")', function () {
      assert.strictEqual(getPropLength('ab->cd'), 1)
    })
    it('(0, "ab==cd")', function () {
      assert.strictEqual(getPropLength('ab==cd'), 1)
    })
    it('(0, "ab->cd&f")', function () {
      assert.strictEqual(getPropLength('ab->cd&f'), 1)
    })
    it('(0, "ab>cd|efg")', function () {
      assert.strictEqual(getPropLength('ab>cd|efg'), 4)
    })
    it('(0, "abcdasa")', function () {
      assert.strictEqual(getPropLength('abcdasa'), 6)
    })
  })
  
  
  describe('getToken', function() {
    describe('symbols', function () {
      it('single', function () {
        assert.deepStrictEqual(getToken(0, '&asdfg'), {
          token: {
            name: 'CONJUNCTION',
            value: '&',
            position: 0
          },
          endPosition: 0
        })
      })
      it('single, non-zero position', function () {
        assert.deepStrictEqual(getToken(3, 'asd)fg'), {
          token: {
            name: 'R_PARENTHESIS',
            value: ')',
            position: 3
          },
          endPosition: 3
        })
      })
      it('double', function () {
        assert.deepStrictEqual(getToken(0, '==asdf'), {
          token: {
            name: 'BICONDITIONAL',
            value: '==',
            position: 0
          },
          endPosition: 1
        })
      })
      it('double, non-zero position', function () {
        assert.deepStrictEqual(getToken(2, 'as->dfg'), {
          token: {
            name: 'CONDITIONAL',
            value: '->',
            position: 2
          },
          endPosition: 3
        })
      })
  
    })
  
    describe('propositions', function() {
      it('basic proposition', function () {
        assert.deepStrictEqual(
          getToken(0, 'asdfgh'), {
            token: {
              name: 'PROPOSITION',
              value: 'asdfgh',
              position: 0,
            },
            endPosition: 5
          } 
        )
      })
      it('non-zero position', function () {
        assert.deepStrictEqual(
          getToken(2, 'asdfgh'), {
            token: {
              name: 'PROPOSITION',
              value: 'dfgh',
              position: 2,
            },
            endPosition: 5
          } 
        )
      })
      it('stop at symbol', function () {
        assert.deepStrictEqual(
          getToken(0, 'asd&fgh'), {
            token: {
              name: 'PROPOSITION',
              value: 'asd',
              position: 0,
            },
            endPosition: 2
          } 
        )
      })
      it('stop at symbol, non-zero position', function () {
        assert.deepStrictEqual(
          getToken(4, 'a&sdfghj&kl'), {
            token: {
              name: 'PROPOSITION',
              value: 'fghj',
              position: 4,
            },
            endPosition: 7
          } 
        )
      })
    })
  
  })
  
  describe('lexer', function () {
    it('abc&def', function () {
      assert.deepStrictEqual(
        lexer('abc&def'), [
          {
            name: 'PROPOSITION',
            value: 'abc',
            position: 0
          },
          {
            name: 'CONJUNCTION',
            value: '&',
            position: 3
          },
          {
            name: 'PROPOSITION',
            value: 'def',
            position: 4
          }
        ]
      )
    })
    it('~(a|b-c==de>=>efg->h)', function() {
      assert.deepStrictEqual(
        lexer('~(a|b-c==de>=>efg->h)'), [
          {
            name: 'NEGATION',
            value: '~',
            position: 0
          },
          {
            name: 'L_PARENTHESIS',
            value: '(',
            position: 1
          },
          {
            name: 'PROPOSITION',
            value: 'a',
            position: 2
          },
          {
            name: 'DISJUNCTION',
            value: '|',
            position: 3
          },
          {
            name: 'PROPOSITION',
            value: 'b-c',
            position: 4
          },
          {
            name: 'BICONDITIONAL',
            value: '==',
            position: 7
          },
          {
            name: 'PROPOSITION',
            value: 'de>=>efg',
            position: 9
          },
          {
            name: 'CONDITIONAL',
            value: '->',
            position: 17
          },
          {
            name: 'PROPOSITION',
            value: 'h',
            position: 19
          },
          {
            name: 'R_PARENTHESIS',
            value: ')',
            position: 20
          }
        ]
      )
    })
  })
})

describe('pairParentheses', function () {
  it('(((x)x)x)', function() {
    assert.deepStrictEqual(pairParentheses('(((x)x)x)'), [
      [2, 4],
      [1, 6],
      [0, 8]
    ])
  })
  it('x(x)x(x(x))', function () {
    assert.deepStrictEqual(pairParentheses('x(x)x(x(x))'), [
      [1, 3],
      [7,9],
      [5, 10]
    ])
  })
  it('unequal parentheses', function() {
    assert.strictEqual(pairParentheses('((x)'), null)
  })
})

describe('orderOfOperations', function () {
  it('~a|~(b==~c)', function() {
    assert.deepStrictEqual(orderOfOperations('~a|~(b==~c)'), [
      {operation: null, operand1: 'a', operand2: null, value: 'a'},
      {operation: 'NEGATION', operand1: 'a', operand2: null, value: '~a'},
      {operation: null, operand1: 'b', operand2: null, value: 'b'},
      {operation: null, operand1: 'c', operand2: null, value: 'c'},
      {operation: 'NEGATION', operand1: 'c', operand2: null, value: '~c'},
      {operation: 'BICONDITIONAL', operand1: 'b', operand2: '~c', value: 'b==~c'},
      {operation: 'NEGATION', operand1: '(b==~c)', operand2: null, value :'~(b==~c)'},
      {operation: 'DISJUNCTION', operand1: '~a', operand2: '~(b==~c)', value :'~a|~(b==~c)'}
    ])
  })
  it('ab->(cde->(fgh->ijk))', function() {
    assert.deepStrictEqual(orderOfOperations('ab->(cde->(fgh->ijk))'), [
      {operation: null, operand1: 'ab', operand2: null, value: 'ab'},
      {operation: null, operand1: 'cde', operand2: null, value:'cde'},
      {operation: null, operand1: 'fgh', operand2: null, value:'fgh'},
      {operation: null, operand1: 'ijk', operand2: null, value:'ijk'},
      {operation: 'CONDITIONAL', operand1: 'fgh', operand2: 'ijk', value:'fgh->ijk'},
      {operation: 'CONDITIONAL', operand1: 'cde', operand2: '(fgh->ijk)', value:'cde->(fgh->ijk)'},
      {operation: 'CONDITIONAL', operand1: 'ab', operand2: '(cde->(fgh->ijk))', value: 'ab->(cde->(fgh->ijk))'},
    ])
  })
})