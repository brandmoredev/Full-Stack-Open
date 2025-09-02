import { useState, useEffect, useRef } from 'react'
import './App.css'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({})
  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    loginService.login({ username, password })
      .then(user => {
        console.log(user)
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))

        setUsername('')
        setPassword('')
        setNotificationMessage({
          type: 'success',
          message: 'Successfully logged in'
        })

      })
      .catch(error => {
        setNotificationMessage({
          type: 'error',
          message: error.response.data.error
        })
      })

    setTimeout(() => {
      setNotificationMessage({})
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setNotificationMessage({
          type: 'success',
          message: `A new blog '${newBlog.title}' by ${newBlog.author} added`
        })

        blogFormRef.current.toggleVisibility()
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


  const updateBlog = (id, updatedBlog) => {
    blogService.update(id, updatedBlog)
      .then(() => {
        setBlogs(blogs.map(blog =>
          blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog
        ))
        setNotificationMessage({
          type: 'success',
          message: `Blog '${updatedBlog.title}' updated`
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

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotificationMessage({
          type: 'success',
          message: 'Blog removed'
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

  const loginForm = () => (
    <form>
      <h2>Log in to application</h2>
      <div>
        <label>username</label>
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type='password'
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button onClick={handleLogin}>login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" reference={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )


  return (
    <div>
      <Notification type={notificationMessage.type} message={notificationMessage.message} />
      {user === null ?
        loginForm() :
        <>
          <p>{user.name} logged in</p>
          {blogForm()}
          {blogList()}
        </>
      }
    </div>
  )
}

export default App