const connection = require("./connection");

function queryAllDepartments() {
    return connection.promise().query("SELECT * FROM department");
 }

function queryAllDepartmentsFormatted() {
   return connection.promise().query("SELECT dept_name AS 'Department', id AS 'Department ID' FROM department ORDER BY dept_name");
}

function queryAllRoles() {
    return connection.promise().query("SELECT * FROM role");
}

function queryAllRolesFormatted() {
    return connection.promise().query("SELECT title AS 'Title', role.id AS 'Role ID', dept_name AS 'Department', salary AS 'Salary' FROM role LEFT JOIN department on department_id = department.id ORDER BY title");
}

function queryAllEmployees() {
    return connection.promise().query("SELECT * FROM employee");
}

function queryAllEmployeesFormatted() {
    return connection.promise().query("SELECT CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee Name', role.title AS 'Title', employee.id AS 'Employee ID', dept_name AS 'Department', salary AS 'Salary', CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.last_name");
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

module.exports = { queryAllDepartments, queryAllDepartmentsFormatted, queryAllRoles, queryAllRolesFormatted, queryAllEmployees, queryAllEmployeesFormatted, queryAddDepartment, queryAddRole, queryAddEmployee, queryUpdateEmployeeRole };