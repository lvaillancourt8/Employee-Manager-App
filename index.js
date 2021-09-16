const inquirer = require("inquirer");
require("console.table");
// const db = require("./db");

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
                    value: "ADD_A_DEPARTMENT"
                },
                {
                    name: "Add a role",
                    value: "ADD_A_ROLE"
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
            case 'VIEW_ALL_DEPARTMENTS':
                viewAllDepartments();
                    break;
            default:
            console.log(`Sorry, we are out of ${expr}.`);
}
    })
}

function viewAllDepartments(){
    
}

init();