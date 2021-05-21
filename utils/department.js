const mysql = require('mysql2/promise');

// class takes dbConfig object as argument.
class Department {
  constructor(dbConfig) {
    this.id = undefined;
    this.name = undefined;
    this.dbConfig = dbConfig;
  }

  // create new department on DB
  async create(departmentName) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.query('INSERT INTO department SET ?', {
        name: departmentName,
      });
      this.name = departmentName;
      connection.end();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Department;
