// const mysql = require('mysql2/promise');
const cTable = require('console.table');
const inquirer = require('inquirer');
const Department = require('./utils/departmentClass');
const startPrompt = require('./utils/startPagePrompt');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};

const printEmployees = () => {
  console.log('i printed');
};
// initial selection

const CLIinterface = async () => {
  const answer = await startPrompt.startScreen();
  await startPrompt.next(answer);
};

CLIinterface();

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
