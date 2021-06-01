describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ahmed Aziz',
      username: 'synges',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('synges')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('Ahmed Aziz logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('synges')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'synges', password: '12345' })
    })

    it.only('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#author').type('test author')
      cy.get('#title').type('test title')
      cy.get('#url').type('test url')
      cy.contains('create').click()
      cy.contains('test author')
    })

    it.only('Ab log can be liked', function () {
      cy.contains('New Blog').click()
      cy.get('#author').type('test author')
      cy.get('#title').type('test title')
      cy.get('#url').type('test url')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('like').click()
    })
  })
})
