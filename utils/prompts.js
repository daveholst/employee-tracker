const inquirer = require('inquirer');
const cTable = require('console.table');
const Department = require('./departmentClass');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};

const topLevelPrompt = {
  async generate() {
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
        return nextResponse;
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

const departmentPrompt = {
  async manageDepartment() {
    const answers = await inquirer.prompt({
      type: 'list',
      message: 'What would you like to do with Departments?',
      name: 'task',
      choices: [
        {
          name: 'View All Departments',
          value: 'viewAllDepartments',
        },
        {
          name: 'Add a Department',
          value: 'addADepartment',
        },
        {
          name: 'Update Department',
          value: 'updateDepartment',
        },
        {
          name: 'Back',
          value: 'back',
        },
      ],
    });
    return answers;
  },

  async next(answers) {
    switch (answers.task) {
      case 'viewAllDepartments': {
        // run a program to pull from print all.
        const newDepartment = new Department(dbConfig);
        const allDepartments = await newDepartment.read();
        console.table(allDepartments);
        const answer = await this.manageDepartment();
        return answer;
      }
      case 'addADepartment':
        // run a program to print all.
        break;
      case 'updateDepartment':
        // run a program to print all.
        break;
      case 'back':
        return 'back';
      default:
        console.error('Something went wrong');
    }
  },
};

module.exports = { topLevelPrompt, departmentPrompt };
