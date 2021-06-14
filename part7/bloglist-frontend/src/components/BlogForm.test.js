import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title ')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'testing of author' },
    })
    fireEvent.change(title, {
      target: { value: 'testing of title' },
    })
    fireEvent.change(url, {
      target: { value: 'testing of url' },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      author: 'testing of author',
      title: 'testing of title',
      url: 'testing of url',
    })
  })
})
