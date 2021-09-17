const connection = require("./connection");

function queryAllDepartments() {
   return connection.promise().query("SELECT * FROM department");
}

function queryAllRoles() {
    return connection.promise().query("SELECT * FROM role");
}

function queryAllEmployees() {
    return connection.promise().query("SELECT * FROM employee");
}

function queryAddDepartment(input) {
    connection.query('INSERT INTO department (dept_name) VALUES (?)', input);
}

function queryAddRole(roleName, roleSalary, roleDept) {
    connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleName, roleSalary, roleDept]);
}

function queryAddEmployee() {

}

function queryUpdateEmployeeRole() {

}

module.exports = { queryAllDepartments, queryAllRoles, queryAllEmployees, queryAddDepartment, queryAddRole, queryAddEmployee, queryUpdateEmployeeRole };