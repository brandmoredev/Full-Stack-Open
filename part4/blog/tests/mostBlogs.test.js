const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('../utils/blogs_for_test')

describe('mostblogs', () => {
  test('author with most blogs', () => {
    const mostBlogs = listHelper.mostBlogs(blogs)

    const authorBlogs = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    assert.deepStrictEqual(mostBlogs, authorBlogs)
  })
})