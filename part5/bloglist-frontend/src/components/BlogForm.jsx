import blogService from '../services/blogs'

const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, setNotificationMessage, blogs, setBlogs }) => {
  const handleCreate = (e) => {
    e.preventDefault()

    blogService.create({ title, author, url })
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setTitle('')
        setAuthor('')
        setUrl('')

        setNotificationMessage({
          type: 'success',
          message: `A new blog '${newBlog.title}' by ${newBlog.author} added`
        })
      })
      .catch(() => {
        setNotificationMessage({
          type: 'error',
          message: 'Something went wrong'
        })
      })

      setTimeout(() => {
        setNotificationMessage({})
      }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={handleCreate}>create</button>
      </form>
    </div>
  )
}

  export default BlogForm
  