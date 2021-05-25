# Employee Tracker: HR Management CLI App

This is an inquirer based CLI app that interacts with a mySQL database and allows the user to manage a team of Employees. The app allows the user to:

- Manage Employees - Add, View, Update, Delete
- Manage Roles - Add, View, Update, Delete
- Manage Departments - Add, View, Update, Delete
- Custom Views - List by Role, Department, Manager, Department Budget

## Table of Contents:

- [License](#License)
- [Screenshots](#Screenshots)
- [YouTube Demo](#YouTube-Demo)
- [Technology Stack](#Technology-Stack)
- [Usage](#Usage)
- [Tests](#Tests)
- [Questions](#Questions)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the **MIT License**: https://opensource.org/licenses/MIT

## Screenshots

#### Animated Gif Screenshot:

![gif of employee tracking app](./assets/employee-tracker.gif)

## YouTube Demo

A recorded demo of this app is hosted on youTube at https://sleepy-fjord-84499.herokuapp.com/

## Technology Stack

- mySQL Server (Local - Docker): https://hub.docker.com/_/mysql
- mysql2: https://www.npmjs.com/package/mysql2
- inquirer: https://www.npmjs.com/package/inquirer
- console.table: https://www.npmjs.com/package/console.table
- WesBos Linting Config: https://github.com/wesbos/eslint-config-wesbos

## Usage

This software needs access to a mySQL database for storage of persistent information. `./utils/dbConfig.js` should be edited to reflect the settings of the chosen server. A `seed.sql` file has been included to build the appropriate tables.

To use the program simply run the program from your preferred terminal and follow the prompts.

```bash
npm start
```

## Tests

No tests have been written for this software.

## Questions

If you have any further questions you can get in contact with the creator through the following methods:

- https://github.com/daveholst/
- dholst@glenholst.com.au
