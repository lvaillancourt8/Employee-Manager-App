const connection = require("./connection");

// Create a database class to store query methods
class Database {
    // Keep a reference to the database connection with the constructor this.connection = connection inside the constructor
    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT '
        )
    }
}