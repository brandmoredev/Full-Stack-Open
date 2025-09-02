import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { beforeEach, describe, expect } from "vitest"
import BlogForm from "./BlogForm"

describe('Blog component', () => {
  beforeEach(() => {
    const blog = {
      title: 'This is a blog title',
      author: 'John Doe',
      likes: 10,
      url: 'http://www.test.com'
    }

    render(<Blog blog={blog} />)
  })

  test('renders title and author', () => {
    const titleElement = screen.getByText('This is a blog title', { exact: false })
    const authorElement = screen.getByText('John Doe', { exact: false })

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
  })

  test('at the start, likes and url are not displayed', () => {
    const likesElement = screen.queryByText('10')
    const urlElement = screen.queryByText('http://www.test.com')

    expect(likesElement).toBeNull()
    expect(urlElement).toBeNull()
  })

  test('after clicking button, likes and url are displayed', () => {
    const buttonElement = screen.getByText('view')
    userEvent.click(buttonElement)

    const likesElement = screen.queryByText('10')
    const urlElement = screen.queryByText('http://www.test.com')

    expect(likesElement).toBeDefined()
    expect(urlElement).toBeDefined()
  })
})

test('after clicking like twice, event gets called twice', async () => {
  const mockUpdateBlog = vi.fn()
  const blog = {
    title: 'This is a blog title',
    author: 'John Doe',
    likes: 10,
    url: 'http://www.test.com',
    user: {
      username: 'testuser',
      name: 'Test User',
      id: '12345'
    }
  }

  const user = {
    username: 'testuser',
    name: 'Test User',
    id: '12345'
  }

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} user={user}/>)


  const buttonElement = screen.getByText('view')
  await userEvent.click(buttonElement)
  screen.debug()

  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})

describe('testing the blog form', async () => {
  test('creating a new blog', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getAllByLabelText('title')
    const authorInput = screen.getAllByLabelText('author')
    const urlInput = screen.getAllByLabelText('url')
    const createButton = screen.getByText('create')

    await user.type(titleInput[0], 'This is a blog title')
    await user.type(authorInput[0], 'William Smith')
    await user.type(urlInput[0], 'https://www.test.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('This is a blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('William Smith')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.test.com')
  })
})