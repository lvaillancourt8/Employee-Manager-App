const connection = require("./connection");

function queryAllDepartments() {
   return connection.promise().query("SELECT dept_name AS 'Department', id AS 'Department ID' FROM department");
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

function queryAddEmployee(firstName, lastName, empRole, empManager) {
    connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, empRole, empManager]);
}

function queryUpdateEmployeeRole(empId, updatedRoleId) {
    connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [updatedRoleId, empId]);
}

module.exports = { queryAllDepartments, queryAllRoles, queryAllEmployees, queryAddDepartment, queryAddRole, queryAddEmployee, queryUpdateEmployeeRole };