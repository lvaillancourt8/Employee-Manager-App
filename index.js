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
    console.log('\n');
    queries.queryAllDepartmentsFormatted()
    .then( ([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then( () => init());
}

function viewAllRoles() {
    console.log('\n');    
    queries.queryAllRolesFormatted()
    .then( ([rows]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then( () => init());
}

function viewAllEmployees() {
    console.log('\n');
    queries.queryAllEmployeesFormatted()
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
    }).then(() => {
        console.log('\n');
        console.log('Department Added Successfully')
    }).then(() => init())
      .catch(console.log)
}

function addRole() {
    queries.queryAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log(rows);
        const departmentChoices = departments.map(({ id, dept_name }) => ({
            name: dept_name,
            value: id
        }))

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?:',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'What department does the role belong to?',
                name: 'roleDept',
                choices: departmentChoices
            }
        ]).then((data) => {
            const {roleName, roleSalary, roleDept} = data
            queries.queryAddRole(roleName, roleSalary, roleDept)
        }).then(() => {
        console.log('\n');
        console.log('Role Added Successfully')
        }).then(() => init())
          .catch(console.log)
    });
 }

 function addEmployee() {
    queries.queryAllRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }))   

    queries.queryAllEmployees()
    .then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))      

        inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?:",
                name: 'firstName'
            },
            {
                type: 'input',
                message: "What is the employee's last name?:",
                name: 'lastName'
            },
            {
                type: 'list',
                message: 'Select the employee role',
                name: 'empRole',
                choices: roleChoices
            },
            {
                type: 'list',
                message: 'Select their Manager',
                name: 'empManager',
                choices: managerChoices
            }            
        ]).then((data) => {
            const {firstName, lastName, empRole, empManager} = data
            queries.queryAddEmployee(firstName, lastName, empRole, empManager)
        }).then(() => {
        console.log('\n');
        console.log('Employee Added Successfully')
        }).then(() => init())
          .catch(console.log)
    })
    })
 }


function updateEmployeeRole() {
    queries.queryAllRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }))   

    queries.queryAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))      

        inquirer.prompt([
            {
                type: 'list',
                message: 'Select the employee',
                name: 'empId',
                choices: employeeChoices
            },
            {
                type: 'list',
                message: 'Select their new role',
                name: 'updatedRoleId',
                choices: roleChoices
            }            
        ]).then((data) => {
            const {empId, updatedRoleId} = data
            queries.queryUpdateEmployeeRole(empId, updatedRoleId)
        }).then(() => {
        console.log('\n');
        console.log('Employee Role Updated Successfully')
        }).then(() => init())
          .catch(console.log)
    })
    })
 }

// Quit the application
function quit() {
    process.exit();
}


init();