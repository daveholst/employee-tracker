// const mysql = require('mysql2/promise');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { all } = require('prelude-ls');
const Department = require('./utils/departmentClass');
const { topLevelPrompt } = require('./utils/prompts');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};
const init = async () => {
  try {
    const topLevelResponse = await topLevelPrompt.generate();
  } catch (error) {
    console.error(error);
  }
};
init();
// const tester = async () => {
//   const newDepartment = new Department(dbConfig);
//   const allDepartments = await newDepartment.listAll();
//   console.log(allDepartments);
// };
// tester();

// const tester = async () => {
//   const newDepartment = new Department(dbConfig);
//   const gardenersObj = await newDepartment.create('Sales');
//   console.log(gardenersObj);
// };
// tester();
// const tester2 = async () => {
//   const newDepartment = new Department(dbConfig);
//   const gardenersObj = await newDepartment.read(602);
//   console.table(gardenersObj);
// };
// tester2();
// writeEmployee('dave', 'holst', 303, 102);

// const tester3 = async () => {
//   const newDepartment = new Department(dbConfig);
//   newDepartment.update(603, { name: 'wankers' });
// };
// const tester4 = async () => {
//   const newDepartment = new Department(dbConfig);
//   newDepartment.delete(600);
// };

// tester4();
