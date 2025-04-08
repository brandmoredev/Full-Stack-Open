const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('../utils/blogs_for_test')

describe('mostlikes', () => {
  test('author with most likes', () => {
    const mostLikes= listHelper.mostLikes(blogs)

    const authorLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    assert.deepStrictEqual(mostLikes, authorLikes)
  })
})