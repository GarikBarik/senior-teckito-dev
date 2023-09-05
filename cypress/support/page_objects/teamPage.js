
//Функция создания ранжомного эмейла
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

//Функция для извлечения ссылки для завершения регестрации
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

export class TeamPage{
  
  
  //Создание нового пользователя , подтверждение Email и удаление этого пользователя
  createNewTeammate(firstName, lastName, userRole, userPermission) {
 
    cy.get('._currentHeaderContainer_1g353_17').find('button').click()
    cy.get('form').then(createTeammateForm => {
      cy.wrap(createTeammateForm).find('[placeholder="Name"]').type(firstName)
      cy.wrap(createTeammateForm).find('[id="first_name"]').should('have.value', firstName)
      cy.wrap(createTeammateForm).find('[placeholder="Last Name"]').type(lastName)
      cy.wrap(createTeammateForm).find('[id="last_name"]').should('have.value', lastName)
      cy.wait(1000);
      cy.wrap(createTeammateForm).contains('Select Roles').click({ force: true });
      cy.wrap(createTeammateForm).get('.css-5dm6m1').contains(userRole).click()
      cy.wrap(createTeammateForm).get('#react-select-3-placeholder').click({ force: true }) 
      cy.wrap(createTeammateForm).get('.css-5dm6m1').contains(userPermission).click()
      cy.wrap(createTeammateForm).find('[placeholder="example@company.com"]').type(`${email + '@qa.team'}`)
      cy.wrap(createTeammateForm).submit()
      cy.wait(5000)
      createEmail(email)
      cy.get('form').find('[name="password"]').type('Lol1488lol')
      cy.get('form').find('[name="confirm_password"]').type('Lol1488lol')
      cy.get('form').contains('Set password').click()
      cy.wait(1000)
      cy.contains('Team').click()
      const fullname = firstName + ' ' + lastName;
      cy.get('._inputContainer_wk24h_8').find('[placeholder="Search"]').type(fullname)
      cy.get('._container_rgcng_1').find('[type="submit"]').click()
      cy.get('[type="button"]').contains('Delete account').click()
      cy.get('[id="modalContent"]').find('[type="button"]').contains('Delete').click()
    })
  } 

  //Изменения инофрмации о пользователе
  сhangingTheInformationAboutTeammate() {
    cy.get('._teamContainer_1ywjc_45').find('._container_rgcng_1').eq(2).then(teammateItem => {
      cy.wrap(teammateItem).find('[type="submit"]').click()
    })
    let extractedFirstName, extractedLastName
    cy.get('form').then(form => {
      cy.wrap(form).find('[name="first_name"]').type(1)
      cy.wrap(form).find('[name="first_name"]').invoke('text').then(text => {  
         extractedFirstName = text.trim()
      })
      cy.wrap(form).find('[name="last_name"]').type(1)
      cy.wrap(form).find('[name="last_name"]').invoke('text').then(text => {  
         extractedLastName = text.trim()
      })
      
      cy.wrap(form).get('.css-1tkm9rf-control').click()
      cy.wrap(form).get('.css-5dm6m1').contains('QA').click()
      cy.wrap(form).find('[name="capacity"]').clear().type(55)
    })
    
    cy.get('._innerContainer_1gsgj_7').then(page => {
      if(page.hasClass('_container_193f7_1')){
        cy.get('._container_193f7_1').find('._project_193f7_7').eq(0).then(assignedProject => {
          cy.wrap(assignedProject).find('[type="submit"]').click().then(removeOverlay =>{
          cy.wrap(removeOverlay).get('._btnContainer_yyy3f_26').contains('Cancel').click()
          })
        })
      }
    })
   
    const fullName = extractedFirstName + ' ' + extractedLastName
    if('._container_zw3bf_1')
    cy.get('._container_zw3bf_1').find('._container_p0yir_1').contains('Member').click()
    cy.get('._saveBtn_1jxaf_15').find('[type="submit"]').click()
    cy.contains('Team').click()
    cy.get('._teamContainer_1ywjc_45').find('._container_rgcng_1').eq(2).then(teammateItem => {
      cy.wrap(teammateItem).find('._name_rgcng_15').should(fullName)
    })
  }

}
export const onTeamPage = new TeamPage();

