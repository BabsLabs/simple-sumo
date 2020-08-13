// app.test.js
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../App'

test('full app rendering', () => {
  const history = createMemoryHistory()
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(container.firstChild.firstChild.firstChild.innerHTML).toMatch('Welcome to...')

  fireEvent.click(getByText(/Log In/i))

  expect(container.innerHTML).toMatch('Log In')
})