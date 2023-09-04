import {  } from "module";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onTeamPage } from "../support/page_objects/teamPage";

describe('Smoke testing', () => {
 
  beforeEach('open application and login',() => {
    cy.openSignInPage()
  })

  it('verify navigations actoss the pages', () => { 
    
    navigateTo.projectsPage()
    cy.get('h2').should('contain', 'Projects')
    navigateTo.teamPage()
    cy.get('h2').should('contain', 'Team')
    navigateTo.timesheetPage()
    cy.get('h2').should('contain', 'Timesheet')
    navigateTo.settingsPage()
    cy.get('h2').should('contain', 'Settings')
    navigateTo.profileSettingsPage()
    cy.get('h2').should('contain', 'Profile Settings')
  })

  it.only('Login to admin account , create a teammate, confirm emails and delete the created teammate', () => {
    navigateTo.teamPage()
    onTeamPage.createNewTeammate('Ihor1', 'Haidadin1', 'QA')  //firstName, lastName & userRole(QA, Developer, PM, Designer, No position)    
    })

  it('', () => {
    navigateTo.teamPage()
    onTeamPage.сhangingTheInformationAboutTeammate()
    })
 
    
    
    })
  


