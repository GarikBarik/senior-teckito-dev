import {  } from "module";
import { navigateTo } from "../support/page_objects/navigationPage";

//Function for creating ranked emails
function generateRandomEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let email = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    email += characters.charAt(randomIndex);
  }

  return `${email}`;
}

const email = generateRandomEmail();

//Function for retrieving the link to complete the registry
function createEmail(email) {
  cy.origin('https://qa.team/', { args: { email } }, ({ email }) => {
    cy.visit('https://qa.team/');
    cy.get('form').find('[id="code"]').type(email);
    cy.get('form').find('[value="go »"]').click();
    cy.get('[id="messages"]').contains('Activating your account').click();
    cy.get('.message_full')
      .find('pre')
      .invoke('text')
      .then(text => {
        const urlRegex = /https:\/\/senor-tickito-staging\.newfolder2\.dev\/registration\/[a-zA-Z0-9-]+/;
        const extractedUrl = text.match(urlRegex)[0];
        cy.visit(extractedUrl);
      });
  });
}  
//Information about the users we create
const firstName = 'Ihor2'  
const lastName = 'Haidadin2'
const userRole = 'QA'
const userPermission = 'Admin'
const fullname = firstName + ' ' + lastName;

//Information about changing the user profile
const editFirstName = 'Ih2'  
const editLastName = 'Ha2'
const editUserRole = 'PM'
const editFullname = editFirstName + ' ' + editLastName;

describe('Team page', () => { 
  beforeEach('open application and login',() => {
    cy.openSignInPage()
    navigateTo.teamPage()
  })

  it('Login to admin account , create a teammate, confirm emails and delete the created teammate', () => {
    //Create a new user, confirm Email and delete this user
    cy.get('._currentHeaderContainer_1g353_17').find('button').click()
    cy.get('form').then(createTeammateForm => {
      cy.wrap(createTeammateForm).find('[placeholder="Name"]').type(firstName)
      cy.wrap(createTeammateForm).find('[id="first_name"]').should('have.value', firstName)
      cy.wrap(createTeammateForm).find('[placeholder="Last Name"]').type(lastName)
      cy.wrap(createTeammateForm).find('[id="last_name"]').should('have.value', lastName)
      cy.wait(1000);
      cy.wrap(createTeammateForm).contains('Select Roles').click({ force: true });
      cy.wrap(createTeammateForm).find('.css-5dm6m1').contains(userRole).click()
      cy.wrap(createTeammateForm).find('#react-select-3-placeholder').click({ force: true }) 
      cy.wrap(createTeammateForm).find('.css-5dm6m1').contains(userPermission).click()
      cy.wrap(createTeammateForm).find('[placeholder="example@company.com"]').type(`${email + '@qa.team'}`)
      cy.wrap(createTeammateForm).submit()

      //Email confirmations
      cy.wait(5000)
      createEmail(email)

      //Creating a password for a user
      cy.get('form').find('[name="password"]').type('Lol1488lol')
      cy.get('form').find('[name="confirm_password"]').type('Lol1488lol')
      cy.get('form').contains('Set password').click()
      cy.contains('Team').click()
      
      //Checking that the user has been created
      cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type(fullname)
      cy.get('._container_rgcng_1').find('._name_rgcng_15').should('contain', fullname)
    })
  })

   it('User profile changes', () => {
    //Change username, capacity, role , permission
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type(fullname)
    cy.get('._teamContainer_1ywjc_45').find('[type="submit"]').click()
    cy.get('form').then(editTeammate => {
      cy.wrap(editTeammate).find('[name="first_name"]').clear().type(editFirstName)
      cy.wrap(editTeammate).find('[name="last_name"]').clear().type(editLastName) 
      cy.wrap(editTeammate).find('.css-1tkm9rf-control').click()
      cy.wrap(editTeammate).find('._option_1pt3h_69').contains(editUserRole).click()
      cy.wrap(editTeammate).find('[name="capacity"]').clear().type('100')
    })
    cy.get('._container_13fr8_1').find('[id="2"]').click({force: true})
    cy.get('._saveBtn_1jxaf_15').find('[type="submit"]').contains('Update info').click()
    navigateTo.teamPage()

    //Check that the changes have worked
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type(editFullname)
    cy.get('._teamContainer_1ywjc_45').find('[type="submit"]').click()
    cy.get('form').then(editTeammate => {
      cy.wrap(editTeammate).find('[name="first_name"]').should('have.value', editFirstName)
      cy.wrap(editTeammate).find('[name="last_name"]').should('have.value', editLastName) 
      cy.wrap(editTeammate).find('._singleValue_1pt3h_35').should('contain', editUserRole)
      cy.wrap(editTeammate).find('[name="capacity"]').should('have.value', '100')
    })
    cy.get('._container_13fr8_1').find('[id="2"]').should('be.checked')

    
   })

   it('User profile removal', () => {
    //User profile removal
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type(editFullname)
    cy.get('._teamContainer_1ywjc_45').find('[type="submit"]').click()
    cy.get('._deleteAccountContainer_1gh50_29').find('[type="button"]').contains('Delete account').click()
    cy.get('[id="modalContent"]').find('[type="button"]').contains('Delete').click()

    //Checking that the user profile has been deleted
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type(editFullname)
    cy.get('._teamContainer_1ywjc_45').find('._empty_1ywjc_60').should('contain', 'No results found')
   })
})
  


