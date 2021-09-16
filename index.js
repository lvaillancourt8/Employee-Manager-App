const inquirer = require("inquirer");
// const connection = require("./db/connection");
require("console.table");
const queries = require("./db/queries");

function init() {
    // start inquirer
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all departments",
                    value: "VIEW_ALL_DEPARTMENTS"
                },
                {
                    name: "View all roles",
                    value: "VIEW_ALL_ROLES"
                },
                {
                    name: "View all employees",
                    value: "VIEW_ALL_EMPLOYEES"
                },
                {
                    name: "Add a department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update an employee role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT_APP"
                },
            ]
        }
    ]).then(data => {
        const input = data.action;

        switch (input) {
            case 'VIEW_ALL_DEPARTMENTS':
                viewAllDepartments();
                break;
            case 'VIEW_ALL_ROLES':
                viewAllRoles();
                break;
            case 'VIEW_ALL_EMPLOYEES':
                viewAllEmployees();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break; 
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
            break;
            default:
                console.log('Goodbye!')
                quit();
        }
    })
}

function viewAllDepartments() {
    queries.queryAllDepartments()
    .then( ([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then( () => init());
}

function viewAllRoles() {
    queries.queryAllRoles()
    .then( ([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then( () => init());
}

function viewAllEmployees() {
    queries.queryAllEmployees()
    .then( ([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then( () => init());
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the Department Name:',
            name: 'deptInput'
        }
    ]).then((data) => {
        const input = data.deptInput;
        queries.queryAddDepartment(input)

    }).then(() => console.log('Department Added Successfully'))
    .then(() => init())
}

function addRole() {

}

function addEmployee() {

}

function queryUpdateEmployeeRole() {

}

// Quit the application
function quit() {
    process.exit();
}


init();