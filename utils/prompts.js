const inquirer = require('inquirer');
const cTable = require('console.table');
const Department = require('./departmentClass');
const Role = require('./roleClass');
const Employee = require('./employeeClass');

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
                  name: "** Don't Change **",
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
          const choices = await newRole.listAll();
          questions.choices = choices;
          const answer = await inquirer.prompt(questions);
          await newRole.delete(answer.departmentID);
          const answer2 = await this.manageRoles();
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

const employeePrompt = {
  async manageEmployee() {
    const answers = await inquirer.prompt({
      type: 'list',
      message: 'What would you like to do with Employees?',
      name: 'task',
      choices: [
        {
          name: 'View All Employees',
          value: 'viewAllEmployees',
        },
        {
          name: 'Add an Employee',
          value: 'addEmployee',
        },
        {
          name: 'Update an Employee',
          value: 'updateEmployee',
        },
        {
          name: 'Delete an Employee',
          value: 'deleteEmployee',
        },
        {
          name: 'Back',
          value: 'back',
        },
      ],
    });
    this.next(answers);
  },

  async next(answers) {
    switch (answers.task) {
      case 'viewAllEmployees': {
        // run a program to pull from print all.
        const newEmployee = new Employee(dbConfig);
        const allEmployees = await newEmployee.read();
        console.table(allEmployees);
        const answer = await this.manageEmployee();
        return answer;
      }
      case 'addEmployee': {
        try {
          const questions = [
            {
              type: 'input',
              message: 'What is the First Name of the Employee?',
              name: 'employeeFirstName',
            },
            {
              type: 'input',
              message: 'What is the Last Name of the Employee?',
              name: 'employeeLastName',
            },
            {
              type: 'list',
              message: 'What Role is the Employee assigned to?',
              name: 'roleId',
              choices: undefined,
            },
            {
              type: 'list',
              message: "Who is the Employee's Manager (Enter for No Manager)",
              name: 'managerId',
              choices: [
                {
                  name: 'No Manager',
                  value: '',
                },
              ],
            },
          ];
          // get role inquirer questions array
          const newRole = new Role(dbConfig);
          const roleChoices = await newRole.listAll();
          questions[2].choices = roleChoices;
          // get manager inquirer questions
          const newEmployee = new Employee(dbConfig);
          const managerChoices = await newEmployee.listAll();
          managerChoices.forEach((employee) => {
            questions[3].choices.push(employee);
          });
          const answer = await inquirer.prompt(questions);
          // const newRole = new Role(dbConfig);
          await newEmployee.create(
            answer.employeeFirstName,
            answer.employeeLastName,
            answer.roleId,
            answer.managerId ? answer.managerId : null
          );
          // redraw menu when finished
          const answer2 = await this.manageEmployee();
          return answer2;
        } catch (error) {
          console.error(error);
          break;
        }
      }
      case 'updateEmployee': {
        try {
          // get list of Employees to select from
          const newRole = new Role(dbConfig);
          const newEmployee = new Employee(dbConfig);
          const questions = {
            type: 'list',
            message: 'Which Employee would you like to Update?',
            name: 'ID',
            choices: undefined,
          };
          const choices = await newEmployee.listAll();
          questions.choices = choices;
          const IdAnswer = await inquirer.prompt(questions);
          // ask questions about what to change
          const questions2 = [
            {
              type: 'input',
              message:
                'What is the new First Name for the Employee? (Enter to not Change)',
              name: 'newFirstName',
            },
            {
              type: 'input',
              message:
                'What is the new Last Name for the Employee? (Enter to not Change)',
              name: 'newLastName',
            },
            {
              type: 'list',
              message:
                'What Role should the Employee be changed to?(Enter to not Change)',
              name: 'newRole',
              choices: [
                {
                  name: "** Don't Change **",
                  value: '',
                },
              ],
            },
            {
              type: 'list',
              message:
                'What Manager should the Employee be changed to?(Enter to not Change)',
              name: 'newManager',
              choices: [
                {
                  name: "** Don't Change ** ",
                  value: '',
                },
              ],
            },
          ];
          // get role choices
          const roleChoices = await newRole.listAll();
          roleChoices.forEach((choice) => {
            questions2[2].choices.push(choice);
          });
          // get manager choices
          const managerChoices = await newEmployee.listAll();
          managerChoices.forEach((choice) => {
            questions2[3].choices.push(choice);
          });
          const updateRoleAnswer = await inquirer.prompt(questions2);
          console.log(updateRoleAnswer);
          const updateRequest = {};
          if (updateRoleAnswer.newFirstName)
            updateRequest.first_name = updateRoleAnswer.newFirstName;
          if (updateRoleAnswer.newLastName)
            updateRequest.last_name = updateRoleAnswer.newLastName;
          if (updateRoleAnswer.newRole)
            updateRequest.role_id = updateRoleAnswer.newRole;
          if (updateRoleAnswer.newManager)
            updateRequest.manager_id = updateRoleAnswer.newManager;
          console.log(updateRequest);
          await newEmployee.update(IdAnswer.ID, updateRequest);
          return await this.manageEmployee();
        } catch (error) {
          console.error(error);
          break;
        }
      }
      case 'deleteEmployee': {
        try {
          const newEmployee = new Employee(dbConfig);
          const questions = {
            type: 'list',
            message: 'Which Employee would you like to delete?',
            name: 'employeeID',
            choices: undefined,
          };
          const choices = await newEmployee.listAll();
          questions.choices = choices;
          const answer = await inquirer.prompt(questions);
          await newEmployee.delete(answer.employeeID);
          const answer2 = await this.manageEmployee();
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

const topLevelPrompt = {
  async generate() {
    const answers = await inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'task',
      choices: [
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
          name: 'Manage Employees',
          value: 'manEmployee',
        },
        {
          name: 'Manage Departments',
          value: 'manDepartment',
        },
        {
          name: 'Manage Roles',
          value: 'manRoles',
        },
        new inquirer.Separator(),
      ],
    });
    this.next(answers);
  },
  async next(answers) {
    // switch to detect single function operations. (View)
    switch (answers.task) {
      case 'viewAll': {
        // run a program to pull from print all.
        const newEmployee = new Employee(dbConfig);
        console.table(await newEmployee.read());
        return this.generate();
      }
      case 'viewByDepartment':
        // run a program to print all.
        await viewByDepartmentPrompt.generate();
        break;
      case 'viewByRole':
        await viewByRolePrompt.generate();
        // run a program to print all.
        break;
      case 'viewByManager':
        await viewByManagerPrompt.generate();
        // run a program to print all.
        break;
      case 'manEmployee':
        await employeePrompt.manageEmployee();
        // run a program to print all.
        break;
      case 'manDepartment': {
        await departmentPrompt.manageDepartment();
        break;
      }
      case 'manRoles':
        await rolePrompt.manageRoles();
        break;
      default:
        console.error('invalid selection made');
    }
  },
};

const viewByDepartmentPrompt = {
  async generate() {
    // select a department
    const newDepartment = new Department(dbConfig);
    const newEmployee = new Employee(dbConfig);
    // const choices = await newDepartment.listAll();
    const departmentChoice = await inquirer.prompt({
      type: 'list',
      message: 'Which Department?',
      name: 'department',
      choices: await newDepartment.listAll(),
    });
    // print the results of that department
    console.table(
      await newEmployee.readByDepartment(departmentChoice.department)
    );
    return topLevelPrompt.generate();
  },
};
const viewByRolePrompt = {
  async generate() {
    // select a department
    const newRole = new Role(dbConfig);
    const newEmployee = new Employee(dbConfig);
    // const choices = await newDepartment.listAll();
    const roleChoice = await inquirer.prompt({
      type: 'list',
      message: 'Which Role?',
      name: 'role',
      choices: await newRole.listAll(),
    });
    // print the results of that department
    console.table(await newEmployee.readByRole(roleChoice.role));
    return topLevelPrompt.generate();
  },
};
const viewByManagerPrompt = {
  async generate() {
    // select a department
    const newEmployee = new Employee(dbConfig);
    // const choices = await newDepartment.listAll();
    const roleChoice = await inquirer.prompt({
      type: 'list',
      message: 'Which Manager?',
      name: 'manager',
      choices: await newEmployee.listAll(),
    });
    // print the results of that department
    console.table(await newEmployee.readByManager(roleChoice.manager));
    return topLevelPrompt.generate();
  },
};
module.exports = { topLevelPrompt };
