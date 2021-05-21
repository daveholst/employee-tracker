// const mysql = require('mysql2/promise');
const Department = require('./utils/department');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};

const tester = async () => {
  const newDepartment = new Department(dbConfig);
  const gardenersObj = await newDepartment.create('Gardeners');
  console.log(gardenersObj);
};
tester();
// writeEmployee('dave', 'holst', 303, 102);
