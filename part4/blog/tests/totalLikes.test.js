const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('../utils/blogs_for_test')

describe('total likes', () => {
  const listOneBlog = [blogs[0]]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listOneBlog)
    assert.strictEqual(result, 7)
  })
})