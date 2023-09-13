export class NavigationPage{
  
  timesheetPage() {
    cy.contains('Timesheet').click()
  }

  projectsPage() {
    cy.contains('Projects').click()
  }

  teamPage() {
    cy.contains('Team').click()
  }

  settingsPage() {
    cy.contains('Settings').click()
  }
  
  profileSettingsPage(){
    cy.get('._userName_1h04b_139').click()
  }
}
export const navigateTo = new NavigationPage()