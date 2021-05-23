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
    this.next(answers);
  },
  async next(answers) {
    // switch to detect single function operations. (View)
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
        // const nextResponse = await departmentPrompt.next(response);
        // // check if user wants to go back?
        // return nextResponse;
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
          name: 'Update a Department',
          value: 'updateDepartment',
        },
        {
          name: 'Delete a Department',
          value: 'deleteDepartment',
        },
        {
          name: 'Back',
          value: 'back',
        },
      ],
    });
    this.next(answers);
    // console.log(answers);
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
      case 'addADepartment': {
        try {
          const answer = await inquirer.prompt({
            type: 'input',
            message: 'What would you like to name the Department?',
            name: 'departmentName',
          });
          const newDepartment = new Department(dbConfig);
          await newDepartment.create(answer.departmentName);
          const answer2 = await this.manageDepartment();
          return answer2;
        } catch (error) {
          console.error(error);
          break;
        }
      }
      case 'updateDepartment': {
        try {
          const newDepartment = new Department(dbConfig);
          const questions = {
            type: 'list',
            message: 'Which Department would you like to delete?',
            name: 'departmentID',
            choices: undefined,
          };
          const choices = await newDepartment.listAll();
          questions.choices = choices;
          const answer = await inquirer.prompt(questions);
          const answer2 = await inquirer.prompt({
            type: 'input',
            message:
              'What is the new Name for the Department? (Enter to not Change)',
            name: 'departmentName',
          });
          await newDepartment.delete(answer.departmentID);
          const answer3 = await this.manageDepartment();
          return answer3;
        } catch (error) {
          console.error(error);
          break;
        }
      }
      case 'deleteDepartment': {
        try {
          const newDepartment = new Department(dbConfig);
          const questions = {
            type: 'list',
            message: 'Which Department would you like to delete?',
            name: 'departmentID',
            choices: undefined,
          };
          const choices = await newDepartment.listAll();
          questions.choices = choices;
          const answer = await inquirer.prompt(questions);
          await newDepartment.delete(answer.departmentID);
          const answer2 = await this.manageDepartment();
          return answer2;
        } catch (error) {
          console.error(error);
          break;
        }
      }

      case 'back':
        topLevelPrompt.generate();
        break;
      default:
        console.error('Something went wrong in selection');
    }
  },
};

module.exports = { topLevelPrompt, departmentPrompt };
