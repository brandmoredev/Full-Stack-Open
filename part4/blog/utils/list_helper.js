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

module.exports = {
  dummy,
  totalLikes
}