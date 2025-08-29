import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
            <button>like</button>
          </div>
          <span>{blog.user.name}</span>
        </div>
      )}
    </div>
  )
}

export default Blog