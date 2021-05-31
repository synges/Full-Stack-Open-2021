import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 10,
    author: 'Ahmed Aziz',
    url: 'www.expample.com',
    user: { name: 'Ahmed', username: 'test username' },
  }

  const component = render(<Blog blog={blog} />)

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
