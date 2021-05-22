const cTable = require('console.table');
const inquirer = require('inquirer');
const Department = require('./departmentClass');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
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
      ],
    });
    console.log(answers);
    return answers;
  },

  async next(answers) {
    switch (answers.task) {
      case 'viewAllDepartments': {
        // run a program to pull from print all.
        const newDepartment = new Department(dbConfig);
        const allDepartments = await newDepartment.read();
        console.table(allDepartments);
        break;
      }
      case 'addADepartment':
        // run a program to print all.
        break;
      case 'updateDepartment':
        // run a program to print all.
        break;
      default:
        console.error('Something went wrong');
    }
  },
};

module.exports = departmentPrompt;
