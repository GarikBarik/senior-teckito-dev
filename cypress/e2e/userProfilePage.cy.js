import {  } from "module";
import { navigateTo } from "../support/page_objects/navigationPage";

//User data before modification
const oldFirstName = 'IHOR'
const oldLastName = 'HAIDADIN'
const oldRole = 'PM'

//User data after modification
const newFirstName = 'ROHI'
const newLastName = 'NIDADIAH'
const newRole = 'QA'



describe('Profile page', () => {
  
  beforeEach('open application and login',() => {
    cy.openSignInPage()
    navigateTo.profileSettingsPage()
  })

  it('changes to the current user information', () => {

    //Change of information
    cy.get('form').then(userForm => {
      cy.wrap(userForm).find('[name="first_name"]').clear().type(newFirstName)
      cy.wrap(userForm).find('[name="last_name"]').clear().type(newLastName)
      cy.wrap(userForm).find('._singleValue_1pt3h_35').click({force: true})
      cy.wrap(userForm).find('._option_1pt3h_69').contains(newRole).click()
      cy.wrap(userForm).find('[name="capacity"]').clear().type('100')
    })
    cy.get('._saveBtn_1jxaf_15').find('[type="submit"]').contains('Update info').click()

    //Check if the information has been changed
    cy.get('form').then(userForm => {
      cy.wrap(userForm).find('[name="first_name"]').should('have.value', newFirstName)
      cy.wrap(userForm).find('[name="last_name"]').should('have.value', newLastName)
      cy.wrap(userForm).find('.css-1tkm9rf-control').should('contain', newRole)
      cy.wrap(userForm).find('[name="capacity"]').should('have.value', '100')
    })

    //Return values to initial values
    cy.get('form').then(userForm => {
      cy.wrap(userForm).find('[name="first_name"]').clear().type(oldFirstName)
      cy.wrap(userForm).find('[name="last_name"]').clear().type(oldLastName)
      cy.wrap(userForm).find('._singleValue_1pt3h_35').click({force: true})
      cy.wrap(userForm).find('._option_1pt3h_69').contains(oldRole).click()
      cy.wrap(userForm).find('[name="capacity"]').clear().type('100')
    })
    cy.get('._saveBtn_1jxaf_15').find('[type="submit"]').contains('Update info').click()

    //Check if the information has been changed
    cy.get('form').then(userForm => {
      cy.wrap(userForm).find('[name="first_name"]').should('have.value', oldFirstName)
      cy.wrap(userForm).find('[name="last_name"]').should('have.value', oldLastName)
      cy.wrap(userForm).find('.css-1tkm9rf-control').should('contain', oldRole)
      cy.wrap(userForm).find('[name="capacity"]').should('have.value', '100')
    })

    
  })
})