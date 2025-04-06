const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map((blog) => {
    return blog.likes
  })

  const reducer = (sum, likes) => {
    return sum + likes
  }

  return likesArray.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map((blog) => {
    return blog.likes
  })
  const mostLikedBlog = blogs.find(blog => {
    const maxLike = Math.max(...likesArray)

    return blog.likes === maxLike
  })

  return mostLikedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}