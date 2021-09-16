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
    connection.query(`INSERT INTO department VALUES ?`, input);
}

// function queryAddRole() {
//     let newTitle =
//     let newSalary = 
//     let newDepartment =  
//     connection.promise().query(`INSERT INTO role VALUES (?, ?, ?)`, [], (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log('Department Successfully Added')
//         return result;
//       });
// }

// function queryAddEmployee() {

// }

// function queryUpdateEmployeeRole() {

// }

module.exports = { queryAllDepartments, queryAllRoles, queryAllEmployees, queryAddDepartment };