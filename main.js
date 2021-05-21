// const mysql = require('mysql2/promise');
const cTable = require('console.table');

const Department = require('./utils/department');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};

// const tester = async () => {
//   const newDepartment = new Department(dbConfig);
//   const gardenersObj = await newDepartment.create('Maintenance');
//   console.log(gardenersObj);
// };
// tester();
const tester2 = async () => {
  const newDepartment = new Department(dbConfig);
  const gardenersObj = await newDepartment.read(602);
  console.table(gardenersObj);
};
tester2();
// writeEmployee('dave', 'holst', 303, 102);
