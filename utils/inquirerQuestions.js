const inquirer = require('inquirer');

const inquirerQ = {
  rolePrompt: {
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
  },
  addARole: [
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
  ],
  updateARole: [
    {
      type: 'input',
      message: 'What is the new Title for the Role? (Enter to not Change)',
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
  ],
  employeePrompt: {
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
  },
  addEmployee: [
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
  ],
  updateEmployee: [
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
  ],
  departmentPrompt: {
    type: 'list',
    message: 'What would you like to do with Departments?',
    name: 'task',
    choices: [
      {
        name: 'View All Departments',
        value: 'viewAllDepartments',
      },
      {
        name: 'View Departments by Cost',
        value: 'viewAllByCost',
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
  },

  topLevel: {
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
  },
};

module.exports = inquirerQ;
