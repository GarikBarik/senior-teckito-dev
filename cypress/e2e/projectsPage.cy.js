import {  } from "module";
import { navigateTo } from "../support/page_objects/navigationPage";

describe('Creating, editing, deleting, searching a project', () => {
  
  beforeEach('open application and login',() => {
    cy.openSignInPage()
    navigateTo.projectsPage()
  })

  it('checking if the Projects page is open', () => { 
    cy.get('h2').should('contain', 'Projects')
  })

  it('project creation', () => { 
    //Checking that the 'Create Project' page has opened
    cy.get('._currentHeaderContainer_1g353_17').find('[type="submit"]').click()
    cy.get('h2').should('contain', 'Create Project')

    //Let's fill in the project name, project time and budget
    cy.get('form').then(formCreate => {
      cy.wrap(formCreate).find('[name="name"]').type('Igor test project');
      cy.wrap(formCreate).find('[name="hours"]').type('60')
      cy.wrap(formCreate).find('[id="budget"]').type('1000')
    });

    //Adding teammates to the project
    cy.get('._container_13fr8_1').find('[type="button"]').click()
    cy.get('[id="modalContent"]').find('form').then(formAddTeammate => {
      cy.wrap(formAddTeammate).find('.css-1tkm9rf-control').contains('Name Surname').click({force: true} )
      cy.wrap(formAddTeammate).find('.css-5dm6m1').contains('IHOR HAIDADIN').click()
      cy.wrap(formAddTeammate).find('[name="cost"]').clear().type(1500)
      cy.wrap(formAddTeammate).find('.css-1tkm9rf-control').contains('Monthly').click({force: true} )
      cy.wrap(formAddTeammate).find('.css-5dm6m1').contains('Weekly').click() 
      cy.wrap(formAddTeammate).find('[type="submit"]').click()
    })
    cy.get('[type="submit"]').contains('Create Project').click()

    //Project search
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type('Igor test project')
    cy.get('._container_fdfjb_1').find('._projectTitleWrapper_fdfjb_15').should('contain', 'Igor test project')

    //Enter the project and check if all information about it is correctly recorded 
    cy.get('._container_fdfjb_1').find('[type="submit"]').click()
    cy.get('h2').should('contain', 'Igor test project')
    cy.get('form').then(formEditor => {
      cy.wrap(formEditor).find('[name="name"]').should('have.value', 'Igor test project');
      cy.wrap(formEditor).find('[name="hours"]').should('have.value', '60')
      cy.wrap(formEditor).find('[id="budget"]').should('have.value','1000')
    });
    cy.get('._container_13fr8_1').find('._name_19vqd_20').should('contain', 'IHOR HAIDADIN')
  })

  it(' Find a project and change ', () => {  
    //Project search
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type('Igor test project')
    cy.get('._container_fdfjb_1').find('._projectTitleWrapper_fdfjb_15').should('contain', 'Igor test project')

    //Find a project and modify
    cy.get('._container_fdfjb_1').find('[type="submit"]').click()
    cy.get('h2').should('contain', 'Igor test project')
    cy.get('form').then(formEditor => {
      cy.wrap(formEditor).find('[name="name"]').type('1');
      cy.wrap(formEditor).find('[name="hours"]').clear().type('70')
      cy.wrap(formEditor).find('[id="budget"]').clear().type('2000')
    });
    cy.get('._container_13fr8_1').find('._container_8anb0_1').click()
    
    cy.get('[id="modalContent"]').find('form').then(formAddTeammate => {
      cy.wrap(formAddTeammate).find('[name="cost"]').clear().type(2000)
      cy.wrap(formAddTeammate).find('.css-1tkm9rf-control').contains('Weekly').click({force: true} )
      cy.wrap(formAddTeammate).find('.css-5dm6m1').contains('Monthly').click() 
      cy.wrap(formAddTeammate).find('[type="submit"]').click()
    })
    cy.get('[type="submit"]').contains('Update Project').click()
    navigateTo.projectsPage()
    cy.get('[type="button"]').contains('Leave').click()
    
    cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type('Igor test project')

    cy.get('._container_fdfjb_1').find('._projectTitleWrapper_fdfjb_15').should('contain', 'Igor test project1')
    cy.get('._container_fdfjb_1').find('[type="submit"]').click()

    //check if the user data has changed
    cy.get('h2').should('have.text', 'Igor test project1 Settings')
    cy.get('form').then(formEditor => {
      cy.wrap(formEditor).find('[name="name"]').should('have.value', 'Igor test project1');
      cy.wrap(formEditor).find('[name="hours"]').should('have.value', '70')
      cy.wrap(formEditor).find('[id="budget"]').should('have.value','2000')
    });

    cy.get('._container_13fr8_1').find('._container_8anb0_1').click()  
    cy.get('[id="modalContent"]').find('form').then(formAddTeammate => {
      cy.wrap(formAddTeammate).find('[name="cost"]').should('have.value', '2000')
      cy.wrap(formAddTeammate).find('.css-1dimb5e-singleValue').should('have.text', 'Monthly')
      cy.wrap(formAddTeammate).find('[type="button"]').contains('Cancel').click()
    })
  })

  it(' Find a project and deleted ', () => {
   //Project search
   cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type('Igor test project1')
   cy.get('._container_fdfjb_1').find('._projectTitleWrapper_fdfjb_15').should('contain', 'Igor test project1')
  
  //Project deletion 
  cy.get('._container_fdfjb_1').find('[type="submit"]').click()
  cy.get('h2').should('contain', 'Igor test project1 Settings')
  cy.get('[type="button"]').contains('Delete project').click()
  cy.get('[id="modalContent"]').find('[type="button"]').contains('Delete').click()

  //Checking that the project has been deleted
  cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type('Igor test project1')
   cy.get('._container_136k3_1').find('p').should('have.text', 'No results found')
  
  })  
})