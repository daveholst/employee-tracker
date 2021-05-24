// const mysql = require('mysql2/promise');
const cTable = require('console.table');
const inquirer = require('inquirer');
const Department = require('./utils/departmentClass');
const { topLevelPrompt } = require('./utils/prompts');

const dbConfig = {
  host: 'localhost',
  port: 6606,
  user: 'dave',
  password: 'password',
  database: 'hr_employees',
};
const init = async () => {
  try {
    await topLevelPrompt.generate();
  } catch (error) {
    console.error(error);
  }
};
init();
