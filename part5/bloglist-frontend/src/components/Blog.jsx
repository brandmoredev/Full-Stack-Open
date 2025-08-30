import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdateBlog = (e) => {
    e.preventDefault()

    const updatedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDeleteBlog = (e) => {
    e.preventDefault()

    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <a href={blog.url} target="_blank">{blog.url}</a>
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleUpdateBlog}>like</button>
          </div>
          <span>{blog.user.name}</span>
          { user.id === blog.user.id &&
            <div>
              <button onClick={handleDeleteBlog}>remove</button>
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default Blog