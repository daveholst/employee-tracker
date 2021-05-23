const mysql = require('mysql2/promise');
// class takes dbConfig object as argument.
class Role {
  constructor(dbConfig) {
    this.id = undefined;
    this.title = undefined;
    this.salary = undefined;
    this.department_id = undefined;
    this.dbConfig = dbConfig;
  }

  // create new department on DB
  async create(roleTitle, salaryAmnt, departmentID) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = await connection.query('INSERT INTO roles SET ?', {
        title: roleTitle,
        salary: salaryAmnt,
        department_id: departmentID,
      });
      this.title = roleTitle;
      this.salary = salaryAmnt;
      this.department_id = departmentID;
      this.id = query[0].insertId;
      connection.end();
    } catch (error) {
      console.error(error);
    }
    return this;
  }

  // reads a row based on id, if no id returns all
  async read(id) {
    // if no args, get all
    if (id === undefined) {
      try {
        const connection = await mysql.createConnection(this.dbConfig);
        const query = await connection.query(
          `SELECT roles.id,roles.title,roles.salary,department_id,department_name
          FROM roles JOIN department WHERE department_id = department.id`
        );
        connection.end();
        return query[0];
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const connection = await mysql.createConnection(this.dbConfig);
        const query = await connection.query(
          `SELECT * FROM roles WHERE id = ${id}`
        );
        this.id = query[0][0].id;
        this.name = query[0][0].name;
        connection.end();
        return query[0];
      } catch (error) {
        console.error(error);
      }
    }
  }

  // updates a department entry - takes changes as an object
  async update(id = this.id, dataObject) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.query('UPDATE department SET ? WHERE id=?', [
        dataObject,
        id,
      ]);
      connection.end();
    } catch (error) {
      console.error(error);
    }
  }

  // deletes a department entry
  async delete(id = this.id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.query(`DELETE FROM department WHERE id=${id}`);
      connection.end();
    } catch (error) {
      console.error(error);
    }
  }

  // generate inquirer list
  async listAll() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const allDepartments = await connection.query('SELECT * FROM roles');
      const choices = [];
      // loop results to build inquirer questions object
      allDepartments[0].forEach((department) => {
        const choice = {
          name: department.name,
          value: department.id,
        };
        choices.push(choice);
      });
      return choices;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Role;
