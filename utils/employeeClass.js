const mysql = require('mysql2/promise');
// class takes dbConfig object as argument.
class Employee {
  constructor(dbConfig) {
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.roleId = undefined;
    this.managerId = undefined;
    this.dbConfig = dbConfig;
  }

  // create new department on DB
  async create(first, last, role, manager) {
    console.log(manager);
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = await connection.query('INSERT INTO employee SET ?', {
        first_name: first,
        last_name: last,
        role_id: role,
        manager_id: manager,
      });
      this.firstName = first;
      this.lastName = last;
      this.roleId = role;
      this.managerId = manager;
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
          `SELECT employee.id, employee.first_name, employee.last_name,roles.title,roles.salary,department.department_name
          FROM employee
            INNER JOIN roles ON employee.role_id = roles.id
            INNER JOIN department ON department.id = roles.department_id`
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
      await connection.query('UPDATE employee SET ? WHERE id=?', [
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
      await connection.query(`DELETE FROM employee WHERE id=${id}`);
      connection.end();
    } catch (error) {
      console.error(error);
    }
  }

  // generate inquirer list
  async listAll() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const allEmployees = await connection.query('SELECT * FROM employee');
      const choices = [];
      // loop results to build inquirer questions object
      allEmployees[0].forEach((employee) => {
        const choice = {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
        choices.push(choice);
      });
      return choices;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Employee;
