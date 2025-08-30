import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdateBlog = () => {
    const updatedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <span>{blog.url}</span>
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleUpdateBlog}>like</button>
          </div>
          <span>{blog.user.name}</span>
        </div>
      )}
    </div>
  )
}

export default Blog