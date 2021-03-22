const assert = require('assert');
const { getEndPosition } = require('../lexer/getEndPosition');
const { getToken } = require('../lexer/getToken');

describe('getEndPosition', function() {
  describe('symbols', function () {
    it('(0, "ab&cd")', function () {
      assert.strictEqual(getEndPosition(0, 'ab&cd'), 1)
    })
    it('(0, "ab->cd")', function () {
      assert.strictEqual(getEndPosition(0, 'ab->cd'), 1)
    })
    it('(0, "ab==cd")', function () {
      assert.strictEqual(getEndPosition(0, 'ab==cd'), 1)
    })
    it('(0, "ab->cd&f")', function () {
      assert.strictEqual(getEndPosition(0, 'ab->cd&f'), 1)
    })
    it('(0, "ab>cd|efg")', function () {
      assert.strictEqual(getEndPosition(0, 'ab>cd|efg'), 4)
    })
    it('(0, "abcdasa")', function () {
      assert.strictEqual(getEndPosition(0, 'abcdasa'), 6)
    })
  })
  describe('start position', function () {
    it('(0, "abcdasa")', function () {
      assert.strictEqual(getEndPosition(3, 'abcdasa'), 9)
    })
    it('(0, "ab==cd")', function () {
      assert.strictEqual(getEndPosition(4, 'ab==cd'), 5)
    })
    it('(0, "aa|ab>cd&efg)efg")', function () {
      assert.strictEqual(getEndPosition(3, 'aa|ab>cd&efg)efg'), 4)
    })
  })
})



describe('getToken', function() {

  it('proposition', function () {
    assert.deepStrictEqual(
      getToken(0, 'asdfgh'), {
        endPosition: 5, 
        token: {
          name: 'PROPOSITION',
          value: 'asdfgh',
          position: 0,
        }
      } 
    )
  })
  it('proposition, non-zero position', function () {
    assert.deepStrictEqual(
      getToken(2, 'asdfgh'), {
        endPosition: 5, 
        token: {
          name: 'PROPOSITION',
          value: 'dfgh',
          position: 2,
        }
      } 
    )
  })


})
