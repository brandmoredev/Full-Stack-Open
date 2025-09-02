import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async(e) => {
    e.preventDefault()
    await createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          <label>
            title
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />

          </label>
        </div>
        <div>
          <label>
            author
            <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button onClick={handleCreate}>create</button>
      </form>
    </div>
  )
}

export default BlogForm
