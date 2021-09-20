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

function queryUpdateEmployeeManager(empId, updatedManagerId) {
    connection.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', [updatedManagerId, empId]);
}

function queryAllManagers() {
    return connection.promise().query("SELECT m.first_name, m.last_name, e.manager_id FROM employee e JOIN employee m WHERE e.manager_id = m.id GROUP BY e.manager_id ORDER BY last_name");
}

function queryGetEmployeesByManager(managerId) {
    return connection.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS 'Employees' FROM employee WHERE manager_id = ? ORDER BY last_name", [managerId]);
}

function queryDepartmentEmployees(deptId) {
    return connection.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS 'Department Employee Roster' FROM employee LEFT JOIN role ON role_id = role.id LEFT JOIN department ON department.id = department_id WHERE department.id = ?", [deptId]);
}

function queryDeleteDept (deptName) {
    connection.query('DELETE FROM department WHERE id = ?', deptName);
}

function queryDeleteRole (roleToDelete) {
    connection.query('DELETE FROM role WHERE id = ?', roleToDelete);
}

function queryDeleteEmployee (empToDelete) {
    connection.query('DELETE FROM employee WHERE id = ?', empToDelete);
}

function queryDepartmentBudget (deptId) {
    return connection.promise().query('SELECT dept_name AS "Department", SUM(salary) AS "Total HR Budget" FROM employee LEFT JOIN role ON role.id = role_id LEFT JOIN department ON department_id = department.id WHERE department_id = ?', [deptId]);
}

module.exports = { queryAllDepartments, queryAllDepartmentsFormatted, queryAllRoles, queryAllRolesFormatted, queryAllEmployees, queryAllEmployeesFormatted, queryAddDepartment, queryAddRole, queryAddEmployee, queryUpdateEmployeeRole, queryUpdateEmployeeManager, queryAllManagers, queryGetEmployeesByManager, queryDeleteDept, queryDeleteRole, queryDeleteEmployee,
queryDepartmentBudget, queryDepartmentEmployees };