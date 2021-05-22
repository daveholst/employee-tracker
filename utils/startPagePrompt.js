const inquirer = require('inquirer');
const cTable = require('console.table');
const departmentPrompt = require('./departmentPrompt');
const { next } = require('./departmentPrompt');

const startPrompt = {
  async startScreen() {
    const answers = await inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'task',
      choices: [
        new inquirer.Separator(),

        {
          name: 'View All Employees',
          value: 'viewAll',
        },
        {
          name: 'View Employees by Department',
          value: 'viewByDepartment',
        },
        {
          name: 'View Employees by Role',
          value: 'viewByRole',
        },
        {
          name: 'View Employees by Manager',
          value: 'viewByManager',
        },
        new inquirer.Separator(),
        {
          name: 'Add an Employee',
          value: 'addEmployee',
        },
        {
          name: 'Modify an Employee',
          value: 'modEmployee',
        },
        {
          name: 'Manage Departments',
          value: 'manDepartment',
        },
        {
          name: 'Manage Roles',
          value: 'manRoles',
        },
      ],
    });
    return answers;
  },
  async next(answers) {
    // switch to detect single function operations. (View)
    console.log(answers);
    switch (answers.task) {
      case 'viewAll':
        // run a program to pull from print all.
        break;
      case 'viewByDepartment':
        // run a program to print all.
        break;
      case 'viewByRole':
        // run a program to print all.
        break;
      case 'viewByManager':
        // run a program to print all.
        break;
      case 'addEmployee':
        // run a program to print all.
        break;
      case 'modEmployee':
        // run a program to print all.
        break;
      case 'manDepartment': {
        const response = await departmentPrompt.manageDepartment();
        const nextResponse = await departmentPrompt.next(response);
        // check if user wants to go back?
        if (nextResponse === 'back') this.startScreen();

        // run a program to print all.
        break;
      }
      case 'manRoles':
        // run a program to print all.
        break;
      default:
        console.error('invalid selection made');
    }
    // switch to detect another inquirer for further options
  },
};

module.exports = startPrompt;
