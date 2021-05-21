const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};

const writeEmployee = async (firstName, lastName, roleID, managerID) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('INSERT INTO employeeee SET ?', {
      first_name: firstName,
      last_name: lastName,
      role_id: roleID,
      manager_id: managerID,
    });
    connection.end();
  } catch (error) {
    console.error(error);
  }
};

writeEmployee('dave', 'holst', 303, 102);
