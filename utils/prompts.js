const inquirer = require('inquirer');
const cTable = require('console.table');
const Department = require('./departmentClass');
const Role = require('./roleClass');
const Employee = require('./employeeClass');
const inquirerQ = require('./inquirerQuestions');
const dbConfig = require('./dbConfig');

const departmentPrompt = {
  async manageDepartment() {
    const answers = await inquirer.prompt(inquirerQ.departmentPrompt);
    this.next(answers);
  },

  async next(answers) {
    switch (answers.task) {
      case 'viewAllDepartments': {
        // run a program to pull from print all.
        const newDepartment = new Department(dbConfig);
        const allDepartments = await newDepartment.read();
        console.table(allDepartments);
        return this.manageDepartment();
      }
      case 'viewAllByCost': {
        try {
          // get all departments codes, build an object
          const totals = [];
          const newEmployee = new Employee(dbConfig);
          const allEmployees = await newEmployee.read();
          allEmployees.forEach((employee) => {
            // find department index
            const foundIndex = totals.findIndex(
              (e) => e.department_name === employee.department_name
            );
            if (foundIndex === -1) {
              totals.push({
                department_name: employee.department_name,
                total_spent: Number(employee.salary),
              });
            } else {
              totals[foundIndex].total_spent += Number(employee.salary);
            }
          });
          console.table(totals);
          return this.manageDepartment();
        } catch (error) {
          console.error(error);
          break;
        }
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
          return this.manageDepartment();
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
          return this.manageDepartment();
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
    const answers = await inquirer.prompt(inquirerQ.rolePrompt);
    this.next(answers);
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
          const questions = inquirerQ.addARole;
          // get department inquirer questions array
          const newDepartment = new Department(dbConfig);
          const departmentChoices = await newDepartment.listAll();
          questions[2].choices = departmentChoices;
          const answer = await inquirer.prompt(questions);
          const newRole = new Role(dbConfig);
          await newRole.create(
            answer.roleTitle,
            answer.roleSalary,
            answer.roleDepartment
          );
          return this.manageRoles();
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
          const questions2 = inquirerQ.updateARole;
          const departmentChoices = await newDepartment.listAll();
          departmentChoices.forEach((choice) => {
            questions2[2].choices.push(choice);
          });
          const updateRoleAnswer = await inquirer.prompt(questions2);
          const updateRequest = {};
          if (updateRoleAnswer.newTitle)
            updateRequest.title = updateRoleAnswer.newTitle;
          if (updateRoleAnswer.newSalary)
            updateRequest.salary = updateRoleAnswer.newSalary;
          if (updateRoleAnswer.newDepartment !== 'noChange')
            updateRequest.department_id = updateRoleAnswer.newDepartment;
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
    const answers = await inquirer.prompt(inquirerQ.employeePrompt);
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
          const questions = inquirerQ.addEmployee;
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
          const questions2 = inquirerQ.updateEmployee;
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
          const updateRequest = {};
          if (updateRoleAnswer.newFirstName)
            updateRequest.first_name = updateRoleAnswer.newFirstName;
          if (updateRoleAnswer.newLastName)
            updateRequest.last_name = updateRoleAnswer.newLastName;
          if (updateRoleAnswer.newRole)
            updateRequest.role_id = updateRoleAnswer.newRole;
          if (
            updateRoleAnswer.newManager ||
            updateRoleAnswer.newManager === null
          )
            updateRequest.manager_id = updateRoleAnswer.newManager;
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
const topLevelPrompt = {
  async generate() {
    const answers = await inquirer.prompt(inquirerQ.topLevel);
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
module.exports = { topLevelPrompt };
