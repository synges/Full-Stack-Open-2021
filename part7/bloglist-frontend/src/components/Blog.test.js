import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler
  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 10,
      author: 'Ahmed Aziz',
      url: 'www.expample.com',
      user: { name: 'Ahmed', username: 'test username' },
    }
    const loggedUser = {
      username: 'test username',
    }
    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} loggedUser={loggedUser} addLike={mockHandler} />
    )
  })

  test('renders content with basic info', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    const basicDiv = component.container.querySelector('.blog')
    //   const detaildDiv = component.container.querySelector('.blog')
    expect(basicDiv).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(basicDiv).not.toHaveTextContent('www.expample.com')
    expect(basicDiv).not.toHaveTextContent('likes')
  })

  test('detailed info is visible with button press', () => {
    expect(component.container).not.toHaveTextContent('www.expample.com')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.expample.com')
  })

  test('clicking the like button fires the event', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
