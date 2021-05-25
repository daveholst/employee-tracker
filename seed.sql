USE hr_employees;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;
CREATE TABLE employee(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL REFERENCES roles(id),
  manager_id INT REFERENCES employee(id)
);
CREATE TABLE roles(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT REFERENCES department(id)
);
CREATE TABLE department(
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL UNIQUE
);
ALTER TABLE employee AUTO_INCREMENT = 100;
ALTER TABLE roles AUTO_INCREMENT = 500;
ALTER TABLE department AUTO_INCREMENT = 600;
SELECT *
FROM employee;
SELECT *
FROM department;
SELECT *
FROM roles;
-- inner join roles and department
SELECT roles.id,
  roles.title,
  roles.salary,
  department_id,
  department_name
FROM roles
  JOIN department
WHERE department_id = department.id;
SELECT employee.id,
  employee.first_name,
  employee.last_name,
  roles.title,
  roles.salary,
  department.department_name
FROM employee
  INNER JOIN roles ON employee.role_id = roles.id
  INNER JOIN department ON department.id = roles.department_id;
SELECT employee.id,
  employee.first_name,
  employee.last_name,
  roles.title,
  roles.salary,
  department.department_name
FROM employee
  INNER JOIN roles ON employee.role_id = roles.id
  INNER JOIN department ON department.id = roles.department_id
WHERE manager_id = 100;