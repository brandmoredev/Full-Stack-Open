const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('../utils/blogs_for_test')

describe('favorite blog', () => {
  const mostLikeBlog = blogs[2]

  test('most liked blog', () => {
    const favoriteBlog = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(favoriteBlog, mostLikeBlog)
  })
})