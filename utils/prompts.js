const inquirer = require('inquirer');
const cTable = require('console.table');
const Department = require('./departmentClass');
const Role = require('./roleClass');

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
        await departmentPrompt.manageDepartment();
        // const nextResponse = await departmentPrompt.next(response);
        // // check if user wants to go back?
        // return nextResponse;
        break;
      }
      case 'manRoles':
        await rolePrompt.manageRoles();
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
            name: 'ID',
            choices: undefined,
          };
          const choices = await newDepartment.listAll();
          questions.choices = choices;
          const IdAnswer = await inquirer.prompt(questions);
          const newNameAnswer = await inquirer.prompt({
            type: 'input',
            message:
              'What is the new name for the Department? (Enter to not Change)',
            name: 'newName',
          });
          if (newNameAnswer.newName === '') {
            return await this.manageDepartment();
          }
          await newDepartment.update(IdAnswer.ID, {
            name: newNameAnswer.newName,
          });
          return await this.manageDepartment();
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

const rolePrompt = {
  async manageRoles() {
    const answers = await inquirer.prompt({
      type: 'list',
      message: 'What would you like to do with Roles?',
      name: 'task',
      choices: [
        {
          name: 'View All Roles',
          value: 'viewAllRoles',
        },
        {
          name: 'Add a Role',
          value: 'addARole',
        },
        {
          name: 'Update a Role',
          value: 'updateRole',
        },
        {
          name: 'Delete a Role',
          value: 'deleteRole',
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
      case 'viewAllRoles': {
        // run a program to pull from print all.
        const newRole = new Role(dbConfig);
        const allRoles = await newRole.read();
        console.table(allRoles);
        const answer = await this.manageRoles();
        return answer;
      }
      case 'addARole': {
        try {
          const questions = [
            {
              type: 'input',
              message: 'What is the title of the new Role?',
              name: 'roleTitle',
            },
            {
              type: 'input',
              message: 'What is the salary of the Role? (ex. 100000.00)?',
              name: 'roleSalary',
            },
            {
              type: 'list',
              message: 'Which Department does the Role belong to?',
              name: 'roleDepartment',
              choices: undefined,
            },
          ];
          // get department inquirer questions array
          const newDepartment = new Department(dbConfig);
          const departmentChoices = await newDepartment.listAll();
          questions[2].choices = departmentChoices;
          const answer = await inquirer.prompt(questions);
          console.log(answer);
          const newRole = new Role(dbConfig);
          await newRole.create(
            answer.roleTitle,
            answer.roleSalary,
            answer.roleDepartment
          );
          const answer2 = await this.manageRoles();
          return answer2;
        } catch (error) {
          console.error(error);
          break;
        }
      }
      case 'updateRole': {
        try {
          // get list of Roles to select from
          const newRole = new Role(dbConfig);
          const newDepartment = new Department(dbConfig);
          const questions = {
            type: 'list',
            message: 'Which Role would you like to Update?',
            name: 'ID',
            choices: undefined,
          };
          const choices = await newRole.listAll();
          questions.choices = choices;
          const IdAnswer = await inquirer.prompt(questions);
          // ask questions about what to change
          const questions2 = [
            {
              type: 'input',
              message:
                'What is the new Title for the Role? (Enter to not Change)',
              name: 'newTitle',
            },
            {
              type: 'input',
              message:
                'What is the new salary for the Role? (ex. 20000.00) (Enter to not Change)',
              name: 'newSalary',
            },
            {
              type: 'list',
              message:
                'What department should this role be changed to?(Enter to not Change)',
              name: 'newDepartment',
              choices: [
                {
                  name: "Don't Change",
                  value: 'noChange',
                },
              ],
            },
          ];
          const departmentChoices = await newDepartment.listAll();
          departmentChoices.forEach((choice) => {
            questions2[2].choices.push(choice);
          });
          const updateRoleAnswer = await inquirer.prompt(questions2);
          console.log(updateRoleAnswer);
          const updateRequest = {};
          if (updateRoleAnswer.newTitle)
            updateRequest.title = updateRoleAnswer.newTitle;
          if (updateRoleAnswer.newSalary)
            updateRequest.salary = updateRoleAnswer.newSalary;
          if (updateRoleAnswer.newDepartment !== 'noChange')
            updateRequest.department_id = updateRoleAnswer.newDepartment;
          console.log(updateRequest);
          await newRole.update(IdAnswer.ID, updateRequest);
          return await this.manageRoles();
        } catch (error) {
          console.error(error);
          break;
        }
      }
      case 'deleteRole': {
        try {
          const newRole = new Role(dbConfig);
          const questions = {
            type: 'list',
            message: 'Which Role would you like to delete?',
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
