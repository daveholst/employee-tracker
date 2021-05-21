// const mysql = require('mysql2/promise');
const Department = require('./utils/department');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};

const newDepartment = new Department(dbConfig);
newDepartment.create('Gardener');

// writeEmployee('dave', 'holst', 303, 102);
