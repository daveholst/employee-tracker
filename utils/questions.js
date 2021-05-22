const inquirer = require('inquirer');

const questions = {
  startScreen = async () => {
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
  },

}


