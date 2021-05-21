const mysql = require('mysql2/promise');
// TODO: Do I need to have these functions return the id back to the object?
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
      //
      const connection = await mysql.createConnection(this.dbConfig);
      const query = await connection.query('INSERT INTO department SET ?', {
        name: departmentName,
      });
      this.name = departmentName;
      this.id = query[0].insertId;
      connection.end();
    } catch (error) {
      console.error(error);
    }
    return this;
  }
}

module.exports = Department;
