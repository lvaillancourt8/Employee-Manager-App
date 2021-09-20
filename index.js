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
                    name: "Update an employee's Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },                  
                {
                    name: "View Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },                   
                {
                    name: "Delete a Role",
                    value: "DELETE_ROLE"
                },   
                {
                    name: "Delete a Department",
                    value: "DELETE_DEPARTMENT"
                },
                {
                    name: "Delete an Employee",
                    value: "DELETE_EMPLOYEE"
                },                     
                {
                    name: "View Total HR Budget for a Department",
                    value: "VIEW_DEPT_BUDGET"
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
            case 'UPDATE_EMPLOYEE_MANAGER':
                updateEmployeeManager();               
                break;
            case 'VIEW_EMPLOYEES_BY_MANAGER':
                viewEmployeesByManager();              
                break;
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                viewEmployeesByDepartment();    
                break;
            case 'DELETE_ROLE':
                deleteRole();
                break;
            case 'DELETE_DEPARTMENT':
                deleteDepartment();
                break;
            case 'DELETE_EMPLOYEE':
                deleteEmployee();
                break;
            case 'VIEW_DEPT_BUDGET':
                departmentBudget();
                break    
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
      console.log('\n');      
    })
    .catch(console.log)
    .then( () => init());
}

function viewAllRoles() {
    console.log('\n');    
    queries.queryAllRolesFormatted()
    .then( ([rows]) => {
      console.table(rows);
      console.log('\n');
    })
    .catch(console.log)
    .then( () => init());
}

function viewAllEmployees() {
    console.log('\n');
    queries.queryAllEmployeesFormatted()
    .then( ([rows]) => {
      console.table(rows);
      console.log('\n');
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
        console.log('\n');
    }).then(() => init())
      .catch(console.log)
}

function addRole() {
    queries.queryAllDepartments()
    .then(([rows]) => {
        let departments = rows;
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
        console.log('\n');
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
        console.log('\n');
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
        console.log('\n');
        }).then(() => init())
          .catch(console.log)
    })
    })
 }

 function updateEmployeeManager() {

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
                message: 'Select their new Manager',
                name: 'updatedManagerId',
                choices: employeeChoices
            }            
        ]).then((data) => {
            const {empId, updatedManagerId} = data
            queries.queryUpdateEmployeeManager(empId, updatedManagerId)
        }).then(() => {
        console.log('\n');
        console.log('Employee Manager Updated Successfully')
        console.log('\n');
        }).then(() => init())
          .catch(console.log)
    })
 }

function viewEmployeesByManager() {   

    queries.queryAllManagers()
    .then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ manager_id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: manager_id
        }))      

        inquirer.prompt([
            {
                type: 'list',
                message: 'Select a Manager',
                name: 'managerId',
                choices: managerChoices
            },
        ]).then((data) => {
            const {managerId} = data
            console.log('\n');
            return queries.queryGetEmployeesByManager(managerId)
        }).then(([rows]) => {
            console.table(rows);
            console.log('\n')
        })
        .catch(console.log)
        .then( () => init());
    })
}

function viewEmployeesByDepartment() {
    queries.queryAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, dept_name }) => ({
            name: dept_name,
            value: id
        }))

        inquirer.prompt([
            {
                type: 'list',
                message: 'Choose a department',
                name: 'deptId',
                choices: departmentChoices
            }
        ]).then((data) => {
            console.log(data);
            console.log('\n');
            return queries.queryDepartmentEmployees(deptId);
        }).then( ([rows]) => {
            console.table(rows);
            console.log('\n');
        }).then(() => init())
          .catch(console.log)
    });  
}

function deleteRole() {
    queries.queryAllRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }))

        inquirer.prompt([
            {
                type: 'list',
                message: 'Choose a role to delete',
                name: 'roleToDelete',
                choices: roleChoices
            }
        ]).then((data) => {
            const {roleToDelete} = data
            queries.queryDeleteRole(roleToDelete)
        }).then(() => {
        console.log('\n');
        console.log('Role Deleted Successfully')
        }).then(() => init())
          .catch(console.log)
    });
}

function deleteDepartment(){
    queries.queryAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, dept_name }) => ({
            name: dept_name,
            value: id
        }))

        inquirer.prompt([
                        {
                type: 'list',
                message: 'Choose a department to delete',
                name: 'deptName',
                choices: departmentChoices
            }
        ]).then((data) => {
            const {deptName} = data
            queries.queryDeleteDept(deptName)
        }).then(() => {
        console.log('\n');
        console.log('Department Deleted')
        console.log('\n');
        }).then(() => init())
          .catch(console.log)
    });  
}

function deleteEmployee() {
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
                message: 'Select an employee to delete',
                name: 'empToDelete',
                choices: employeeChoices
            }            
        ]).then((data) => {
            const {empToDelete} = data
            queries.queryDeleteEmployee(empToDelete)
        }).then(() => {
        console.log('\n');
        console.log('Employee has been deleted')
        console.log('\n');
        }).then(() => init())
          .catch(console.log)
    })
}

function departmentBudget() {
    queries.queryAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, dept_name }) => ({
            name: dept_name,
            value: id
        }))

        inquirer.prompt([
            {
                type: 'list',
                message: 'View Total HR Budget for a Department',
                name: 'deptId',
                choices: departmentChoices
            }
        ]).then((data) => {
            const deptId = data.deptId
            console.log('\n');
            return queries.queryDepartmentBudget(deptId);
        }).then( ([rows]) => {
            console.table(rows);
            console.log('\n');
        }).then(() => init())
          .catch(console.log)
    });  
}
 
// Quit the application
function quit() {
    process.exit();
}


init();