const dummy = (blogs) => {
  blogs
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

const mostBlogs = (blogs) => {
  const authorBlogCounts = []

  blogs.forEach(blog => {
    const authorBlog = authorBlogCounts?.find(authorBlog => authorBlog.author === blog.author)

    if (!authorBlog) {
      authorBlogCounts.push({
        author: blog.author,
        blogs: 1
      })
    } else {
      const index = authorBlogCounts.indexOf(authorBlog)
      authorBlogCounts[index] = { ...authorBlog, blogs: authorBlog.blogs + 1 }
    }
  })

  const maxBlog = Math.max(...authorBlogCounts.map(authorBlog => {
    return authorBlog.blogs
  }))

  const mostAuthor = authorBlogCounts.find(authorBLog => authorBLog.blogs === maxBlog)

  return mostAuthor
}


const mostLikes = (blogs) => {
  const authorLikes = []

  blogs.forEach(blog => {
    const authorBlog = authorLikes.find(authorBlog => authorBlog.author === blog.author)

    if (!authorBlog) {
      authorLikes.push({
        author: blog.author,
        likes: blog.likes
      })
    } else {
      const index = authorLikes.indexOf(authorBlog)
      authorLikes[index] = { ...authorBlog, likes: authorBlog.likes + blog.likes }
    }
  })

  const maxLikes = Math.max(...authorLikes.map(authorBlog => {
    return authorBlog.likes
  }))

  const mostAuthor = authorLikes.find(authorBLog => authorBLog.likes === maxLikes)

  return mostAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}