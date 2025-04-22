describe('Todo Kanban Board', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display the Kanban board with all columns', () => {
    cy.contains('h3', 'To Do').should('be.visible');
    cy.contains('h3', 'In Progress').should('be.visible');
    cy.contains('h3', 'QA').should('be.visible');
    cy.contains('h3', 'Live in Production').should('be.visible');
  });

  it('should add a new task to the To Do column', () => {
    cy.get('input[placeholder="Add todo..."]').type('Test New Task');
    cy.get('input[value="Add Task"]').click();

    cy.contains('h3', 'To Do')
      .parent()
      .find('span')
      .contains('Test New Task')
      .should('be.visible');
  });

  it('should add a task with tags', () => {

    cy.get('input[placeholder="Add todo..."]').type('Task With Tags');
    cy.contains('button', 'Select Tags').click();
    
    cy.contains('span', 'dev').click();
    cy.get('input[value="Add Task"]').click();
    cy.contains('span', 'Task With Tags')
      .parents('.mb-3')
      .contains('span', 'dev')
      .should('be.visible');
  });

  it('should mark a task as completed', () => {
    cy.get('input[placeholder="Add todo..."]').type('Complete This Task');
    cy.get('input[value="Add Task"]').click();
    cy.contains('span', 'Complete This Task')
      .parent()
      .find('input[type="checkbox"]')
      .click();
    cy.contains('span', 'Complete This Task')
      .should('have.class', 'line-through');
  });

  it('should delete a task', () => {
    cy.get('input[placeholder="Add todo..."]').type('Delete This Task');
    cy.get('input[value="Add Task"]').click();
    cy.contains('span', 'Delete This Task')
      .parent()
      .contains('button', 'Delete')
      .click();
    cy.contains('span', 'Delete This Task').should('not.exist');
  });

  it('should add a new tag to an existing task', () => {
    cy.get('input[placeholder="Add todo..."]').type('Task For Tag Testing');
    cy.get('input[value="Add Task"]').click();
    cy.contains('span', 'Task For Tag Testing')
      .parent()
      .parent()
      .contains('button', 'Tags')
      .click();
    cy.contains('span', 'Task For Tag Testing')
      .parents('.mb-3')
      .find('input[placeholder="Add new tag"]')
      .type('cypress-test');
    
    cy.contains('span', 'Task For Tag Testing')
      .parents('.mb-3')
      .contains('button', 'Add')
      .click();
    cy.contains('span', 'Task For Tag Testing')
      .parents('.mb-3')
      .contains('span', 'cypress-test')
      .should('be.visible');
  });
});