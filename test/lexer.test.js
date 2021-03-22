const assert = require('assert');
const { getPropLength } = require('../lexer/getPropLength');
const { getToken } = require('../lexer/getToken');
const { lexer } = require('../lexer/lexer');

describe('getPropLength', function() {
  describe('symbols', function () {
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
